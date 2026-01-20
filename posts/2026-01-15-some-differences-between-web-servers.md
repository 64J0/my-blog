---
title: "Some differences between web servers"
date: "2026-01-15"
show: true
tags: ["software", "engineering", "web", "server"]
---

### Changelog

- <span class="timestamp-wrapper"><span class="timestamp">[2026-01-15 Thu]</span></span> First draft created
- <span class="timestamp-wrapper"><span class="timestamp">[2026-01-19 Mon]</span></span> First version released

## The Crux

What should a WEB server do if a request matches the path but doesn't match the HTTP verb (i. e., request method)?

There are multiple answers to this question, and in this article I'm going to present some examples.

- You can find the code used in this GitHub repository: [64J0/simple-servers](https://github.com/64J0/simple-servers).

### Giraffe

Let's start considering the [Giraffe router](https://github.com/giraffe-fsharp/Giraffe/blob/master/DOCUMENTATION.md#routing).

```fsharp
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Giraffe

let notFoundHandler = "Not Found" |> text |> RequestErrors.notFound

let endpoints =
    choose
        [ GET >=> route "/hello" >=> text "Hello from Giraffe with Endpoint Routing!"
          notFoundHandler ]

let configureApp (appBuilder: IApplicationBuilder) = appBuilder.UseGiraffe(endpoints)

let configureServices (services: IServiceCollection) = services.AddGiraffe() |> ignore

[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)
    configureServices builder.Services

    let app = builder.Build()

    if app.Environment.IsDevelopment() then
        app.UseDeveloperExceptionPage() |> ignore

    configureApp app
    app.Run()

    0

```

This is what you get after making different requests:

#### GET /hello

```bash
curl -s -S -v -X GET http://localhost:5000/hello
# ...
< HTTP/1.1 200 OK
< Content-Length: 19
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:27:47 GMT
< Server: Kestrel
<
* Connection #0 to host localhost left intact
Hello from Giraffe!
```

#### GET /notfound

```bash
curl -s -S -v -X GET http://localhost:5000/notfound
# ...
< HTTP/1.1 404 Not Found
< Content-Length: 9
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:27:48 GMT
< Server: Kestrel
<
* Connection #0 to host localhost left intact
Not Found
```

#### POST /hello

```bash
curl -s -S -v -X POST http://localhost:5000/hello
# ...
< HTTP/1.1 404 Not Found
< Content-Length: 9
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:27:48 GMT
< Server: Kestrel
<
* Connection #0 to host localhost left intact
Not Found
```

### Giraffe With EndpointRouting and ASP.NET Core

Now, let's check what happens if we use the [Giraffe EndpointRouting](https://github.com/giraffe-fsharp/Giraffe/blob/master/DOCUMENTATION.md#endpoint-routing):

```fsharp
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Giraffe
open Giraffe.EndpointRouting

let endpoints =
    [ GET [ route "/hello" (text "Hello from Giraffe with Endpoint Routing!") ] ]

let notFoundHandler = "Not Found" |> text |> RequestErrors.notFound

let configureApp (appBuilder: IApplicationBuilder) =
    appBuilder.UseRouting().UseGiraffe(endpoints).UseGiraffe(notFoundHandler)

let configureServices (services: IServiceCollection) =
    services.AddRouting().AddGiraffe() |> ignore

[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)
    configureServices builder.Services

    let app = builder.Build()

    if app.Environment.IsDevelopment() then
        app.UseDeveloperExceptionPage() |> ignore

    configureApp app
    app.Run()

    0
```

And this is what we get after making the same requests using `curl`:

#### GET /hello

```bash
curl -s -S -v -X GET http://localhost:5000/hello
# ...
< HTTP/1.1 200 OK
< Content-Length: 41
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:28:03 GMT
< Server: Kestrel
<
* Connection #0 to host localhost left intact
Hello from Giraffe with Endpoint Routing!
```

#### GET /notfound

```bash
curl -s -S -v -X GET http://localhost:5000/notfound
# ...
< HTTP/1.1 404 Not Found
< Content-Length: 9
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:28:04 GMT
< Server: Kestrel
<
* Connection #0 to host localhost left intact
Not Found
```

#### POST /hello

```bash
curl -s -S -v -X POST http://localhost:5000/hello
# ...
< HTTP/1.1 405 Method Not Allowed
< Content-Length: 0
< Date: Tue, 20 Jan 2026 01:28:04 GMT
< Server: Kestrel
< Allow: GET
<
* Connection #0 to host localhost left intact
```

Oops... There's a difference.

Using *Giraffe EndpointRouting*, if our request matches the path, but doesn't match the HTTP verb, our server returns a **405 Method Not Allowed** status code, and a new header is added to instruct the client which HTTP methods are available **Allow: GET**.

Note that this is consistent with the text in the [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#autoid-83) that defines the *Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content*:

> **6.5.5.  405 Method Not Allowed**
>
> The 405 (Method Not Allowed) status code indicates that the method
> received in the request-line is known by the origin server but not
> supported by the target resource.  The origin server MUST generate an
> Allow header field in a 405 response containing a list of the target
> resource's currently supported methods.
>
> A 405 response is cacheable by default; i.e., unless otherwise
> indicated by the method definition or explicit cache controls [...].

In fact, this behavior is inherited from the [ASP.NET Core](https://github.com/dotnet/aspnetcore) router, which is actually used under the hood for the *Giraffe EndpointRouting*.

You can also try with a simple minimal API:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello from ASP.NET Core Minimal API!");

app.Run();
```

Where we get a similar response from the server.

### Express.js

Now, instead of .NET, let's consider the [Express.js](https://expressjs.com/en/starter/hello-world.html), which is another WEB server technology I have experience.

This is the code I'm going to use:

```javascript
const express = require('express')
const app = express()
const port = 5000

app.get('/hello', (_req, res) => {
  res.send('Hello from Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

And these are the responses I get:

#### GET /hello

```bash
curl -s -S -v -X GET http://localhost:5000/hello
# ...
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-tsbq4e7agwVV6r9iE+Lb/lLwlzw"
< Date: Tue, 20 Jan 2026 01:27:31 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
Hello from Express!
```

#### GET /notfound

```bash
curl -s -S -v -X GET http://localhost:5000/notfound
# ...
< HTTP/1.1 404 Not Found
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
< Content-Type: text/html; charset=utf-8
< Content-Length: 147
< Date: Tue, 20 Jan 2026 01:27:32 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /notfound</pre>
</body>
</html>
```

#### POST /hello

```bash
curl -s -S -v -X POST http://localhost:5000/hello
# ...
< HTTP/1.1 404 Not Found
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
< Content-Type: text/html; charset=utf-8
< Content-Length: 145
< Date: Tue, 20 Jan 2026 01:27:32 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot POST /hello</pre>
</body>
</html>
```

Notice that the headers are different, and Express returns an HTML page by default for the not found error.

#### More differences

Something else to note is that *Express.js* can't handle HTTP verbs if they're not all uppercase.

For example, check this request:

```bash
curl -s -S -v -X get http://localhost:5000/hello
# ...
>
< HTTP/1.1 400 Bad Request
< Connection: close
<
* Closing connection
```

This doesn't happen for ASP.NET and Giraffe, for example, they work with those variations: *GET*, *Get* and *get*.

### Gin

Finally, I decided to check what happens in a Web API built using a popular Go lang library named [Gin](https://gin-gonic.com/en/docs/). The code used was:

```go
package main

// go run main.go

import (
 "github.com/gin-gonic/gin"
)

func main() {
 // 1. Create a default Gin router with logging and recovery middleware
 r := gin.Default()

 // 2. Define the GET /hello endpoint
 r.GET("/hello", func(c *gin.Context) {
  // Returns a plain string with a 200 OK status
  c.String(200, "Hello from Gin (Go lang)!")
 })

 // 3. Run the server (default is port 5000)
 r.Run(":5000")
}
```

And these are the responses:

#### GET /hello

```bash
curl -s -S -v -X GET http://localhost:5000/hello
# ...
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=utf-8
< Date: Tue, 20 Jan 2026 01:28:22 GMT
< Content-Length: 25
<
* Connection #0 to host localhost left intact
Hello from Gin (Go lang)!
```

#### GET /notfound

```bash
curl -s -S -v -X GET http://localhost:5000/notfound
# ...
< HTTP/1.1 404 Not Found
< Content-Type: text/plain
< Date: Tue, 20 Jan 2026 01:28:23 GMT
< Content-Length: 18
<
* Connection #0 to host localhost left intact
404 page not found
```

#### POST /hello

```bash
curl -s -S -v -X POST http://localhost:5000/hello
# ...
< HTTP/1.1 404 Not Found
< Content-Type: text/plain
< Date: Tue, 20 Jan 2026 01:28:23 GMT
< Content-Length: 18
<
* Connection #0 to host localhost left intact
404 page not found
```

#### More differences

Again, when using *Gin*, the server can't handle HTTP verbs if they're not all uppercase, as is the case with *Express.js*.

## Conclusion

There's no consensus for this implementation, therefore you need to check what is the behavior of the tool you're using.
