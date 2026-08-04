---
title: "OAuth 2.0 fundamentals"
date: "2026-02-22"
show: true
tags: ["software", "engineering", "identity"]
---

## Changelog

- 2026-02-22: First version released.
- 2026-07-30: Clean text.
- 2026-08-03: Add Grant Types, "On The Wire" walkthrough, and Common Pitfalls sections; expand OAuth 2.1 motivations.

## Introduction

**OAuth 2.0** is one of the most popular authorization frameworks used in practice, being adopted by both small startups and big enterprise companies. However, it is still a black box for multiple developers, which is understandable given the current implementation landscape, vide [[5]](#references) [^1].

With this in mind, I decided to write this article to present the framework fundamentals in a clear and concise way. Notice that I'll focus on the high level concepts, leveraging the contents of the official specification [[1]](#references).

## Glossary

- **Authentication:** Authentication is the process of proving that you are who you say you are. This is achieved by verification of the identity of a person or device. It's sometimes shortened to *AuthN*. The Microsoft identity platform uses the *OpenID Connect* protocol for handling authentication [[8]](#references).
- **Authorization:** Authorization is the act of granting an authenticated party permission to do something. It specifies what data you're allowed to access and what you can do with that data. Authorization is sometimes shortened to *AuthZ*. The Microsoft identity platform provides resource owners the ability to use the *OAuth 2.0* protocol for handling authorization, but the Microsoft cloud also has other authorization systems such as Microsoft Entra built-in roles, Azure RBAC, and Exchange RBAC [[8]](#references).
- **Resource owner:** An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an *end-user* [[1]](#references).
- **Resource server:** The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens [[1]](#references).
- **Client:** An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices) [[1]](#references).
- **Authorization server:** The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization [[1]](#references).
- **Scope:** The authorization and token endpoints allow the client to specify the scope of the access request using the "scope" request parameter. In turn, the authorization server uses the "scope" response parameter to inform the client of the scope of the access token issued [[1]](#references).
- **Authorization grant:** An authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token. This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials -- as well as an extensibility mechanism for defining additional types [[1]](#references).
- **Access token:** A string denoting a specific scope, lifetime, and other access attributes. Access tokens are issued to third-party clients by an authorization server with the approval of the resource owner.  The client uses the access token to access the protected resources hosted by the resource server [[1]](#references). Other access attributes typically includes:
  - Token type - e.g. *Bearer* (bearer tokens can be used by anyone who has them) vs. sender-constrained types like *DPop* or *mTLS*-bound tokens (which tie the token to a specific client key/cert, mitigating theft) [[7]](#references).
  - Audience (*aud*) - which resource server(s) the token is valid for. Important for preventing a token issued for API A from being replayed against API B [[7]](#references).
  - Issuer (*iss*) - which authorization server issued the token, so the resource server knows whom to trust/verify against [[7]](#references).
  - Subject (*sub*) - the resource owner's identifier the token was granted on behalf of [[7]](#references).
  - Not-before (*nbf*) / issued-at (*iat*) - timestamps constraining when the token becomes valid, used alongside expiry (*exp*) for lifetime [[7]](#references).
  - Token identifier (*jti*) - a unique ID, useful for revocation lists or replay detection [[7]](#references).

## Fundamentals

According to [[4]](#references), OAuth, the acronym, stands for "open authorization" and it's an **open standard for access delegation focused on authorization** (*AuthZ*). It introduces an authorization layer and separates the role of the *client* from that of the *resource owner* [[1]](#references).

This framework was created to help manage the authorization challenges faced by big organizations dealing with multiple digital products developed by different companies. In this scenario, it would be very complex, laborious and error prone to use independent and different accounts for each service, therefore, having a single source of truth for authentication and authorization is a huge win.

With this in mind, the OAuth 2.0 authorization framework was created.

In essence, instead of each digital product managing their own authentication and authorization flows and data, we can use an "Authorization server", as a centralized layer for granting those features.

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
> For example, an end-user (resource owner) can grant a printing
> service (client) access to her protected photos stored at a photo-
> sharing service (resource server), without sharing her username and
> password with the printing service.  Instead, she authenticates
> directly with a server trusted by the photo-sharing service
> (authorization server), which issues the printing service delegation-
> specific credentials (access token).
>
> --- [[1]](#references), 1. Introduction section.

To make this example more concrete, consider this similar scenario where a photo-printing app wants to access your Google Photos. In this case, you are the **resource owner** (the *end-user* who owns the photos and can grant or deny access to them), Google Photos' API is the **resource server** (the server that actually hosts the protected resource - your photos - and serves them when presented with a valid access token) the photo-printing app is the **client** (the third-party application requesting access to your photos on your behalf) and Google's OAuth server is the **authorization server** (the component that authenticates you, shows the consent screen - "PrintApp wants to view your Google Photos" - and issues the access token to the client).

### The Protocol Flow

To better understand the protocol flow, we can use this figure from the RFC document itself:

>
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
> The preferred method for the client to obtain an authorization grant
> from the resource owner (depicted in steps (A) and (B)) is to use the
> authorization server as an intermediary, which is illustrated in
> Figure 3 in Section 4.1.
>
> --- [[1]](#references), 1.2. Protocol Flow section.

### Grant Types

RFC 6749 defines four grant types, each targeting a different combination of client trust and use case [[1]](#references).

#### Authorization Code

The general-purpose grant for anything with a redirect-capable user-agent: web apps, mobile apps, SPAs. It's the only original grant type that cleanly supports refresh tokens, since the access token is fetched via a direct back-channel request rather than through the browser.

> 4.1. Authorization Code Grant
>
> The authorization code grant type is used to obtain both access
> tokens and refresh tokens and is optimized for confidential clients.
> Since this is a redirection-based flow, the client must be capable of
> interacting with the resource owner's user-agent (typically a web
> browser) and capable of receiving incoming requests (via redirection)
> from the authorization server.
>
>```bash
> +----------+
> | Resource |
> |   Owner  |
> |          |
> +----------+
>      ^
>      |
>     (B)
> +----|-----+          Client Identifier      +---------------+
> |         -+----(A)-- & Redirection URI ---->|               |
> |  User-   |                                 | Authorization |
> |  Agent  -+----(B)-- User authenticates --->|     Server    |
> |          |                                 |               |
> |         -+----(C)-- Authorization Code ---<|               |
> +-|----|---+                                 +---------------+
>   |    |                                         ^      v
>  (A)  (C)                                        |      |
>   |    |                                         |      |
>   ^    v                                         |      |
> +---------+                                      |      |
> |         |>---(D)-- Authorization Code ---------'      |
> |  Client |          & Redirection URI                  |
> |         |                                             |
> |         |<---(E)----- Access Token -------------------'
> +---------+       (w/ Optional Refresh Token)
>```
>
> Note: The lines illustrating steps (A), (B), and (C) are broken into
> two parts as they pass through the user-agent.
>
> Figure 3: Authorization Code Flow
>
> The flow illustrated in Figure 3 includes the following steps:
>
> (A)  The client initiates the flow by directing the resource owner's
> user-agent to the authorization endpoint. The client includes
> its client identifier, requested scope, local state, and a
> redirection URI to which the authorization server will send the
> user-agent back once access is granted (or denied).
>
> (B)  The authorization server authenticates the resource owner (via
> the user-agent) and establishes whether the resource owner
> grants or denies the client's access request.
>
> (C)  Assuming the resource owner grants access, the authorization
> server redirects the user-agent back to the client using the
> redirection URI provided earlier (in the request or during
> client registration). The redirection URI includes an
> authorization code and any local state provided by the client
> earlier.
>
> (D)  The client requests an access token from the authorization
> server's token endpoint by including the authorization code
> received in the previous step. When making the request, the
> client authenticates with the authorization server. The client
> includes the redirection URI used to obtain the authorization
> code for verification.
>
> (E)  The authorization server authenticates the client, validates the
> authorization code, and ensures that the redirection URI
> received matches the URI used to redirect the client in
> step (C). If valid, the authorization server responds back with
> an access token and, optionally, a refresh token.
>
> --- [[1]](#references), 4.1. Authorization Code Grant.

#### Client Credentials

There is no resource owner in this flow, it's for machine-to-machine calls, e.g. one backend service calling another under its own identity.

> The client can request an access token using only its client
> credentials (or other supported means of authentication) when the
> client is requesting access to the protected resources under its
> control, or those of another resource owner that have been previously
> arranged with the authorization server (the method of which is beyond
> the scope of this specification).
>
> The client credentials grant type MUST only be used by confidential
> clients.
>
> ```bash
> +---------+                                  +---------------+
> |         |                                  |               |
> |         |>--(A)- Client Authentication --->| Authorization |
> | Client  |                                  |     Server    |
> |         |<--(B)---- Access Token ---------<|               |
> |         |                                  |               |
> +---------+                                  +---------------+
> ```
>
> Figure 6: Client Credentials Flow
>
> The flow illustrated in Figure 6 includes the following steps:
>
> (A)  The client authenticates with the authorization server and
> requests an access token from the token endpoint.
>
> (B)  The authorization server authenticates the client, and if valid,
> issues an access token.
>
> --- [[1]](#references), 4.4. Client Credentials Grant.

#### Implicit (deprecated)

The access token was returned directly in the redirect URI fragment, skipping the code-exchange step, so a public client (e.g. a pure JavaScript SPA) didn't need to authenticate to a token endpoint. No refresh tokens, no client authentication.

#### Resource Owner Password Credentials / ROPC (deprecated)

The client collects the resource owner's username and password directly and exchanges them for a token. Intended only for highly trusted first-party clients, and even then it's now discouraged, see [Common Pitfalls](#common-pitfalls) below.

### Authorization Code vs. Client Credentials vs. (deprecated) Implicit/ROPC

| Grant type | Resource owner involved? | Client type | Refresh tokens | Status |
| --- | --- | --- | --- | --- |
| Authorization Code (+ PKCE) | Yes | Confidential or public | Yes | Recommended default |
| Client Credentials | No | Confidential | No (not needed) | Recommended for M2M |
| Implicit | Yes | Public | No | Deprecated (RFC 9700 §2.1.2) |
| ROPC | Yes | Confidential or public | Yes | Deprecated (RFC 9700 §2.4) |

The distinction between *confidential* and *public* clients drives most of this table:

> Confidential clients are typically able to maintain the
> confidentiality of their client credentials [...]. Public clients
> are unable to maintain the confidentiality of their client
> credentials [...], and unable to maintain the confidentiality of
> client authentication [...].
>
> --- [[1]](#references), 2.1. Client Types.

A confidential client (a server-side app that can hold a secret) can safely use Client Credentials for its own machine identity, or Authorization Code for delegated user access. A public client (an SPA or mobile app, which ships its code to the end-user's device and therefore can't hide a secret) has no safe way to authenticate itself — which is exactly the gap Implicit and ROPC tried to paper over, and exactly why PKCE now exists to secure the Authorization Code grant for public clients instead. More on that in [OAuth 2.1](#oauth-21-whats-changing) below.

## On The Wire: A Concrete Walkthrough

The abstract flow diagrams above map onto actual HTTP requests. Here's the Authorization Code grant with PKCE [[10]](#references), end to end, using the photo-printing example from earlier.

First, the client generates a PKCE verifier/challenge pair (RFC 7636 §4.1–4.2 [[10]](#references)):

```bash
CODE_VERIFIER=$(openssl rand -base64 32 | tr -d '=+/' | cut -c1-43)
CODE_CHALLENGE=$(printf '%s' "$CODE_VERIFIER" | openssl dgst -binary -sha256 | openssl base64 | tr -d '=' | tr '+/' '-_')
```

The client redirects the user's browser to the authorization endpoint (step A in Figure 3):

```http
GET https://auth.example.com/authorize
  ?response_type=code
  &client_id=abc123
  &redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback
  &scope=photos.read
  &state=9f61e8
  &code_challenge=$CODE_CHALLENGE
  &code_challenge_method=S256
```

After the resource owner authenticates and consents (step B), the authorization server redirects back with a code (step C):

```text
https://app.example.com/callback?code=SplxlOBeZQQYbYS6WxSbIA&state=9f61e8
```

The client's backend exchanges the code for a token (steps D/E), proving it holds the original verifier:

```bash
curl -s -X POST https://auth.example.com/token \
  -d grant_type=authorization_code \
  -d code=SplxlOBeZQQYbYS6WxSbIA \
  -d redirect_uri=https://app.example.com/callback \
  -d client_id=abc123 \
  -d code_verifier="$CODE_VERIFIER"
```

Which returns something shaped like [[1]](#references), §5.1:

```json
{
  "access_token": "2YotnFZFEjr1zCsicMWpAA",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA"
}
```

To replicate this against a real server without registering an app with a provider, point a debugger like [oauthdebugger.com](https://oauthdebugger.com) [[11]](#references) at a test authorization server, or run a disposable one locally with [`mock-oauth2-server`](https://github.com/navikt/mock-oauth2-server) [[12]](#references).

## Common Pitfalls

Most real-world OAuth incidents trace back to a handful of well-documented mistakes — this is also why the framework has a reputation for being "hard" in practice [[5]](#references). RFC 9700 (*OAuth 2.0 Security Best Current Practice*) [[9]](#references) codifies the fixes; the highlights:

- **Redirect URI validation must be exact-string match** ([[9]](#references), §4.1.3). Prefix or substring matching lets an attacker register a lookalike redirect endpoint and intercept authorization codes.
- **The `state` parameter is required for CSRF protection** ([[1]](#references), §10.12). The client must generate an unguessable value, bind it to the user's session, and verify it on the callback — otherwise an attacker can trick a victim into completing an OAuth flow that binds the attacker's account to the victim's session.
- **PKCE is mandatory for public clients** ([[10]](#references); [[9]](#references), §2.1.1). Without it, a malicious app on the same mobile device can intercept the authorization code from the redirect and exchange it for a token itself.
- **Never put bearer tokens in a query string** ([[9]](#references), §4.3.2). Query strings end up in server access logs, browser history, and the `Referer` header sent to third-party sites. Always send the token via the `Authorization` header.
- **Treat tokens like credentials in storage**: avoid `localStorage` for browser-based clients, since anything readable by JavaScript is readable by an XSS payload; prefer `httpOnly` cookies or in-memory storage scoped to the session.
- **Implicit was dropped because the token itself was exposed** ([[9]](#references), §2.1.2): returning it in a URL fragment leaks it to browser history and any script on the page, with no client authentication step to compensate.
- **ROPC was dropped because it defeats the point of delegation** ([[9]](#references), §2.4): the client sees the resource owner's actual password, which also rules out MFA and federated login at the identity provider.

## Is OAuth The Same As SSO?

The short answer is **no**.

SSO stands for "Single Sign-On", and it is an authentication process that allows a user to access multiple applications with a single username and password [[6]](#references):

> Let's take an example to understand SSO better. Consider Google's implementation of SSO.
> When you log in to your Gmail account, you are implicitly logged in to YouTube, Google Drive,
> and other Google services as well. This is because Google uses SSO to authenticate its users
> across its many services. Thus, with a single set of credentials (your Google username and
> password), you can access multiple Google services. This not only simplifies the user
> experience by reducing the need to remember numerous passwords, but also improves security
> by minimizing the risk of password misuse.
>
> --- [[6]](#references).

## OAuth 2.1: What's Changing

So, what's next?

Well, there's already work going on for the **OAuth 2.1** specification, and you can find its draft in [[2]](#references).

OAuth 2.1 isn't a new protocol — it's a consolidation of OAuth 2.0 plus roughly a decade of security lessons, most of which are already codified in RFC 9700 [[9]](#references) and covered in [Common Pitfalls](#common-pitfalls) above. Concretely, it folds the recommended extensions and deprecations into the base spec so implementers no longer have to go hunting through a dozen separate RFCs to build a secure client.

The differences from **OAuth 2.0** can be found in the *chapter 10* of the document (*version 14*):

> A non-normative list of changes from OAuth 2.0 is listed below:
>
> - The authorization code grant is extended with the functionality from PKCE [RFC7636] such that the default method of using the authorization code grant according to this specification requires the addition of the PKCE parameters
>
> - Redirect URIs must be compared using exact string matching as per Section 4.1.3 of [RFC9700]
>
> - The Implicit grant (response_type=token) is omitted from this specification as per Section 2.1.2 of [RFC9700]
>
> - The Resource Owner Password Credentials grant is omitted from this specification as per Section 2.4 of [RFC9700]
>
> - Bearer token usage omits the use of bearer tokens in the query string of URIs as per Section 4.3.2 of [RFC9700]
>
> - Refresh tokens for public clients must either be sender-constrained or one-time use as per Section 4.14.2 of [RFC9700]
>
> - The token endpoint request containing an authorization code no longer contains the redirect_uri parameter
>
> - Authorization servers must support client credentials in the request body
>
> --- [[2]](#references)

The first six items map directly onto the pitfalls above — PKCE-by-default, exact redirect matching, dropping Implicit/ROPC, no bearer tokens in URLs, and sender-constrained refresh tokens are all the same fixes, just promoted from "best practice" to "required by spec." The last two are smaller ergonomic cleanups: since the redirect URI is already validated during the authorization request, re-validating it at the token endpoint is redundant once PKCE is mandatory; and standardizing where client credentials go in the token request removes a source of implementation drift that [[5]](#references) points to as a recurring integration headache.

## Related articles

If you liked this post, perhaps you'll be interested in:

- [DNS server in F#](https://gaio.dev/posts/2026-02-20-dns-server).
- SAML Fundamentals -> TODO.
- SSO Fundamentals -> TODO.
- OIDC Fundamentals -> TODO.
- JWT Fundamentals -> TODO.

## References

- [1] The OAuth 2.0 Authorization Framework. [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749). Accessed February 22, 2026.
- [2] The OAuth 2.1 Authorization Framework. [Draft RFC](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1). Accessed February 22, 2026.
- [3] What is OAuth? [Leaflet link](https://leaflet.pub/p/did:plc:3vdrgzr2zybocs45yfhcr6ur/3mfd2oxx5v22b). Accessed March 3, 2026.
- [4] Wikipedia contributors. OAuth. Wikipedia, The Free Encyclopedia. February 14, 2026, 14:50 UTC. Available at: <https://en.wikipedia.org/w/index.php?title=OAuth&oldid=1338330955>. Accessed March 6, 2026.
- [5] Why is OAuth still hard in 2026? Nango [blog link](https://nango.dev/blog/why-is-oauth-still-hard). Accessed March 6, 2026.
- [6] SSO vs OAuth. System Design School [article link](https://systemdesignschool.io/blog/sso-vs-oauth). Accessed March 6, 2026.
- [7] JSON Web Token (JWT). [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519). Accessed August 2, 2026.
- [8] Authentication vs. authorization. Microsoft identity platform [article link](https://learn.microsoft.com/en-us/entra/identity-platform/authentication-vs-authorization). Accessed August 2, 2026.
- [9] OAuth 2.0 Security Best Current Practice. [RFC 9700](https://datatracker.ietf.org/doc/html/rfc9700). Accessed August 3, 2026.
- [10] Proof Key for Code Exchange by OAuth Public Clients (PKCE). [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636). Accessed August 3, 2026.
- [11] OAuth 2.0 Debugger. [oauthdebugger.com](https://oauthdebugger.com). Accessed August 3, 2026.
- [12] mock-oauth2-server. [GitHub repository](https://github.com/navikt/mock-oauth2-server). Accessed August 3, 2026.

<!--
Footnotes

Here is a simple footnote[^1]. With some additional text after it.

[^1]: My reference.
-->

[^1]: OAuth 2.0 itself treats access tokens as opaque strings - the RFC deliberately doesn't mandate a format. Some popular claims come from JWT (RFC 7519).
