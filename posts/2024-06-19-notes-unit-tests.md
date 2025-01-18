---
title: "Notes on unit tests"
date: "2024-06-19"
show: true
tags: ["automated tests"]
---

Changelog:

- 2024-07-15: Add mutation testing section.

Here, I'm dumping my annotations from the the book "Unit Testing: Principles, Practices and Patterns" ([link](https://a.co/d/05D7uKaK)).

# Introduction

What is the goal of unit testing?

"The goal is to enable sustainable growth of the software project." By using these tests you have guarantee that the project is still working along the time, and when not, you have a fast way to check the updates before submitting to the production environment.

It could be helpful when planning a big refactor too, since you'll have a fast feedback to guarantee that the system is still working properly at unit level. Check this article from Dropbox.Tech for a real life example: [link](https://dropbox.tech/infrastructure/-testing-our-new-sync-engine) (thx for sharing Cecília).

## About metrics

Metrics like [code coverage](https://en.wikipedia.org/wiki/Code_coverage) and branch coverage aren't good indicators for test quality, since they can be misleading. In fact, unit tests really shine when we use it to test the business logic - the domain model.

The rationale is that the business logic will not change very often (in theory), and when it changes, it's critical to guarantee that the system is working correctly. So, testing business logic gives you the best return on your time investment.

With this in mind, let's define what unit tests are not targeted:

-   Infrastructure code (if your project is not related to this domain);
-   External services and dependencies, such as database and third-party systems;
-   Code that glues everything together.

> **TIP** Tests shouldn't verify units of code. Rather, they should verify units of behavior: something that is meaningful for the problem domain and, ideally, something that a business person can recognize as useful. The number of classes it takes to implement such a unit of behavior is irrelevant. The unit could span across multiple classes or only one class, or even take up just a tiny method.
>
> &#x2014; Unit Testing: PPP


# Four pillars of a good unit test

"A good unit test has the following four attributes:"

-   Protection against regressions;
-   Resistance to refactoring;
-   Maintainability (easy to evolve and adapt);
-   Fast and correct feedback.

"These four attributes are foundational. You can use them to analyze any automated test, be it unit, integration, or end-to-end."

# The value of unit tests

"Units tests are less useful in a setting without algorithmic or business complexity - they quickly descend into trivial tests." And this type of test could easily become brittle along the time.

"At the same time, integration tests retain their value - it's still important to verify how code, however simple it is, works in integration with other subsystems, such as the database. As a result, you may end up with fewer unit tests and more integration tests. In the most trivial examples, the number of integration tests may even be greater than the number of unit tests."

# More content

If you're interested in more contents, I have an old article (2020), where I talk about "Tests, TDD and Jest", you can find it here: [link](./2020-08-30-testes-tdd-jest). Notice that it was written in Portuguese.

Also, check the main reference book for a more rich discussion and details of the ideas presented here.

## Mutation testing

While studying some chaos tests references I found this [mutation testing](https://stryker-mutator.io/docs/) concept, which looks like a good complement for the unit tests idea (thx for sharing Carvalho). It is useful to know how good your unit tests are.

> Mutation testing introduces changes to your code, then runs your unit tests against the changed code. It is expected that your unit tests will now fail. If they don't fail, it might indicate your tests do not sufficiently cover the code.
>
> Bugs, or mutants, are automatically inserted into your production code. Your tests are run for each mutant. If your tests fail then the mutant is *killed*. If your tests passed, the mutant *survived*. The higher the percentage of mutants killed, the more effective your tests are.
>
> &#x2014; [link](https://stryker-mutator.io/docs/)
