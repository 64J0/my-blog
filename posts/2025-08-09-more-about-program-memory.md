---
title: "More about program memory layout"
date: "2025-08-09"
show: true
tags: ["linux", "os", "low-level", "memory"]
---

### Changelog

- [2025-08-09 Sat] First version released.

## Introduction

Last month I wrote a post about program memory layout [1], that introduces the core concepts regarding how programs are structured at the computer memory when a new program instance is created, what are the sections and the layout, etc.

But I felt that the explanation there was too simplistic, so I decided to keep searching for more detailed and practical references. In essence, I was looking for something that used real-life examples. Eventually, I found a new video from a presentation at NDC [2] that fortunately talks about this same topic, but now in a deeper level. And this post is the result of my notes from this new reference.

## Process address space

At a top level, the process address space is divided into two parts, the **kernel space** and the **user space** (which contains the program that is being executed). And the switch between those two sections happens whenever our program, running at the user space makes a *system call*.

```bash
# +--------------------+
# |                    |
# |    Kernel space    |
# |                    |
# +--------------------+
# |                    |
# |    User space      |
# |                    |
# +--------------------+
```

On Linux using 64-bit processors and x86-64 architecture, by default the memory is split 50% for the kernel space and 50% for the user space. This is configurable using some flags.

And why we map both the kernel and the user program memory into a single memory space? The answer is that this brings some performance benefits:

-   Cheaper mode switch
-   Cheaper context switch (kernel stays mapped)
-   Less trashing TLB (Translation Lookaside Buffer)

In modern Linux, for security reasons, the entire kernel is usually not always mapped. If you'd like to get a better understanding of this, search for Linux KPTI (Linux Kernel Page-Table Isolation).

**Kernel space**

-   Contains the OS kernel, which is called through system calls;
-   How to check how many system calls a program does? Use **strace**;

```c
#include <stdio.h>

// compilation:
// clang-18 main.c -o userProgram
int main() {
  printf("Hello, world!\n");
  return 0;
}
```

And after compiling we can use:

```bash
# compile the program
clang-18 main.c -o userProgram

# show the syscalls performed by the process
strace ./userProgram

# and count the quantity of syscalls
strace ./userProgram 2>&1 | wc -l
# which gives me 37 syscalls performed
```

The output of using the *strace* tool will be a big chunk of text, showing all the syscalls performed by the process. And a bunch of those are related to setting the program to execute properly.

\*Something to keep in mind is that executing syscalls is not a cheap operation, so in order to improve a program's performance we can try to minimize the quantity of those.

## Interesting tools

During this talk multiple interesting tools were presented. At this section I add the most useful and cool.

### Check your CPU

If you want to check your CPU's architecture, you can use the program *lscpu*:

```bash
# Display information about the CPU architecture.
lscpu
```

The result presents many details of your CPU, including the total cache size discriminated by the cache level, and the address sizes, which in my case uses 48 bits.

![lscpu result](/post-images/more-about-program-memory/lscpu-001.png "lscpu result")

But wait. How big is the process address space? The following table must help understand.

| 32-bit processors | 64-bit processors  |
|----------------- |------------------ |
| 2^32 bytes = 4GB  | 2^48 bytes = 256TB |
|                   | 2^57 bytes = 4PB   |

As you can see, there are currently two possibilities for 64-bit processors, and both use less than 64 bits. Why don't we have 2^64 bytes on 64-bit processors?

Well, the explanation is related to current implementation limitations. Even though 2^64 (16 exabytes) is the theoretical limit for this architecture, 48 and 57 bits is what current implementations support for practical reasons.

### Inspect the memory layout of a Linux process

In Linux, there's this tool called *pmap*, which reports the memory map of a process.

```c
#include <stdio.h>

// compilation:
// clang-18 main.c -o userProgram
int main() {
  printf("Hello, world!\n");
  getchar(); // so we have time to check the memory map of the program
  return 0;
}
```

And to see the memory mapping of this program:

```bash
# compile the program
clang-18 main.c -o userProgram

# see memory mappings
./userProgram & pmap $! -XX
```

Where the result, as presented by Piotr is:

![pmap result](/post-images/more-about-program-memory/pmap-001.png "pmap result")

Notice that in this table, except from the first memory address which is 64-bit size, the others are 48-bit size, as expected.

Other than that, something else to keep in mind is that, in Linux, memory addresses with 48-bits, where the most significant bit is 1 (48th bit) are associated with the kernel space. If this bit is 0, then this memory address is associated with the user space.

Next, after the column that presents the memory address for where that section starts, we have a column showing the permissions for the memory location, which could be the conventional read, write and execute, and there's an additional setting that defines if the memory address can be shared with other processes or not (p is for private).

Then, we have the offset column, which is only relevant if the memory address is associated with a file, and it defines what is the offset in the file that is being mapped.

Next, the Inode in Linux specifies the file id. So, if the Inode repeats at this table it means that the same file is being mapped into the process' memory addresses, maybe changing only the offset.

Then we have the Size column, which specifies the size of the memory segment in bytes, and Rss specifies what part of this memory segment is actually in physical memory.

### Explore the ELF file

To check the sections that are inside the ELF file compiled we can use the *readelf* tool:

```bash
# check what are the sections of the ELF file:
readelf -S userProgram

# to display the program headers, which stores the information of WHAT to load
# WHERE:
readelf -l userProgram
```
...

# References

-   [1] - *Program memory layout*. 64J0's blog post [link](https://gaio.dev/posts/2025-07-10-program-memory-structure).
-   [2] - *Demystifying Process Address Space: Heap, Stack, and Beyond - Piotr Wierciński - NDC TechTown 2024*. NDC Conferences. YouTube [link](https://youtu.be/pI-HRRh7-dU?si=KwFtDIxe5mJjx8Hq). You can check the presentation slides here: [laminowany/Slides](https://github.com/laminowany/Slides).
-   [3] - *Linux Memory Management FAQ*. Hacker News thread [link](https://news.ycombinator.com/item?id=26117516). I found this link while looking for something that was not clear. It has many interesting discussions there, and this is related to this other page [landley memory faq](https://landley.net/writing/memory-faq.txt).
