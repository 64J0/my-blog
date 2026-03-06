---
title: "OAuth 2.0 fundamentals"
date: "2026-02-22"
show: true
tags: ["software", "engineering", "identity"]
---

## Introduction

OAuth 2.0 is one of the most popular authorization frameworks used in practice, being adopted by both small startups and big enterprise companies. However, it is still a black box for multiple developers (understandably to some extent, given the current implementation landscape, vide [5]).

With this in mind, I decided to write this article to present the framework fundamentals in a clear and concise way, focusing on the high level concepts leveraging the contents of the official specification, the RFC 6749 [1].

## Fundamentals

According to [4], OAuth, the acronym, stands for "open authorization" and it's an open standard for access delegation focused on authorization (authz). *Notice that this acronym definition is not present in the official specification, so take it with a grain of salt.*

But, why was the OAuth 2.0 authorization framework created? Before answering this question, we need to first define the four roles involved in its operations, as they are going to be used in future explanations:

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

## Is OAuth The Same As SSO?

The short answer is no. SSO stands for "Single Sign-On", and it is an authentication process that allows a user to access multiple applications with a single username and password [6].

Check this example from the same reference to futher understand SSO:

> Let's take an example to understand SSO better. Consider Google's implementation of SSO.
> When you log in to your Gmail account, you are implicitly logged in to YouTube, Google Drive,
> and other Google services as well. This is because Google uses SSO to authenticate its users
> across its many services. Thus, with a single set of credentials (your Google username and
> password), you can access multiple Google services. This not only simplifies the user
> experience by reducing the need to remember numerous passwords, but also improves security
> by minimizing the risk of password misuse.
>
> --- [6]

## The Future

So, what's next?

Well, there's already work going on for the OAuth 2.1 specification, and you can find its draft in [2].

The differences from OAuth 2.0 can be found in the chapter 10 of this document (version 14), so you can open its link and check it there, assuming that it will be most up to date there.

## References

- [1] The OAuth 2.0 Authorization Framework. [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749). Accessed February 22, 2026.
- [2] The OAuth 2.1 Authorization Framework. [Draft RFC](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1). Accessed February 22, 2026. Also, there's some information on [OAuth 2.1 website](https://oauth.net/2.1/). Accessed February 22, 2026.
- [3] What is OAuth? [Leaflet link](https://leaflet.pub/p/did:plc:3vdrgzr2zybocs45yfhcr6ur/3mfd2oxx5v22b). Accessed March 3, 2026.
- [4] Wikipedia contributors. OAuth. Wikipedia, The Free Encyclopedia. February 14, 2026, 14:50 UTC. Available at: <https://en.wikipedia.org/w/index.php?title=OAuth&oldid=1338330955>. Accessed March 6, 2026.
- [5] Why is OAuth still hard in 2026? Nango [blog link](https://nango.dev/blog/why-is-oauth-still-hard). Accessed March 6, 2026.
- [6] SSO vs OAuth. System Design School [article link](https://systemdesignschool.io/blog/sso-vs-oauth). Accessed March 6, 2026.

## Related articles

If you liked this post, perhaps you'll be interested in:

- [DNS server in F#](https://gaio.dev/posts/2026-02-20-dns-server).
