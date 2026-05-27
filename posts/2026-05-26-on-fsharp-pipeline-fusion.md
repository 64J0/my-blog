---
title: "On F# pipeline fusion"
date: "2026-05-26"
show: true
tags: ["fsharp", "optimization"]
---

## What is pipeline fusion

In F#, to improve the code readability, you can chain multiple collection operations using the pipe operator, for example:

```fsharp
Array.map f1
|> Array.map f2
|> Array.filter f3
|> Array.fold f4
```

Unfortunately, the clarity of this program has a cost, because the F# compiler does not automatically fuse or optimize these into a single pass at compile time.

Each stage in the pipeline generally executes fully, creates a new collection in memory (an intermediate data structure), and then passes that new collection to the next function, which carries an obvious performance penalty.

The F# compiler does not have this rewriting engine because it prioritizes predictability and interop with the .NET runtime.

## The difference between Array, List and Seq

The difference between Array, List and Seq:

- **Array:** Eager & Intermediate. Each `Array.map` creates a brand-new array. Chaining 3 maps means 3 full traversals and 3 distinct arrays allocated in the **heap**.
- **List :** Eager & Intermediate. Similar to arrays, but uses linked-list nodes. Each step allocates a new list of nodes.
- **Seq  :** Lazy & Fused. `Seq` (alias for `IEnumerable<T>`) is a state machine. Chaining `Seq.map` creates a "wrapper" that only executes when you iterate (e.g., via `Seq.iter` or `Seq.toList`).

### The "Fusion" illusion in Seq

While `Seq` avoids intermediate collections, it isn't "free". Because it uses the `IEnumerator<T>` interface, every single element access involves a virtual method call (`MoveNext()`). For simple operations like `x + 1`, the overhead of the interface call can actually make a fused `Seq` pipeline slower than an un-fused `Array` pipeline for small-to-medium datasets.

### Visualizing the pipeline

- **Eager (Array/List):** [Input] &ndash;(Pass 1)&ndash;> [New Array A] &ndash;(Pass 2)&ndash;> [New Array B] &ndash;(Pass 3)&ndash;> [Final Result] Total: 3 Traversals, 2 Intermediate Allocations.

- **Lazy (Seq)        :** [Input] &ndash;(Element 1: Map1 -> Map2 -> Map3)&ndash;> [Result 1] Total: 1 Traversal, 0 Intermediate Allocations.

## How to optimize (avoid intermediate allocations)

1. Manual fusion (the "lambda" way)

    ```fsharp
    // Instead of:
    data |> Array.map f |> Array.map g

    // Do this:
    data |> Array.map (f >> g) // Single pass, single allocation
    ```

2. Use Mutability (The "Performance" way)

    For the absolute fastest code, use a standard for loop. This avoids all function-call overhead and intermediate allocations.

    ```fsharp
    let results = Array.zeroCreate data.Length
    for i = 0 to data.Length - 1 do
        results.[i] <- data.[i] |> f |> g
    ```

## How to assert that the F# pipelines are not really fused

1. Inspect the IL (Intermediate Language) with ILSpy or ildasm

   Compile a simple F# pipeline and decompile it:

   ```fsharp
   let result =
     [| 1..100 |]
     |> Array.map (fun x -> x * 2)
     |> Array.map (fun x -> x + 1)
     |> Array.filter (fun x -> x > 10)
   ```

   Then inspect the emitted IL with:

   - **ILSpy (GUI, free):** open the compiled .dll and browse to the function.
   - **ildasm           :** ships with the .NET SDK: `ildasm yourfile.dll`.

   If fusion happened, you'd see a single loop. If not, you'll see three distinct loops with intermediate array allocations.

2. Benchmark with BenchmarkDotNet

   ```fsharp
   open BenchmarkDotNet.Attributes
   open BenchmarkDotNet.Running

   type Bench() =
     let data = [| 1..10_000 |]

       [<Benchmark>]
       member _.Chained() =
         data
         |> Array.map (fun x -> x * 2)
         |> Array.map (fun x -> x + 1)
         |> Array.filter (fun x -> x > 10)

       [<Benchmark>]
       member _.ManualFusion() =
         data
         |> Array.choose (fun x ->
               let y = x * 2 + 1
               if y > 10 then Some y else None)

   [<EntryPoint>]
   let main _ =
     BenchmarkRunner.Run<Bench>() |> ignore
     0
   ```

   If the chained version is significantly slower and allocates more memory, that confirms intermediate arrays are being created. `BenchmarkDotNet` reports both time and memory allocations, which is the smoking gun\*.

   \*A "smoking gun" is an idiom that refers to a piece of evidence or a fact that serves as indisputable, conclusive proof of a crime, theory, or wrongdoing

3. Use dotMemory or the .NET Memory Profiler

   Run the chained pipeline under `JetBrains dotMemory` or the `Visual Studio` memory profiler and look for multiple short-lived array allocations appearing and being GC'd — a clear sign of intermediate arrays.

4. Add side effects to prove multiple traversals

   This is the simplest and most direct test:

   ```fsharp
   let result =
     [| 1..5 |]
     |> Array.map (fun x ->
         printfn "map1: %d" x
         x * 2)
     |> Array.map (fun x ->
         printfn "map2: %d" x
         x + 1)
     |> Array.filter (fun x ->
         printfn "filter: %d" x
         x > 5)
   ```

   If fused, you'd see the prints interleaved per element (map1→map2→filter for element 1, then element 2, etc.). If not fused, you'll see all map1 prints first, then all map2, then all filter — proving separate traversals.

## References

- [1] - HINZE, R.; HARPER, T.; JAMES, D. W. H. Theory and Practice of Fusion. Computing Laboratory, University of Oxford. Available at: [link](https://www.cs.ox.ac.uk/ralf.hinze/publications/IFL10.pdf).
