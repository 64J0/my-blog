---
title: "Great projects: StevenBlack/hosts"
date: "2023-06-15"
show: true
---

# Introduction

After some time surfing the web, we eventually step into some cool projects, usually from the open-source community. If we are not careful enough, we can end up forgetting and losing those projects, which is something really sad.

With this in mind, I had the idea to start a new post category for my personal blog. The goal is to keep some documentation for myself and also share with my readers some cool projects that I discovered.

For this first article, I'm going to talk about the [StevenBlack/hosts](https://github.com/StevenBlack/hosts) project.


# Project overview

Before talking about this project, I'd like to record how I discovered it. Basically, one day I was checking some HackerNews posts and noticed a post from someone sharing this project.

Since it was aligned with one of my personal goals (you can make your life easier by blocking the enemy), I decided to investigate it and later added to my configuration.


### But, what is it?

In essence, it's a collection of known **/etc/hosts** configuration to avoid certain category of hostnames. With this configuration, you can set your own "hostname blocker".


### What are the categories that one can filter?

As the time of writing, the categories are:

-   adware
-   malware
-   fakenews
-   gambling
-   porn

And multiple combinations of it.


### Where does those hosts come from?

One can find this information reading the project's README: [link](https://github.com/StevenBlack/hosts#sources-of-hosts-data-unified-in-this-variant).


### [Linux] What is /etc/hosts

You can find the manual in Linux by using the command **man hosts**, but if you are not into it, you can check the contents of this section.

> As your machine gets started, it will need to know the mapping of some hostnames to IP addresses before DNS can be referenced. This mapping is kept in the **/etc/hosts** file. In the absence of a name server, any network program on your system consults this file to determine the IP address that corresponds to a host name.
>
> &#x2013; [2]

> The file **/etc/hosts** started in the old days of DARPA as the resolution file for all the hosts connected to the internet (before DNS existed). It has the maximum priority, meaning this file is preferred ahead of any other name system.
>
> However, as a single file, it doesn't scale well: the size of the file becomes too big very soon. That is why the DNS system was developed, a hierarchical distributed name system. It allows any host to find the numerical address of some other host efficiently.
>
> [&#x2026;] the order of name resolution is actually defined in **/etc/nsswitch.conf**, which usually has this entry:
>
> ``` hosts: files dns ```
>
> which means "try files (/etc/hosts); and if it fails, try DNS."
>
> &#x2013; [3]


### Is this project still maintained?

Yes, the last update merged to the master branch, considering the time of writing this article, was from 10 hours ago. Indeed, it was the release of version **3.13.3**.


### Why they use 0.0.0.0 instead of 127.0.0.1?

This is something I was intrigued as well. But it's explained in the project's README: [link](https://github.com/StevenBlack/hosts#we-recommend-using-0000-instead-of-127001).

> Traditionally most host files use **127.0.0.1**, the loopback address, to establish an IP connection to the local machine.
>
> We prefer to use **0.0.0.0**, which is defined as a non-routable meta-address used to designate an invalid, unknown, or non-applicable target.
>
> Using **0.0.0.0** is empirically faster, possibly because there's no wait for a timeout resolution. It also does not interfere with a web server that may be running on the local PC.
>
> &#x2013; [1]


### How to reload the hosts file?

After updating the **/etc/hosts** file, the operating system can take some time before realizing we made this change, due to OS DNS lookups cache.

To cope with this problem, they provide the instructions to force this reload without rebooting the machine considering different operational systems in their README: [link](https://github.com/StevenBlack/hosts#reloading-hosts-file).


# How to use it?

In my case, I decided to go with the local Python 3 execution.

The commands I used are described in the sequence.

```bash
git clone https://github.com/StevenBlack/hosts.git --depth=1
cd hosts/

pip3 install --user -r requirements.txt

# Added my current hosts configuration to the file myhosts in the root
# level of the repository.

python3 updateHostsFile.py --auto --output "hosts-test-1" --extensions gambling porn
```

After checking the contents of the **./hosts-test-1/hosts** file, and making some small changes there, I replaced my current **/etc/hosts** configuration.

```bash
# 1. Made the changes in ./hosts-test-1/hosts
# 2. Created a backup for my current hosts configuration
cp hosts hosts-2

# 3. Update the contents
cat <USER_PATH>/hosts/hosts-test-1/hosts > hosts
```


# References

-   [1] - <https://github.com/StevenBlack/hosts>

-   [2] - <https://tldp.org/LDP/solrhe/Securing-Optimizing-Linux-RH-Edition-v1.3/chap9sec95.html>

-   [3] - <https://unix.stackexchange.com/questions/421491/what-is-the-purpose-of-etc-hosts>
