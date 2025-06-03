---
title: "F# - Exposing Giraffe API metrics to Prometheus"
date: "2025-06-03"
show: true
tags: ["fsharp", "prometheus", ".net", "api", "metrics", "backend", "giraffe", "monitoring"]
---

## Introduction

Recently, I invested some time into the development of a new open-source project: [64J0/fsharp-monitoring](https://github.com/64J0/fsharp-monitoring). The goal of this project was to:

1.  Create a simple F# API using Giraffe and [prometheus-net](https://github.com/prometheus-net/prometheus-net);
2.  Expose the necessary metrics from this API to Prometheus in order to monitor the "four golden signals" as defined by Google's SRE book: [link](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals);
3.  Present the metrics collected using a Grafana dashboard.

With time, I decided to add other features on top of those, but for now, with this post, I'm going to focus on the Giraffe middlewares and their interaction with prometheus-net's custom metrics.

So, with no further ado, let's start.

## Custom metrics

To accomplish my goals, I found out that it would be required to add some custom metrics on top of what we have by default when using prometheus-net. So, I added this module to my API project:

```fsharp
module API.MonitoringPrometheus

open System.Collections
open Prometheus

/// This function is used to create a counter so we can keep track of how many
/// times some operation is done.
let createCounter (name: string) (description: string) (labels: string array) =
    Metrics.CreateCounter(name, description, labels)

/// This function is used to create a new gauge metric.
let createGauge (name: string) (description: string) =
    Metrics.CreateGauge(name, description, GaugeConfiguration())

/// Create a summary metric with a fixed configuration.
/// https://github.com/prometheus-net/prometheus-net#summary
/// Summaries track the trends in events over time (10 minutes by default).
let createSummary (name: string) (description: string) =
    let objectives =
        seq {
            new QuantileEpsilonPair(0.5, 0.05)
            new QuantileEpsilonPair(0.9, 0.05)
            new QuantileEpsilonPair(0.95, 0.01)
            new QuantileEpsilonPair(0.99, 0.005)
        }
        |> Immutable.ImmutableList.ToImmutableList

    Metrics.CreateSummary(name, description, new SummaryConfiguration(Objectives = objectives))

/// Create a histogram metric with a fixed configuration
/// https://github.com/prometheus-net/prometheus-net#histogram
/// Histograms track the size and number of events in buckets. This allows for
/// aggregatable calculation of quantiles.
let createHistogram (name: string) (description: string) (labels: string array) =
    Metrics.CreateHistogram(name, description, labels)

/// Track the time consumed in a specific computation based on the histogram
/// metric.
/// https://github.com/prometheus-net/prometheus-net#measuring-operation-duration
let trackComputationHistogram (histogram: Histogram) (computation: float -> float) (data: float) =
    using (histogram.NewTimer()) (fun _ -> computation data)
```

Notice that this module provides a bunch of helper functions which are useful to create our custom metrics, whether it's a counter, a gauge, a summary or a histogram (for more information about those, read the Prometheus official documentation and the prometheus-net's repository README).

## Giraffe middlewares

Now, using those helper functions to create the Prometheus custom metrics, I started working on the custom middlewares:

-   **requestCounter:** As the name suggests, it counts how many requests reached the server. And to make this metric a bit more useful, we're tracking, using its labels, the response status code too.

    Note that for this to work correctly, this middleware needs to wait the request to reach its end, and then collect this information from the response object. This is why, in the code presented below, I'm using this block of code to wait the request to finish: **let! \_ = next ctx**.

-   **requestDuration:** As the name suggests, this middleware handles the request duration metric, presenting the result as a histogram in different buckets.

```fsharp
module API.PrometheusMiddleware

open Microsoft.AspNetCore.Http

open Giraffe
open Prometheus

open API.MonitoringPrometheus

let requestCounter: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let counterName = "api_request_count_total"
            let counterDescription = "API generic request counter."
            let counterLabelNames = [| "endpoint"; "method"; "status_code" |]

            let requestCounter =
                createCounter (counterName) (counterDescription) (counterLabelNames)

            let! _ = next ctx

            let endpoint = ctx.Request.Path.Value
            let method = ctx.Request.Method
            let statusCode = ctx.Response.StatusCode |> string

            requestCounter.WithLabels(endpoint, method, statusCode).Inc()

            // Check this discussion for why we can't use return None:
            // - https://github.com/giraffe-fsharp/Giraffe/discussions/659
            return Some ctx
        }

let requestDuration: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let histogramName = "api_request_duration_seconds"
            let histogramDescription = "API generic request duration in seconds."
            let histogramLabelNames = [| "endpoint"; "method" |]

            let histogramRequestDuration =
                createHistogram (histogramName) (histogramDescription) (histogramLabelNames)

            let endpoint = ctx.Request.Path.Value
            let method = ctx.Request.Method

            let histogram = histogramRequestDuration.WithLabels(endpoint, method)

            return! using (histogram.NewTimer()) (fun _ -> task { return! next ctx })
        }

```

## Giraffe router

Now it's just a matter of composing the middlewares and the final handlers:

```fsharp
module API.Router

open System.Net

open Giraffe
open Giraffe.EndpointRouting

open API.Controller
open API.PrometheusMiddleware

let appRouter: Endpoint list =
    [ GET
          [ route "/health" (requestCounter >=> requestDuration >=> Health.index ())
            routef "/ping/%s" (fun name ->
                requestCounter
                >=> requestDuration
                >=> (int HttpStatusCode.OK |> setStatusCode)
                >=> json {| Message = $"Pong from {name}!" |}) ]
      POST [ route "/api/prediction" (requestCounter >=> requestDuration >=> Prediction.createController ()) ] ]
```

## API server

Finally, the server configuration with the necessary changes to expose the Prometheus metrics on a different port from the main API is:

```fsharp
open System.Net
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging

open Giraffe
open Giraffe.EndpointRouting
open Prometheus

open API.PrometheusMiddleware
open API.Router

let PROMETHEUS_PORT: uint16 = 9085us

let notFoundHandler =
    requestCounter
    >=> requestDuration
    >=> (int HttpStatusCode.NotFound |> setStatusCode)
    >=> json {| Message = "Route not Found" |}

let private configureLogging (loggingBuilder: ILoggingBuilder) =
    // https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging#logging-providers
    match Env.MIN_LOG_LEVEL with
    | "DEBUG" -> LogLevel.Debug
    | _ -> LogLevel.Information
    |> loggingBuilder.ClearProviders().AddConsole().SetMinimumLevel
    |> ignore

let private configureServices (services: IServiceCollection) =
    services
        .AddMetricServer(fun (options: KestrelMetricServerOptions) -> options.Port <- PROMETHEUS_PORT)
        .AddRouting()
        .AddGiraffe()
    |> ignore

let private configureApp (appBuilder: IApplicationBuilder) =
    appBuilder.UseRouting().UseEndpoints(_.MapGiraffeEndpoints(appRouter)).UseGiraffe(notFoundHandler)

[<EntryPoint>]
let main (args: string[]) =
    let builder = WebApplication.CreateBuilder(args)
    configureLogging builder.Logging
    configureServices builder.Services

    let app = builder.Build()

    // https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/webapplication#working-with-ports
    app.Urls.Add($"{Env.HOST}:{Env.PORT}")

    configureApp app
    app.Run()

    0
```

And that's it. If something is not clear, please reach me through the public repository: [64J0/fsharp-monitoring](https://github.com/64J0/fsharp-monitoring).
