---
title: "On absolute truth"
date: "2026-03-14"
show: false
tags: ["philosophy", "logic"]
---

### Changelog

- <span class="timestamp-wrapper"><span class="timestamp">[2026-03-14]</span></span> First version released
- <span class="timestamp-wrapper"><span class="timestamp">[2026-05-23]</span></span> Revised version released

## Introduction

In this article, I'm going to present a formalization using the first-order logic (predicate logic) for the argument in favor of the absolute truth. Notice that the process sketched here demonstrates a performative contradiction (the act of asserting the statements presupposed its falsity), or a self-refuting proposition.

But first, let's define what is an absolute truth:

> Absolute truth is a statement that is true at all times and in all places. It is something that is always true no matter what the circumstances. It is a fact that cannot be changed. For example, there are no round squares. There are also no square circles. The angles of a triangle add up to 180 degrees. These are all true by definition. Very similar are the propositions of Euclid, because they are proved once the axioms are accepted. One way or another, these are all truths because they are logically true.
>
> [...] Aristotle states that, “The high-minded man must care more for the truth than for what people think.” According to him, if we consider ourselves to be wise individuals, our concern should be to find the truth not to submit to opinions.
>
> --- [2]

For this formalization, I'm using the reference [1].

## Formalization

Let the domain $$ \Gamma $$ be the set of all propositions, we can first consider:

- Proposition **x** expresses an absolute truth.

  $$ \text{A} x $$

- There's no proposition **x** that expresses an absolute truth.

  $$ \neg \exists x \text{A} x $$

<!-- Note that this proposition autoreferences itself, which makes it more difficulty to analyze. -->

Considering this proposition regarding its material logic, we find that there's an implicit, or hidden, proposition that isn't stated directly, but that is necessary for it to make some sense. The complete proposition can be phrased as:

- There is only one proposition that states an absolute truth, and this proposition is "there's no proposition **x** that expresses an absolute truth".

  Which can be formalized as:

  $$ \text{A} p \wedge \neg \exists x \text{A} x $$

Similar to what happens with the transformation from an enthymeme into a syllogism, this is not the only possible implicit proposition that can be added to the argument. However, it's the most commonly considered according to my experience.

## Conclusion

A contradiction, an absurdity.

Therefore, to have a consistent system the only option is to accept that there are absolute truths. And a consequence of this conclusion is that we have access to some of those absolute truths.

![Ludwig Deutsch - The Scholars, 1901.](/post-images/on-absolute-truth/Ludwig_Deutsch_-_The_Scholars,_1901.jpg "Ludwig Deutsch, Public domain, via Wikimedia Commons.")

## References

- [1] - Mortari, A. C. Introdução à lógica. 2nd ed., Editora Unesp, 2017. Amazon [link](https://a.co/d/063DhGgc).
- [2] - Absolute truth. (2026, February 3). Wikipedia. Retrieved May 23, 2026, from [link](https://simple.wikipedia.org/w/index.php?title=Absolute_truth&oldid=10737604).
