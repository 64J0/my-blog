---
title: "F# and .NET are pretty optimized"
date: "2025-06-23"
show: true
tags: ["fsharp", ".net", "assembly", "simd", "intrinsics", "sse", "performance"]
---

## Changelog

-   [2025-06-23 Mon] Article's first version released.

## Introduction

Yesterday I decided to explore the .NET [SIMD](https://learn.microsoft.com/en-us/dotnet/standard/simd) (Single Instruction, Multiple Data) abstractions using F#, so I could better understand how much more optimized my programs could perform using this technology.

And from this objective, the [64J0/fsharp&#x2013;simd-vector-addition](https://github.com/64J0/fsharp--simd-vector-addition) repository was born.

## The repository

This repository contains this code that uses the generic SIMD structures from `System.Numerics`, and the specific **intrinsics** for SSE (Streaming SIMD Extensions) in x86 processors:

```fsharp
# src/Sse.fs
module Simd.Sse

open System
open System.Numerics
open System.Runtime.Intrinsics
open System.Runtime.Intrinsics.X86
open System.Runtime.InteropServices

/// System.Numerics.Vector<T> is part of .NET's hardware-accelerated numerics
/// API, introduced to allow portable SIMD code.
///
/// Think of it as "high-level SIMD" — you're asking for vector math, and the
/// runtime decides how best to do it. So we have less control over the
/// intrinsics, but we gain portability and ease of use.
///
/// This is a good option if you want to write SIMD code that works on both x86
/// and ARM architectures, as well as on platforms that may not support SSE or
/// AVX directly.
///
/// The Vector<T> type is designed to abstract away the underlying SIMD
/// instructions and provide a consistent interface for vector operations across
/// different hardware architectures. It uses the best available SIMD
/// instructions for the current platform, which may include SSE, AVX, or NEON,
/// depending on the target architecture.
let simdAddGeneric (a: float32[]) (b: float32[]) =
    if a.Length <> b.Length then
        failwith "Arrays must have the same length"

    let len = a.Length
    let result = Array.zeroCreate<float32> len
    let simdWidth = Vector<float32>.Count

    let mutable i = 0

    while i <= len - simdWidth do
        let va = Vector<float32>(a, i)
        let vb = Vector<float32>(b, i)
        let vsum = va + vb
        vsum.CopyTo(result, i)
        i <- i + simdWidth

    for j in i .. len - 1 do
        result.[j] <- a.[j] + b.[j]

    result

/// Specific intrinsics for SSE (Streaming SIMD Extensions) using Span.
let sseAdd (a: float32[]) (b: float32[]) =
    if not Sse.IsSupported then
        failwith "SSE not supported on this CPU"

    if a.Length <> b.Length then
        failwith "Arrays must have the same length"

    let len = a.Length
    let result = Array.zeroCreate<float32> len
    let simdWidth = Vector128<float32>.Count // 4 for SSE

    // Span<T> provides a type-safe and memory-safe representation of a
    // contiguous region of arbitrary memory.
    //
    // At first it seems similar to using arrays, but it allows for more
    // efficient memory access patterns.
    //
    // More information:
    // https://learn.microsoft.com/en-us/archive/msdn-magazine/2018/january/csharp-all-about-span-exploring-a-new-net-mainstay
    let spanA = a.AsSpan()
    let spanB = b.AsSpan()
    let spanR = result.AsSpan()

    let mutable i = 0

    while i <= len - simdWidth do
        // This MemoryMarshal.Cast is used to convert the Span<float32> to a
        // Span<Vector128<float32>>.
        //
        // A Span<float32> is a contiguous region of memory that can be used to
        // represent an array or a portion of an array. Since it has this
        // float32 type, our program knows that each element takes 4 bytes, and
        // with this information it knows how to slice it properly.
        let va =
            MemoryMarshal.Cast<float32, Vector128<float32>>(spanA.Slice(i, simdWidth)).[0]
        // val va: Vector128<float32> = <a_{i}, a_{i+1}, a_{i+2}, a_{i+3}>

        let vb =
            MemoryMarshal.Cast<float32, Vector128<float32>>(spanB.Slice(i, simdWidth)).[0]
        // val vb: Vector128<float32> = <b_{i}, b_{i+1}, b_{i+2}, b_{i+3}>

        let vsum = Sse.Add(va, vb)
        MemoryMarshal.Cast<float32, Vector128<float32>>(spanR.Slice(i, simdWidth)).[0] <- vsum
        i <- i + simdWidth

    // Fallback for leftovers
    for j in i .. len - 1 do
        result.[j] <- a.[j] + b.[j]

    result
```

Other than that, I added some unit tests to assert the functions are working properly, and a benchmark project that uses [dotnet/BenchmarkDotNet](https://github.com/dotnet/BenchmarkDotNet).

## The benchmark

To benchmark those different approaches, I decided to compare them with the most simple implementation I could think in terms of F# syntax:

```fsharp
let scalarAdd (a: float32[]) (b: float32[]) =
    Array.map2 (+) a b
```

And the results, using different input array sizes, were:

| Method         | size    | Mean          | Error         | StdDev        |
|-------------- |------- |------------- |------------- |------------- |
| ScalarAdd      | 100     | 65.86 us      | 0.512 us      | 0.479 us      |
| SimdAdd        | 100     | 71.27 us      | 0.755 us      | 0.707 us      |
| SimdAddGeneric | 100     | 71.63 us      | 0.972 us      | 0.910 us      |
|                |         |               |               |               |
| ScalarAdd      | 10000   | 7,074.84 us   | 78.370 us     | 69.473 us     |
| SimdAdd        | 10000   | 7,197.62 us   | 54.469 us     | 48.285 us     |
| SimdAddGeneric | 10000   | 7,216.13 us   | 95.163 us     | 89.016 us     |
|                |         |               |               |               |
| ScalarAdd      | 1000000 | 699,076.50 us | 10,776.110 us | 10,079.980 us |
| SimdAdd        | 1000000 | 715,734.32 us | 4,938.261 us  | 4,619.252 us  |
| SimdAddGeneric | 1000000 | 709,933.49 us | 7,567.869 us  | 7,078.990 us  |

-   Some columns were removed. For the complete table, check the **README.org** at the repository.

### Running the benchmark

To run this benchmark project and get a more reliable result, it's recommended to start the benchmark process using **sudo**, so:

```bash
cd benchmarks/
sudo su # change to sudo user
dotnet run -c Release
```

## Analysis

As you can see, the "optimized" code was actually a bit slower than the most simple version.

My first thought when seeing this result was that I did something wrong, and then I started looking into other project's code with proper implementations. Eventually I found this [fsprojects/SIMDArray](https://github.com/fsprojects/SIMDArray/blob/master/src/SIMDArray/SIMDArray.fs#L479) repository, and found out that its `sum` implementation was using similar constructs (`while ... do`, for example).

Then, I decided to check the x86 assembly using Godbolt's Compiler Explorer: [link](https://godbolt.org/z/beETe5zYE).

For my surprise, the simple code was already using the SIMD optimized instruction for addition `vaddss`, check this part of the assembly code to verify:

```nasm
Program+scalarAdd@10:Invoke(float,float):float:this (FullOpts):
        vaddss   xmm0, xmm0, xmm1
        ret
```

Notice that this `scalarAdd@10:Invoke...` function is related to the anonymous function we used as the parameter for the `Array.map2`. You can assert that the generated assembly will be the optimized SIMD instruction by using different operations, like (-), (\*), etc, and verifying the generated assembly.

## Conclusion

With this F# example, I found that the F#/.NET compiler is smart enough to already use the SIMD optimized assembly instruction, even though we don't specify it.

Furthermore, I learned a bit more about **intrinsics** technology in .NET, and reaffirmed the necessity of always benchmark the code to really assert it's being optimized. In this case, the best approach was really the most simple.
