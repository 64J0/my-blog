---
title: "OAuth 2.0 fundamentals"
date: "2026-02-22"
show: true
tags: ["software", "engineering", "identity"]
---

## Introduction

To have a good understanding of the OAuth 2.0 authorization framework, perhaps the best resource is the RFC 6749 [1] that specifies it. Although the text could be not that user-friendly at first, with time, and some reflection, you eventually understand it.

This small article is intended to present the framework fundamentals, providing a high level explanation although not diving into implementation details.

## Fundamentals

Before explaining why the OAuth 2.0 authorization framework was created, we need to get definitions for the four roles involved in its operation. They are:

- **Resource owner:** An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user. [1]
- **Resource server:** The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens. [1]
- **Client:** An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices). [1]
- **Authorization server:** The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization. [1]

Now, going back to explaining why this framework was created, imagine that you work in a big organization that uses multiple digital products developed by different companies.

In this scenario, it would be very complex, laborious and error prone to use independent and different accounts for each service, therefore, having a single source of truth for authentication and authorization would be a huge win.

With this in mind, the OAuth 2.0 authorization framework was created.

In essence, instead of each digital product managing their own authentication and authorization flows and data, we can use this "Authorization server", as a centralized layer for granting those features.

> [...] In OAuth, the client requests access to resources controlled
> by the resource owner and hosted by the resource server, and is
> issued a different set of credentials than those of the resource
> owner.
>
> Instead of using the resource owner's credentials to access protected
> resources, the client obtains an access token -- a string denoting a
> specific scope, lifetime, and other access attributes. Access tokens
> are issued to third-party clients by an authorization server with the
> approval of the resource owner. The client uses the access token to
> access the protected resources hosted by the resource server.
>
> --- [1], 1. Introduction section.

### The Protocol Flow

To better understand the protocol flow, we can use this figure from the RFC document itself:

> ```bash
> +--------+                               +---------------+
> |        |--(A)- Authorization Request ->|   Resource    |
> |        |                               |     Owner     |
> |        |<-(B)-- Authorization Grant ---|               |
> |        |                               +---------------+
> |        |
> |        |                               +---------------+
> |        |--(C)-- Authorization Grant -->| Authorization |
> | Client |                               |     Server    |
> |        |<-(D)----- Access Token -------|               |
> |        |                               +---------------+
> |        |
> |        |                               +---------------+
> |        |--(E)----- Access Token ------>|    Resource   |
> |        |                               |     Server    |
> |        |<-(F)--- Protected Resource ---|               |
> +--------+                               +---------------+
> ```
>
> Figure 1: Abstract Protocol Flow
>
> The abstract OAuth 2.0 flow illustrated in Figure 1 describes the
> interaction between the four roles and includes the following steps:
>
> (A)  The client requests authorization from the resource owner.  The
> authorization request can be made directly to the resource owner
> (as shown), or preferably indirectly via the authorization
> server as an intermediary.
>
> (B)  The client receives an authorization grant, which is a
> credential representing the resource owner's authorization,
> expressed using one of four grant types defined in this
> specification or using an extension grant type.  The
> authorization grant type depends on the method used by the
> client to request authorization and the types supported by the
> authorization server.
>
> (C)  The client requests an access token by authenticating with the
> authorization server and presenting the authorization grant.
>
> (D)  The authorization server authenticates the client and validates
> the authorization grant, and if valid, issues an access token.
>
> (E)  The client requests the protected resource from the resource
> server and authenticates by presenting the access token.
>
> (F)  The resource server validates the access token, and if valid,
> serves the request.
>
> --- [1], 1.2. Protocol Flow section.

Where the authorization grant mentioned in the text is explained right after:

> An authorization grant is a credential representing the resource
> owner's authorization (to access its protected resources) used by the
> client to obtain an access token.  This specification defines four
> grant types -- authorization code, implicit, resource owner password
> credentials, and client credentials -- as well as an extensibility
> mechanism for defining additional types.
>
> --- [1], 1.3. Authorization Grant section.

As you might expect, there's more regarding this RFC. But I think this is enough to begin with.

## The Future

So, what's next?

Well, there's already work going on for the OAuth 2.1 specification, and you can find its draft in [2].

The differences from OAuth 2.0 can be found in the chapter 10 of this document (version 14), so you can open its link and check it there, assuming that it will be most up to date there.

## References

- [1] The OAuth 2.0 Authorization Framework. [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749).
- [2] The OAuth 2.1 Authorization Framework. [Draft RFC](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1). Also, there's some information on [OAuth 2.1 website](https://oauth.net/2.1/).

## Related articles

If you liked this post, perhaps you'll be interested in:

- [DNS server in F#](https://gaio.dev/posts/2026-02-20-dns-server)
