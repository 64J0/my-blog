---
title: "Starting with NixOS using QEMU"
date: "2022-01-07"
show: true
tags: ["NixOS", "QEMU", "virtualization"]
---

> Disclaimer: This post was originally posted in Dev.to. [Link](https://dev.to/64j0/starting-with-nixos-using-qemu-2ngh).

In this post I'll basically present the result of a research I did to understand better several components of a virtualization tool called QEMU. My goal, in the end, is to start a NixOS virtualized machine to run some experiments with this interesting OS.

## BIOS

- [Reference link](https://www.computerhope.com/jargon/b/bios.htm).

BIOS means short for *Basic Input/Output System*, is a *ROM (Read Only Memory)* chip found on motherboards that allows you to access and set up your computer system at the most basic level.

The BIOS includes instructions on how to load basic computer hardware. It also includes a test referred to as a POST (Power-On Self-Test) that helps verify the computer meets requirements to boot up properly. If the computer does not pass the POST, you head a combination of beeps indicating what is malfunctioning in the computer.

1. POST - Test the computer hardware and make sure no errors exist before loading the OS.
2. Bootstrap loader - Locate the OS. If a capable OS is located, the BIOS will pass control to it.
3. BIOS drivers - Low-level drivers that give the computer basic operational control over your computer's hardware.
4. BIOS setup or CMOS setup - Configuration program that allows you to configure hardware settings including system settings, such as date, time, and computer passwords.

The BIOS does things like configure the keyboard, mouse, and other hardware, set the system clock, test the memory, and so on. Then it look for a drive and loads the boot loader on the drive, which is either an MBR or GPT partition table.

## UEFI

UEFI stands for Unified Extensible Firmware Interface. It is a publicly available specification that defines a software interface between an operating system and platform firmware.

UEFI replaces the legacy BIOS firmware interface originally present in all IBM pc's, with most UEFI firmware implementations providing support for legacy BIOS services. UEFI can support remote diagnostics and repair of computers, even with no operating system installed.

## KVM

- [Reference link](https://www.redhat.com/en/topics/virtualization/what-is-KVM).

KVM stands for Kernel-based Virtual Machine. It's an open source virtualization technology built into Linux. Specifically, KVM lets you turn Linux into a hypervisor that allows a host machine to run multiple, isolated virtual environments called guests or virtual machines (VMs).

*KVM is part of Linux.*

## QEMU

- [Reference link](https://qemu-project.gitlab.io/qemu/).

According to the site, QEMU is a generic and open source machine emulator and virtualizer.

1. Emulator -

  Hardware or software that enables one computer system (called the host) to behave like another computer system (called the guest). An emulator typically enables the host system to run software or use peripheral devices designed for the guest system. Emulation refers to the ability of a computer program in an electronic device to emulate (or imitate) another program or device.

2. Virtualizer -

  Virtualization means a variety of technologies for managing computer resources by providing a software interface, known as an "abstraction layer", between the software (operating system and applications) and the hardware. Virtualization turns "physical" RAM and storage into "logical" resources.

  2.1. Hardware virtualization -

  This is what most computer people are referring to when they talk about virtualization. It partitions the computer's RAM into separate and isolated "virtual machines" (VMs) simulating multiple computers within one physical computer. Hardware virtualization enables multiple copies of the same or different operating systems to run in the computer and prevents the OS and its application in one VM from interfering with the OS and applications in another VM.

  2.2. Network and storage virtualization -

  In a network, virtualization consolidates multiple devices into a logical view so they can be managed from a single console. Virtualization also enables multiple storage devices to be accessed the same way no matter their type or location.

  2.3. Application virtualization -

  Application virtualization refers to several techniques that make running applications protected, flexible and easy to manage.

  2.4. OS virtualization -

  Under the control of one operating system, a server is split into "containers" that each handle an application.

  With this tool it's possible to:
  - Run operating systems for any machine, on any supported architechture. It provides a virtual model of an entire machine (CPU, memory and emulated devices) to run a guest OS.
  - Run programs for another Linux/BSD target, on any supported architechture.
  - Run KVM and Xen virtual machines with near native performance.

[YouTube - QEMU: A proper guide!](https://www.youtube.com/watch?v=AAfFewePE7c&ab_channel=DenshiVideo).

## Partition information

In this section I'll be sharing other necessary topics to understand the complete installation of the NixOS image.

### Swap memory

[Reference link](https://www.enterprisestorageforum.com/hardware/what-is-memory-swapping/).

Memory swapping is a computer techonology that enables an operating system to provide more memory to a running application or process than is available in physical *random access memory* (RAM). When the physical system memory is exhausted, the operating system can opt to make use of memory swapping techniques to get additional memory.

Memory swapping works by making use of virtual memory and storage space in an approach that provides additional resources when required. In short, this additional memory enables the computer to run faster and crunch data better.

With memory swapping, the operating system makes use of storage disk space to provide functional equivalent of memory storage space.

The process of memory swapping is managed by an operating system or by a virtual machine hypervisor.

  **Advantages of memory swapping:**

  - More memory: memory swapping is a critical component of memory management, enabling an operating system to handle requests that would otherwise overwhelm a system.

  - Continuous operations: swap file memory can be written to disk in a continuous manner, enabling faster lookup times for operations.

  - System optimization: application processes of lesser importance and demand can be relegated to swap space, saving the higher performance physical memory for higher value operations.

  **Limitations of memory swapping:**

  - Performance: disk storage space, when called up by memory
swapping, does not offer the same performance as physical RAM for process execution.

  - Disk limitations: swap files are reliant on the stabiity and availability of storage media, which might not be as stable as system memory.

  - Capacity: memory swapping is limited by the available swap space that has been allocated by an operating system or hypervisor.

### LVM volumes

In Linux, Logical Volume Manager (LVM) is a device mapper framework that provides logical volume management for the Linux kernel. Most modern Linux distributions are LVM-aware to the point of being able to have their root file systems on a logical volume.

### Systemd

- [Reference link](https://en.wikipedia.org/wiki/Systemd).

systemd is a software suite that provides an array of system components for Linux operating systems. Its main aim is to unify service configuration and behavior across Linux distributions; systemd's primary component is a "system and service manager" - an init system used to bootstrap user space and manage user processes. It also provides replacements for various daemons and utilities, including device management, login management, network connection management, and event logging. The name systemd adheres to the Unix convention of naming daemons by appending the letter d.

### Software RAID devices

- [Reference link](https://en.wikipedia.org/wiki/RAID).

RAID stands for "Redundant Array of Inexpensive Disks", is a data storage virtualization technology that combines multiple physical disk drive components into one or more logical units for the purposes of data redundancy, performance improvement, or both. This was in contrast to the previous concept of highly reliable mainframe disk drives referred to as "single large expensive disk" (SLED).

### UEFI (GPT) x Legacy Boot (MBR)

- [Reference link](https://www.freecodecamp.org/news/mbr-vs-gpt-whats-the-difference-between-an-mbr-partition-and-a-gpt-partition-solved/).

The main difference between UEFI and legacy boot is that **UEFI** is the latest method of booting a computer that is designed to replace BIOS while the **legacy boot** is the process of booting the computer using BIOS firmware.

Also, UEFI more is recommended because it includes more security features (with less complex code) than the legacy BIOS mode.

GPT and MBR are related to the partition used in the OS.

Q: So, what's a partition?

A: Is a virtual division of a hard disk drive (HDD) or a solid state drive (SSD). Each partition can vary in size and typically serves a different function.

In Linux there's typically a root partition (`/`), one for swap which helps with memory management, and large /home partition. the /home partition is similar to the C: partition in Windows in that it's where you install most of your programs and store files.

Program to check the partitions: **GParted**.

An overview of MBR and GPT partitions

Before a drive can be divided into individual partitions, it needs to be configured to use a specific partition scheme or table.

A partition table tells the OS how the partitions and data on the drive are organized. MBR stands for Master Boot Record, and is a bit of reserved space at the beginning of the drive that contains the information about how the partitions are organized. The MBR also contains code to launch the OS, and
it's sometimes called the Boot Loader.

GPT is an abbreviation of GUID Partition Table, and is a newer standard that's slowly replacing MBR. Unlike MBR partition table, GPT stores the data about how all the partitions are organized and how to boot the OS throughout the drive. That way if one partition is erased or corrupted, it's still possible to boot and recover some of the data.

Some differences:

* The maximum capacity of MBR partition tables is only about 2 TB. You can use a drive that's larger than 2 TB with MBR, but only the first 2 TB of the drive will be used. The rest of the storage on the drive will be wasted.

* In contrast, GPT partition tables offer a maximum capacity of 9.7 ZB, where 1 ZB = 1 billion TB.

* MBR partition tables can have a maximum of 4 separate partitions. However, one of those partitions can be configured to be an extended partition, which is a partition that can be split up into an 23 additional partitions. So the absolute maximum number of partitions an MBR partition table can have is 26 partitions.

* GPT partition tables allow for up to 128 separate partitions, which is more than enough for most real world applications.

* As MBR is older, it's usually paired with older Legacy BIOS systems, while GPT is found on newer UEFI systems. This means that MBR partitions have better software and hardware compatibility, though GPT is starting to catch up.

## Steps

Choose an interface for the system
- i3wm gaps
- dwm -> built with C code
- install the minimum system and install the interface later

Download the minimal image and configure it to use with QEMU.

``` bash
  # download the minimal image:
  $ wget https://channels.nixos.org/nixos-21.05/latest-nixos-minimal-x86_64-linux.iso
  # it will download a file named: latest-nixos-minimal-x86_64-linux.iso

  # config the image
  # cmd template -> qemu-img create -f qcow2 NOME.img XG
  $ qemu-img create -f qcow2 nixos-test.img 20G
  # command used to create, convert and modify disk images
  # -f:
  #   Stands for format option. qcow2 stands for copy on write 2nd generation.


  # bootstrap the machine
  # cmd template -> qemu-system-x86_64 -boot d -cdrom image.iso -m 512 -hda mydisk.img
  $ qemu-system-x86_64 -enable-kvm -boot d \
  $ -cdrom latest-nixos-minimal-x86_64-linux.iso \
  $ -m 2G -cpu host -smp 2 -hda nixos-test.img
  # command used to boot an image
  # to get the help use the -h flag
  # -enable-kvm:
  #   Enable KVM full virtualization support. This option is only available if KVM support
  #   is enabled when compiling.
  # -boot
  #   Specify boot order drives as a string of drive letters. Valid drive letters depend on
  #   the target architechture. The x86 PC uses: a, b (floppy 1 and 2), c (first hard disk)
  #   d (first CD-ROM), n-p (Etherboot from network adapter 1-4), hard disk boot is the default.
  # -cdrom
  #   Use file as CD-ROM image (you cannot use -hdc and -cdrom at the same time). You can use
  #   the host CD-ROM by using /dev/cdrom as filename.
  # -m
  #   Set the quantity of RAM.
  # -hda
  #   Use file as hard disk 0, 1, 2 or image.

  # start the vm after closing it
  $ qemu-system-x86_64 -enable-kvm -boot d \
  $ -m 2G -cpu host -smp 2 -hda nixos-test.img
```

Follow the installation steps provided by the docs. [Link here](https://nixos.org/manual/nixos/stable/index.html#sec-installation).

Some useful keyboard commands:

- /Ctrl-alt-g/ -> free the mouse from inside the image.
- /Ctrl-alt-f/ -> toggle switch fullscreen.
