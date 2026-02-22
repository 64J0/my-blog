---
title: "OAuth 2.0 fundamentals"
date: "2026-02-22"
show: true
tags: ["software", "engineering", "identity"]
---

## Introduction

To have a good understanding of the OAuth 2.0 authorization framework, perhaps the best resource is the RFC 6749 [1] that specifies it. Although the text could be not that user-friendly at first, with time it gets easier.

This article is intended to present the framework fundamentals, providing a high level explanation.

## Fundamentals

Before explaining why the OAuth 2.0 authorization framework was created, we need to get definitions for the four roles involved in its operation:

- Resource owner: An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user. [1]
- Resource server: The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens. [1]
- Client: An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices). [1]
- Authorization server: The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization. [1]

Now, going back to explaining why this framework was created, imagine that you work in a big organization that uses multiple digital products developed by different companies. In this scenario, we can agree that it would be very complex, laborious and error prone to use independent and different accounts for each service, therefore, having a single source of truth for authentication and authorization would be a huge win.

With this in mind, the OAuth 2.0 authorization framework was born.

Instead of each digital product managing their own authentication and authorization, we can use this "Authorization server", as a centralized layer for granting those features.

TODO: Protocol Flow
TODO: Refresh Token Flow

## The future

TODO: What are the problems being addressed by OAuth 2.1?

## References

- [1] The OAuth 2.0 Authorization Framework. RFC 6749 [link](https://datatracker.ietf.org/doc/html/rfc6749).
- [2] The OAuth 2.1 Authorization Framework. Draft RFC [link](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1). Also, there's some information on [OAuth 2.1 website](https://oauth.net/2.1/).

## Related articles

If you liked this post, perhaps you'll be interested in:

- [DNS server in F#](https://gaio.dev/posts/2026-02-20-dns-server)
