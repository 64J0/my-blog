---
title: "FOSS Contributions"
date: "2022-09-18"
show: true
tags: ["FOSS", "Open Source", "Github"]
---

# Introduction

Hello people, in this article my goal is to share a framework I use when I want
to collaborate on some open source project. I must confess that it is more
useful when you don't have much knowledge about the project you want to
contribute to yet.

It's pretty simple and has worked well for me.

# The Framework

With no further ado, this framework is based on three steps, and it helps you to
understand how confident or capable you are in the project code regards.

The steps are:

1.  Documentation.
2.  Automated Tests and Bug Fix.
3.  New Features.

## Documentation

Why should you start with documentation PRs?

Because, usually, we don't have that deep knowledge of most of the tools we use
(internal mechanisms), since this knowledge is not necessary if the tool is well
implemented.

In this first step, focus only on reading the documentation, so you get more
acquaitance with it. During this process, you can spot several kinds of
errors. Next, I present a non-exhaustive list of problems that could pop-up:

-   Typos,
-   Docs lacking updates,
-   Enhancement opportunities in some explanation.

The first error kind is the most simple to fix. Just send a PR to solve the
typos and we're already improving the project.

-   Example: [fslaborg.github.io#40 - Fix typos tutorial 001](https://github.com/fslaborg/fslaborg.github.io/pull/40)
-   Example: [azure-docs#84922 - Update tutorial-django-aks-database.md](https://github.com/MicrosoftDocs/azure-docs/pull/84922)
-   Example: [terraform-provider-azuread#827 - Update group.md](https://github.com/hashicorp/terraform-provider-azuread/pull/827)
-   Example: [Nacara#162 - Fix typos in docs](https://github.com/MangelMaxime/Nacara/pull/162)

The second error kind is a bit more complex to solve. Usually, you can simply
create an issue to alert about this piece of documentation with incorrect
instructions and let the project maintainers take care of it.

-   Example: [Saturn#349 - How To Start a Saturn Project](https://github.com/SaturnFramework/Saturn/issues/349)
-   Example: [Saturn#354 - Enhance the "Explanation" section of the documentation](https://github.com/SaturnFramework/Saturn/pull/354)

Finally, the third idea is when you decide to contribute for the project adding
more information when you noticed the lack of it. It could be something like
adding instructions on how to run the automated tests, or how to make the
project work with some different tool.

-   Example: [Saturn#315 - Add test instructions to the README.md and fix the test instructions in the CONTRIBUTING.md](https://github.com/SaturnFramework/Saturn/pull/315)

Or it could be something aesthetic (make sure to explain why you think it makes
sense to change it, you need to convince the maintainer):

-   Example: [Giraffe#549 - Change sample EndpointRoutingApp level](https://github.com/giraffe-fsharp/Giraffe/pull/549)

### Bonus

Still in this section, another thing that you can do to contribute for open
source projects is to give ideas for new features. You can simply create an
issue describing what you want, and giving ideas for the maintainers.

-   Example: [Trivy#2298 - Enhance the HTML report table](https://github.com/aquasecurity/trivy/issues/2298)
-   Example: [Fubernetes#2 - Have you considered if any typeproviders can help with that, may be some protobuf typeprovider?](https://github.com/64J0/Fubernetes/issues/2)

Althought this is not a PR contribution, it is still very useful.

## Automated Tests and Bug Fixes

The next step, after reading and improving the documentation, is to start
digging into the project code. In order to do this, I like to start checking the
automated tests of it.

Why?

Because it is fairly simple to get feedback, you can improve your understanding
of the code behavior, and you can learn how things must be set up for it to run
(usually).

-   Example: [Saturn#355 - Add more test scenarios for the router feature](https://github.com/SaturnFramework/Saturn/pull/355)

And, another aspect is that in this step I'm usually confident enough to start
sending PRs to solve bugs reported by some users.

-   Example: [Nacara#161 - Fix: The menu should be scrollable](https://github.com/MangelMaxime/Nacara/pull/161)
-   Example: [Giraffe#547 - Add GetWebHostEnvironment function and add deprecation warning to GetHostingEnvironment](https://github.com/giraffe-fsharp/Giraffe/pull/547)

## New Features

Finally, now that you have read the documentation and improved it, studied the
test scenarios, and is confident about knowing the code behavior, the next step
is to finally add new features and send PRs with your custom code.

Notice that those are, most of the time, the PRs that take longer to get merged,
because it depends on the understanding of the maintainers about this new
feature that you're proposing.

-   Example: [node-gitlab-2-github#149 - Dockerize this application](https://github.com/piceaTech/node-gitlab-2-github/pull/149)
-   Example: [p88#1 - Enhance Dockerfile security and README readability](https://github.com/rafaelbmateus/p88/pull/1)[
-   Example: [Saturn.CLI#39 - Fix the code generation feature due to .NET 6](https://github.com/SaturnFramework/Saturn.Cli/pull/39)

Sometimes it does not work that well, but have patience:

-   Example: [YoloDev.Expecto.TestSdk#131 - Add filter-test-case to readExpectoConfig](https://github.com/YoloDev/YoloDev.Expecto.TestSdk/pull/131)

# Conclusion

As I said before, I'm using this framework in order to organize myself about
open source contributions, and it's working great. But, again, this is not
something that you must follow every time you want to start contributing to some
project.

Sometimes we just know enough about the project and the code, and we just want
to fix a bug there, so it's fine to start from the final steps for example.

Also, we can send PRs touching in more than one step, and it's fine, just send
your contribution.

That's it. Let me know if you have any question, or would like to talk about
this framework.

-   My [LinkedIn](https://www.linkedin.com/in/vinicius-gajo/).
