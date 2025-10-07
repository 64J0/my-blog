---
title: "Book Review: Beginning x64 Assembly Programming"
date: "2025-06-07"
show: true
tags: ["book", "review"]
---

## Disclaimer

This text was originally posted on my personal LinkedIn account.

## Review

Over the past month, I've embarked on a deeper dive into assembly language, focusing on NASM and the x86-64 architecture. My goal was to strengthen my understanding of how processor instructions and registers interact at a low level — the foundation of how software truly runs.

To support this journey, I’ve been using the book “Beginning x64 Assembly Programming” alongside a large language model (LLM) as a learning companion to clarify complex topics. Assembly is a rich and intricate domain, and this combination has proven to be an insightful way to bridge theory with practical understanding.

Yesterday, I finished reading the book, and must admit that it was better than expected. There are plenty of examples, covering basic and advanced topics, like:

- Dealing with console I/O, for example, reading from or writing to the console using either an external function (from C), or making the `syscall` directly by configuring the necessary registers according to the System V ABI calling convention;
- Integer and floating point arithmetic (using the xmm registers for the float operations);
- Using macros;
- Creating a simple command line application;
- Using inline assembly in C code;
- Dealing with SIMD (Single Instruction, Multiple Data), which is a functionality available in some CPUs that allows our programs to execute one instruction on multiple data "streams", which can potentially improve program's performance. There we were introduced to both SSE (Streaming SIMD Extension) and AVX (Advanced Vector Extension).

If you're interested, you can find some of the code examples at my public repository: [64J0/samples--assembly](https://github.com/64J0/samples--assembly).
