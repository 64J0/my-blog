---
title: "Dockerizing a Python Backdoor Scenario to Study"
date: "2022-09-04"
show: true
tags: ["security", "docker", "python", "devsecops"]
---

# Introduction

I myself always had a curiosity about the hacking community and their tools,
probably due to the media way to present it, with all its glamour and mystical
super-powers.

Since the end of last year, I finally started studying more about this topic,
first through the [Security Engineering](https://www.cl.cam.ac.uk/~rja14/book.html) book, written by Ross Anderson, which is
a very complete reference for theoretical topics (IMO).

This book, in general, is pretty good if you want to expand your knowledge and
imagination about possible threats, since it covers a broad range of
topics. Also, in the end of the book we have a list with more than 2,000
references if you want to dig deeper in some topic.

But, after reaching the half of the second part of the book (the book is divided
in 3 parts), where the author presents in details some specific applications of
secure systems, I felt my motivation dropping due to the lack of practical
stuff.

In this period, during a meeting with my coach in this topic, he gave me the
idea to keep reading the book so I can expand my imagination, but to start doing
some very practical course, which I eventually started in Udemy.

This strategy really helped!

After some months, I was able to finish the book, and had some great surprises
with the last chapters. In the end, the chapter 27, which talks about "Secure
Systems Development" was one of my favorites along with the "Side Channels", and
all the chapters from the part 1 of the book.

During the [Complete Ethical Hacking Bootcamp 2022: Zero to Mastery](https://www.udemy.com/course/complete-ethical-hacking-bootcamp-zero-to-mastery/) in Udemy
(which I did not finish yet), there is a section where the instructor show us
how to create our own backdoor using Python from scratch.

This is the core of the script I'm going to present here, although with some
changes to better behave in the environment I'm setting to test it (Docker
containers).

If you got curious, just keep reading.

# What is this project?

The core idea of this project is to dockerize an insecure environment, composed
of two applications (the attacker and the target), to make it easier to study
the connection configuration for a reverse shell.

As I mentioned before, the script I'll use is basically the same Python script
presented during the course in Udemy, so I'll not focus on it.

You can find the code presented here at this Github link.

-   [64J0/Python-Backdoor-Dockerized](https://github.com/64J0/Python-Backdoor-Dockerized)

So, let's go, first setting some base knowledge, and later exploring the Docker
configuration.

## Requirements:

-   Docker version `20.10.17`
-   docker-compose version `1.29.1`

# What is a backdoor?

Let's first set a basic common knowledge about the terms used in this
article. In the sequence, please consider the definitions presented here.

The first term I'm going to set is the backdoor.

> A backdoor is a typically covert method of bypassing normal authentication or
> encryption in a computer, product, embedded device (e.g. a home router), or
> its embodiment [&#x2026;].
>
> A backdoor may take the form os a hidden part of a program, a separate program
> (e.g. Back Orifice may subvert the system through a rootkit), code in the
> firmware of the hardware, or parts of an operating system such as
> Windows. [&#x2026;]
>
> &#x2014; [1]

In this article, the backdoor we'll tackle is a Python script that is used in
the target machine to connect to the attacker machine.

# What is a reverse shell?

You can think of the shell as a tool to access the some machine and run
commands, just like a terminal.

In normal scenarios, one uses the shell to control its own system, or the system
of some server machine.

There are two ways to access the shell in the target machine:

-   Reverse shell
-   Bind shell

## Reverse shell

The idea of a reverse shell is that we're going to run a command in the target
machine to make it connect to the attacker machine, leaving us with a terminal
to interact with it.

During the course in Udemy, our instructor tell us that this is best option to
pick since some firewalls can block operations in the other type of shell.

Finally, there are many ways to set up a new reverse shell, and the reference
[2] presents more details about this topic.

## Bind shell

Bind shell is a different approach where we connect to the target machine when
its port is open, executing some vulnerable service and payload.

> Bind shells have the **listener running** on the target and the **attacker
> connect to the listener** in order to gain a remote shell.
>
> &#x2014; [3]

This approach is more hard to explore in the wild since firewalls are commonly
configure to avoid it.

# Network requirements

There are some requirements in order for this project to work properly:

1.  Containers must be in the same network, so they can reach each other.
2.  The target machine must know the IP of the attacker machine. I know, this is
    not very good considering real scenarios, but it's fine for educational
    purposes.

Due to the flexibility of network configurations in Docker and Docker-Compose,
it was very easy to stablish those requirements.

I decided to use a private network (`10.0.45.0/24`), and assign static IPs to
the containers:

-   Attacker IP: `10.0.45.15`
-   Target IP: `10.0.45.16`

This way I can simply use this information when creating the script in Python.

# How to run this project?

Although the `README.org` of the project already contains the information to run
it, I decided to replicate those instructions here.

Read the following code in order to understand better.

```bash
    # First, start the attacker container.
    # You must use the docker-compose command so it will set up the
    # network configuration automatically.
    docker-compose run --entrypoint="bash" attacker
    # In the shell open, run the python command:
    python server.py
    #
    # Here you'll be able to run commands executed in the target
    # environment.
    # Notice that it takes 20 seconds before the target tries to connect
    # to the attacker.

    # ====================================
    # In a different shell, start the target container if it's not running
    # yet.
    docker-compose up target

    # ====================================
    # Kill everything:
    docker-compose down
```

## Example:

![Example output for the python backdoor in the container.](/post-images/python-backdoor-dockerized/example-backdoor.jpg "Example output for the python backdoor in the container")

# Conclusion

I consider myself a very lucky person by being able to work with brilliant
people in many situations.

All that I accomplished personally in the recent times was materialized, at
least faster, due to the environment I lived in Datarisk's Tech Unit. There I
was presented to an environment with very smart people, willing to always
improve, and also help others to thrive, and become the best versions of
themselves.

I would like to dedicate this article to my "mentors" in this step of my
journey, which were respectively: Bellani, JZ and is currently Pedro from the
R&D team.

# Bonus Tip

If you want to understand better the Linux networking with a hands-on content, I
recommend reading [Building a Web server in Bash](https://dev.to/leandronsp/building-a-web-server-in-bash-part-i-sockets-2n8b), and [Mastering the Docker
Networking](https://dev.to/leandronsp/mastering-the-docker-networking-2h57), both from Leandro Proença.

Also, if you understand portuguese, consider watching [this video](https://www.youtube.com/watch?v=lc6U93P4Sxw&ab_channel=FabioAkita) from Akita in
YouTube.

# References

[1] - Backdoor (computing). Wikipedia. [Link](https://en.wikipedia.org/wiki/Backdoor_(computing)).
[2] - What Is a Reverse Shell. Acunetix. [Link](https://www.acunetix.com/blog/web-security-zone/what-is-reverse-shell/).
[3] - Reverse Shell vs Bind Shell. Anmol Shah - Medium. [Link](https://infosecwriteups.com/reverse-shell-vs-bind-shell-d5a1e80b6a6c).
[4] - Complete Ethical Hacking Bootcamp 2022: Zero to Mastery. Udemy. [Link](https://www.udemy.com/share/103JJy3@a0EkDRAEX-pNEhfI6OoDiw3F8lW7lZSaG65cpAsbV9BI0wBF2F9Yb1JMegmVqRQc/).
[5] - Networking in Compose. Docker docs. [Link](https://docs.docker.com/compose/networking/).

# Legal

Notice that I created this project for personal educational purposes only, and
I'm not responsible for its misusage, or for enhanced variants created.
