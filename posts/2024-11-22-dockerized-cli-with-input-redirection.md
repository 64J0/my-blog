---
title: "How to run dockerized CLI programs with input redirection"
date: "2024-11-22"
show: true
tags: ["project", "docker", "cli", "fsharp"]
---

Most of the time, when I see someone using a containerized application, it involves a long-running process, typically a web server and its associated services, such as databases, message brokers, etc.

But it does not need to be like this. You can actually use containerized short-lived processes as well, like CLI tools.

First time I was presented to this possibility that I remember happened when I was trying to add a new CI step to scan the component of a system, using [aquasec/trivy](https://github.com/aquasecurity/trivy) project. Out of all the possible ways to configure it, one uses basically a Docker container. In fact, it's as easy as running this command:

```bash
# suppose you want to scan some local directory for misconfigurations
docker run -v $PWD:/myapp aquasec/trivy config /myapp

# I got this example from https://hub.docker.com/r/aquasec/trivy
```

Notice that for this to work, you need to create a volume binding your local directory (*$PWD*), to a folder inside the container's file system (*/myapp*).

By the time I found this, I thought this strategy was pretty cool, but decided to not dig deeper, since I had no real goal in mind. Then, after many months, the situation has changed.

I was working on a task of building a CLI tool, and there was a demand to dockerize the program to make it more portable and easy to use. But, instead of demanding a volume binding, it would make more sense to use the input redirection feature of Linux to send the file contents to the CLI program, something like:

```bash
# example of input redirection
./my-program < ./samples/example1.txt
```

After some initial failed tests, I eventually decided to read the Docker official documentation, looking for potential flags that could be used to send the data to the Docker process. Then, I rediscovered the `-i` flag - I had experiences before using it along with `-t` to get an interactive shell inside a container.

Basically, the `-i` flag is used to keep the container's STDIN open, and it lets we send input to the container through standard input (from [link](https://docs.docker.com/reference/cli/docker/container/run/#interactive)).

And it worked!

Then I decided to write this post, creating a simple CLI program to exemplify how one can use a dockerized CLI program with input redirection. The code is available at: [64J0/dockerized-cli-with-input-redirection](https://github.com/64J0/dockerized-cli-with-input-redirection).

The idea is that you'll first build the image, selecting either the "normal" .NET runtime base image or a chiseled one. Program will work exactly the same for either case, the difference is that the chiseled image is way more safe and production-ready.

If you don't know, .NET chiseled images are Microsoft's equivalents to Google's [distroless](https://github.com/GoogleContainerTools/distroless) containers. You can find more information about it at this post: [Announcing .NET Chiseled Containers](https://devblogs.microsoft.com/dotnet/announcing-dotnet-chiseled-containers/).

After this short digression towards chiseled and distroless images, the commands used were basically:

```bash
# build the cli image
docker build -t add-cli:v1-chiseled --file Dockerfile.cli --target runtime-chiseled .

# use it with input redirection
docker container run -i add-cli:v1-chiseled < ./samples/example1.txt

# use it piping data to it
cat ./samples/example1.txt | docker container run -i add-cli:v1-chiseled
```
