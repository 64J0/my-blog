---
title: "How to combine multiple languages into the same application"
date: "2025-07-28"
show: true
tags: ["linux", "os", "low-level", "compiler", "memory"]
---

### Changelog

-   [2025-07-27 Sun] First version released.

## Introduction

Have you ever seen a project that combines more than one programming language to build a single application? If not, let me give you some examples:

-   [pytorch/pytorch](https://github.com/pytorch/pytorch)
-   [duckdb/duckdb](https://github.com/duckdb/duckdb)
-   [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg)

This combination, when properly done, delivers better performance by leveraging the different language strengths. The key to understanding how this works is to understand how the compiler works.

### Reasons for combining different programming languages

-   **Performance optimization:** Critical sections of code (e.g., numerical computing, graphics, signal processing) can be implemented in C/C++ or Rust for speed. [1]
-   **Leverage existing libraries of codebases:** Access mature, battle-tested libraries written in other languages. [1]
-   **Leverage system-level access:** Need to interact with hardware, memory, OS-level APIs, or real-time constraints. [1]
-   **Faster development for non-critical components:** Use high-level languages for UI, scripting, or glue logic to speed up development. [1]
-   **Team expertise and division of labor:** Teams with different expertise can work on the same project using the languages they know best. [1]
-   **Cross-platform support:** Some languages are better suited for certain platforms. [1]
-   **Gradual migration or legacy integration:** Migrate legacy code incrementally rather than rewriting the entire system. [1]

## How the compiler works

So, with no further ado, let's get a generic comprehension of how a compiler works, by considering what GCC (GNU Compiler Collection) does. Check below a simple schema detailing all the modules associated with the steps performed for compiling C code:

``` bash
  #
  #               +-------------------+   +--------------+   +-----------+   +--------+
  #  (raw code)-->| Pre-Processor (C) |-->| Compiler (C) |-->| Assembler |-->| Linker |-->(binary)
  #               +-------------------+   +--------------+   +-----------+   +--------+
  #
  # - Obs.: To compile C++ code, we can just replace the Pre-Processor and
  # Compiler with the appropriate boxes. In fact, we can replace any box there for
  # compiling different languages, like Fortran, Ada, Objective-C, etc. That's why
  # GCC is called GNU Compiler Collection nowadays.
  #
```

### Pre-Processor

At the **Pre-Processor** stage, the raw code is transformed for the next stages. There, comments are removed, macros are expanded (*#define*), conditional compilation is resolved (*#if*, *#ifdef*), and include files are inserted (*#include*).

So the result from this stage is also C code.

### Compiler

Next we have the **Compiler** stage. There, the raw C code is validated and transformed into assembly code, which are the instructions the computer will execute.

### Assembler

Then, at the **Assembler** stage, this assembly code is transformed from its human-readable representation into binary (machine code) that the CPU understands.

The result file is called *object file*, and usually has the *.o* extension.

Notice that we can't run this file yet, since the compiler still needs to link the necessary dependencies at the binary representation.

### Linker

Finally, at the **Linker** stage, multiple object files are linked as needed. The linker responsibilities are:

-   **Symbol resolution:**
    -   Match symbol references with definitions across all *.o* and library files.
    -   Ex.: *printf* reference in code is resolved to *libc*.
-   **Relocation:**
    -   Adjust memory addresses in object code so everything fits into the final executable.
    -   Ex.: if function *foo* ends up at address *0x80483f1*, all calls to *foo* get patched.
-   **Layout & sections merging:**
    -   Merge code (*.text*), data (*.data*), constants (*.rodata*), uninitialized data (*.bss*), etc.
    -   Build the final Executable and Linkable Format (ELF) file.

And more.

To do this, there are two linking options:

-   **Static linking:** The external object code is copied from the dependency and embedded into the application's final binary. Everything is self-contained and ready to run, whenever we want. This option has many drawbacks, like increasing the binary size, and making it harder to update the dependency binary.
-   **Dynamic linking:** Don't copy the external object code into the final binary. Instead, libraries are pre-compiled into special files called *dynamic shared library* (in Linux this kind of file uses the *.so* file extension, and in Windows uses the *.dll* file extension). And when linking our program, the compiler will add a reference to the place where the program can find the necessary dependency instructions code, from those dynamic shared libraries.

    At runtime, the OS will be able to load the dependency instructions to the program address space, so the program can use it as part of the executable.

## Combining different languages

Now that we have a better understanding of the modular structure of the compiler, we can get back to the original question.

Considering that we can configure our compiler to output assembly code, instead of the final binary, it's just a matter of combining different assembly programs.

And from this, it's clear that the component responsible for making those different assemblies work together is the **Linker**.

In fact, we can combine assembly code generated by different compiler suites, like GCC and Rust. But keep in mind that this assembly needs to follow proper rules to work correctly. Those rules are specified by the Application Binary Interface (ABI) [2], which dictates things like:

-   Function calling conventions.
-   Name mangling, i.e., the process a compiler uses to encode extra information into function and variable names in the compiled object code.
-   Struct layout.
-   Exception handling, etc.

## References

-   [1] - Why Some Projects Use Multiple Programming Languages. Core Dumped. YouTube [link](https://youtu.be/XJC5WB2Bwrc?si=vnXAKSXxYg502EeH).
-   [2] - Application Binary Interface. Wikipedia [link](https://en.wikipedia.org/wiki/Application_binary_interface).

