---
title: "Program memory layout"
date: "2025-07-10"
show: true
tags: ["linux", "os", "low-level", "memory"]
---

## Introduction to processes

Modern operational systems are capable of handling multiple processes running asynchronously, and sometimes concurrently.

A process is essentially the instance of a program being executed, with its own memory and other resources.

Those processes that run outside the OS scope (in Linux we say that those programs run in user mode, as opposed to OS processes that run in kernel mode), do not have direct access to the physical hardware. Instead, the OS acts in the middle, using `syscall` s triggered from the user space program to deal with the hardware.

Considering the RAM access, when a user space program starts, the OS provides to it something called a virtual memory address space, that only the OS knows how to map into real physical memory address space. This is necessary to make sure a program has a harder time messing with another program's memory, making life harder for bad actors.

Both virtual and physical memory address spaces are divided into blocks with the same size, called **pages** at the virtual memory scope, and **frames** at the physical memory scope.

---

## Virtual memory segments

The virtual memory of a process is divided into several regions or sections, with each region serving a specific purpose.

``` shell
  # +----------------------------------+
  # |          Stack        (v)        |
  # +----------------------------------+
  # |                                  |
  # |    ~~~~~ available space ~~~~    |
  # |                                  |
  # +----------------------------------+
  # |                                  |
  # |          Heap         (^)        |
  # |                                  |
  # +----------------------------------+
  # |          BSS                     |
  # +----------------------------------+
  # |          Data                    |
  # +----------------------------------+
  # |                                  |
  # |          Text / Code             |
  # |                                  |
  # +----------------------------------+
```

---

## Why is memory divided into segments?

1.  Security (access permissions and privilege level).

    For example, at the *text/code* section, the memory is both **readable** and **executable**, but not **writable**, while the memory at the *heap* and *stack* sections are **readable** and **writable** but not **executable**.

    Mixing those memory sections would make access rights more difficult to enforce.

2.  Access pattern differences (sequential vs. random).

    The stack grows in a predictable way, making memory allocation and release cheap. The heap otherwise, can behave unpredictably in a dynamic way, that makes its operations more expensive.

3.  Isolation of bugs (buffer overflows).

    Buffer overflows, with this division, are less likely to corrupt data in other regions.

---

## Memory sections

### Text/Code

The program code is read from a binary file, from the storage device, and contains the program instructions that are going to be executed.

It's usually marked as read-only to prevent the code from editing itself.

The OS knows upfront the exact amount of memory necessary to load the entire program.

### Data

The data memory section contains initialized variables, i.e., variables that have an initial value.


### BSS

This memory section contains uninitialized or zero-initialized variables.

The BSS acronym stands for "Block Started by Symbol"

By using this approach of separating initialized and uninitialized variables, the size of the program shrinks, and the start up is faster.


### Heap

The heap is used for dynamically allocated memory. Think in terms of C's *malloc* function or C++'s *new* keyword. It relies on a memory allocator to manage the program's available memory during runtime.

The memory allocator keeps track of which parts of the memory are free, and which are in use. It's also responsible for allocating the memory space and later freeing it according to the program demands.

If the program does not release the unnecessary memory blocks after their usage, these memory blocks will remain unusable until the program exits. This problem is known as `memory leak`, and over time causes the blocked memory blocks to pile up, eventually crashing the program.

As the program demands more memory in runtime, the heap usually grows upward, from lower addresses to higher ones.

### Stack

Instead of growing upward like the heap, the stack grows downward, from higher memory addresses to lower ones. It uses a basic last-in first-out (LIFO) data structure, which is why it's called a stack.

When the program calls a function, the function's local variables, any passed parameters, the caller’s return address, and potentially other data are stored at the stack, in a structure called a stack frame.

The more nested the function calls, the more frames are stacked on top of each other. If there's a lot of frames, the program eventually breaks due to a stack overflow error.

The stack memory region is limited to a certain fixed size, usually ranging from 1 MB - 8 MB, depending on the OS.

Stack memory allocations and releases can be managed with a single pointer, called the stack pointer, that points to the top of the stack. Every time a stack frame is pushed, the stack pointer advances by the size of the frame. When the frame is popped, the stack pointer moves back, by the size of the popped frame.

This simple pointer update is one of the reasons that memory allocations and releases at the stack region is so fast. The heap on the other side, uses a memory allocator to search for a suitable free memory block, update internal data structures, and return a pointer to the address of the allocated memory. This process takes much longer than adjusting a single pointer.

Furthermore, other than storing stack frames, the stack segment, which is a contiguous array of memory locations, can be used as temporary storage to save generic values in registers and call them back later or, more importantly, to transfer values to functions.

---

## Assembly examples

If you found this interesting and would like to check a real life assembly code, check this repository: [64J0/samples--assembly](https://github.com/64J0/samples--assembly).

---

## References

-   [1] Why Programs Use Stack, Heap, and Other Memory Segments. YouTube [link](https://www.youtube.com/watch?v=EXIxAPITb7U). My main inspiration to write this post, to keep its lessons documented for fast consulting and studying.
-   [2] Beginning x64 Assembly Programming. Amazon [link](https://a.co/d/hE556TU).
-   [3] Understanding the Memory Layout of Linux Executables. GitHub Gist [link](https://gist.github.com/CMCDragonkai/10ab53654b2aa6ce55c11cfc5b2432a4).
