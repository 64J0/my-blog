---
title: "Transient vs permanent error handling"
date: "2026-02-15"
show: true
tags: ["software", "engineering"]
---

When considering different software error types we can make a distinction between **permanent** and **transient** errors, and this is crucial to decide how those errors are going to be handled.

For a transient error, we can simply ask the client to repeat the process, considering that the error can fix itself automatically, but, for a permanent error - say, if there's a configuration error that violates your application's business rule - you shouldn't do that. Instead, a better approach is to alert your client about the error, and provide useful context and actionable instructions on how to proceed to fix it.

For example, going back to this configuration error mentioned before, you can explain to your client that there's some internal problem happening (depending on your specific scenario, decide whether it's relevant or wise to expose more information), and ask them to call the support team, providing a specific tracking number, so both support and development teams can diagnose the error properly, effectively helping to debug.

![Polyhymnia, Muse of Eloquence (1800). Charles Meynier. Image from: https://randomdailyart.com/art/2026-02-07/.](/post-images/transient-vs-permanent-error-handling/Charles-Meynier-Polyhymnia-Muse-of-Eloquence-highres.jpg "Polyhymnia, Muse of Eloquence (1800). Charles Meynier. Image from: https://randomdailyart.com/art/2026-02-07/.")
