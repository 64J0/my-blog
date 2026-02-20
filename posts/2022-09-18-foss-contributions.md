---
title: "FOSS Contributions"
date: "2022-09-18"
show: true
tags: ["foss", "open-source", "github"]
---

Changelog:

- **2022-09-18:** First version published.
- **2025-01-10:** Major rewrite with text enhancements.
- **2025-04-02:** Add reference to "The pragmatic open source contributor".
- **2025-09-08:** Add more examples.
- **2025-10-14:** Ibid.

## Introduction

There are multiple reasons to start contributing to FOSS projects, for example:

1. Open-source contributions are great for visibility and proficiency
   demonstration;
2. Submitting your patches and getting feedback on how to improve it from
   specialists is great for your technical evolution;
3. It shows that you can collaborate with other developers;
4. By improving some project you're actually creating a better world (it's not
   this straightforward but let's not dig into it for now).

And the list goes on&#x2026; Unfortunately, it could be daunting to get started, even
more when you're just starting your software developer career.

With this in mind, I decided to write this article, presenting a framework that
can be used to help you get started and thrive at this world of open-source
contributions.

## The framework

If you want to get started with less friction, check the following steps in
sequence:

1. Read the **documentation** and improve it. If there's a discussion platform
   linked to the project, check it too. After reading the documentation you may
   be able to start answering community questions, or may get ideas on how to
   improve the text.
2. Add/improve/fix **automated tests**, so you get a better understanding of how
   the code is really supposed to work.
3. Work on **bug fixes**, which will probably be more detailed and are easier to
   validate. Other than bug fixes, from my experience I noticed that lots of
   projects does not care that much for **CI**, so pay attention to potential
   improvements there too.
4. Focus on adding **new features**. If you are the person proposing this new
   feature, I suggest to first talk to the maintainers to confirm that they
   think it makes sense to add this new feature. Note that sometimes this was
   already discussed, but they did not have the time to implement, so you can
   take this responsibility.

Now, let's take a better look at the proposed steps.

## 1. Documentation

Why should you start with documentation PRs?

Because at the beginning we don't have that deep knowledge of all the features
and internal mechanisms of the project, since it is not necessary while just
using most tools.

So read the documentation and check the discussion platform if it exists. You
may spot lots of improvement points, fix some errors, and get ideas on
additional pages that could be added.

For example, here is a non-exhaustive list of problems that could pop-up:

- Typos,
- Docs lacking updates,
- Enhancement opportunities explanations.

The first error kind is the most simple to fix. Just send a PR to solve the
typos and we're already improving the project.

- Example: [fslaborg.github.io#40 - Fix typos tutorial 001](https://github.com/fslaborg/fslaborg.github.io/pull/40)
- Example: [azure-docs#84922 - Update tutorial-django-aks-database.md](https://github.com/MicrosoftDocs/azure-docs/pull/84922)
- Example: [terraform-provider-azuread#827 - Update group.md](https://github.com/hashicorp/terraform-provider-azuread/pull/827)
- Example: [dotnet-docs#34503 - Fix F# snippet indentation](https://github.com/dotnet/docs/pull/34503)
- Example: [dotnet-docs#47613 - [F#] Update properties.md](https://github.com/dotnet/docs/pull/47613)
- Example: [dotnet-docs#47616 - [F#] Update methods.md](https://github.com/dotnet/docs/pull/47616)
- Example: [dotnet-docs#47633 - [F#] Update operator-overloading.md](https://github.com/dotnet/docs/pull/47633)
- Example: [dotnet-docs#49100 - [F#] Add FS0410 compiler message](https://github.com/dotnet/docs/pull/49100)

The second error kind is way more complex to solve. Usually you can simply
create an issue to document this piece of documentation with incorrect
instructions and let the project maintaners to take care of it.

- Example: [Saturn#349 - How To Start a Saturn Project](https://github.com/SaturnFramework/Saturn/issues/349)
- Example: [Saturn#354 - Enhance the "Explanation" section of the documentation](https://github.com/SaturnFramework/Saturn/pull/354)

Finally, the third idea is when you decide to contribute for the project adding
more information when you noticed the lack of it.

- Example: [Saturn#315 - Add test instructions to the README.md and fix the test instructions in the CONTRIBUTING.md](https://github.com/SaturnFramework/Saturn/pull/315)
- Example: [ionide.github.io#27 - Add debug instructions for VS Code Ionide extension](https://github.com/ionide/ionide.github.io/pull/27)

Still in this section, another thing that you can do to contribute on open
source projects is to give ideas for new features.

- Example: [Trivy#47625 - Enhance the HTML report table](https://github.com/aquasecurity/trivy/issues/2298)

Or raise the attention to problems.

- Example: [dotnet-docs#2298 - Why isn't F# listed at the "Development languages"?](https://github.com/dotnet/docs/issues/47625)

Finally, other ideas related to this first step are:

- You can write articles about the project you're using;
- You can create sample projects to help other people get onboarded on using the
  project;
- Do both described before.

## 2. Automated tests

The next step, after reading and improving the documentation, is to start
digging the project code. In order to do this, I like to start checking the
automated tests part.

Why? Because it's more simple to read, and it's great for quick feedback so you
can validate your understandings.

- Example: [Saturn#355 - Add more test scenarios for the router feature](https://github.com/SaturnFramework/Saturn/pull/355)

## 3. Bug fixes

At this step you may have a better understanding of the code, so you may decide
that it's time to start working on bug fixes. Great decision! For projects
hosted on GitHub you will find those at the issues page.

Then, after fixing this bug, don't forget to add a new automated test to verify
that it will keep working later.

- Example: [Giraffe#594 - Fix EndpointRouting Guid regex + tests](https://github.com/giraffe-fsharp/Giraffe/pull/594)

## 4. New features

Finally, now that you have read the documentation and improved it, studied the
automated tests and is confident about knowing the code behavior, the next step
is to finally add new features.

Notice that those are, in most time, the PRs that take longer to get merged,
because it depends on the understanding of the maintainers about this new
feature that you're proposing.

- Example: [node-gitlab-2-github#149 - Dockerize this application](https://github.com/piceaTech/node-gitlab-2-github/pull/149)
- Example: [p88#1 - Enhance Dockerfile security and README readability](https://github.com/rafaelbmateus/p88/pull/1)
- Example: [Saturn.CLI#39 - Fix the code generation feature due to .NET 6](https://github.com/SaturnFramework/Saturn.Cli/pull/39)
- Example: [SqlHydra#120 - Add Postgres' network address types and CI configuration to run the automated tests](https://github.com/JordanMarr/SqlHydra/pull/120)

You can also help by updating an old project:

- Example: [SIMDArray#34 - Update project to supported .NET versions and more](https://github.com/fsprojects/SIMDArray/pull/34)

## Conclusion

And this is the framework. I hope you find it useful and help you get started
with your contributions.

But keep in mind that as you get more experienced, it's normal to stop following
those steps sequentially. Sometimes we just know enough about the project and
the code, and we just want to fix a bug directly, so it's fine to start from the
final steps for example.

Also, we can send PRs dealing with more than a single step, and it's fine, just
send your contribution.

That's it. Let me know if you have any question, or would like to talk about
this framework.

- Reach me on [LinkedIn](https://www.linkedin.com/in/vinicius-gajo/) or [GitHub](https://github.com/64J0).

If you'd like to get a different although complementary view on this topic, check
[The Pragmatic Open Source Contributor](https://diurnal.st/2025/03/02/the-pragmatic-open-source-contributor.html)
article. Note that it deals with more bureaucracy parts than I covered here, so
it could be more aligned to some specific scenarios, especially in very
regulated industries.
