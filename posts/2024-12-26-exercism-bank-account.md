---
title: "Exercism's bank account problem and race conditions"
date: "2024-12-26"
show: true
---

This post is a bit different since most of the comments and explanations are baked into the code. I think this will make it easier to read and understand.

So let's start with my provided solution:

``` fsharp
// In order to solve the problem, this custom type was defined as a record to
// store the account's balance and whether it's open or not.
//
// Note that the fields defined for it are mutable because for each sequential
// function call we are going to operate at the same object (memory location),
// so we must not create new objects.
//
// This StackOverflow answer was useful to learn this:
// https://stackoverflow.com/q/3779098.
type Account =
    { mutable Balance: decimal; mutable IsOpen: bool }

// This function simply creates the initial state of the account object. Notice
// that we start the account as closed, and someone needs to call the
// openAccount function in order to change this.
let mkBankAccount() =
    { Balance = 0.0m
      IsOpen = false }

// This function changes the record field `IsOpen` to true and returns the
// object itself.
let openAccount account =
    account.IsOpen <- true
    account

// This function changes the record field `IsOpen` to false and returns the
// object itself.
let closeAccount account =
    account.IsOpen <- false
    account

let getBalance account : Option<decimal> =
    match account.IsOpen with
    | true -> Some account.Balance
    | false -> None

// To cope with race conditions
// (https://en.wikipedia.org/wiki/Race_condition#In_software) when account's
// balance is updated a lock is used:
// https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-operators.html#lock
//
// From the official documentation we find that this function performs a
// mutually exclusive operation, and from Wikipedia: Mutually exclusive
// operations are those that cannot be interrupted while accessing some resource
// such as a memory location.
//
// If this lock was not used, the execution of this code using multiple threads
// would result in a non-deterministic output. Why? Check this example from
// Wikipedia:
//
// | Thread 1 | Thread 2 | | Integer value |
// |----------|----------|-|---------------|
// |          |          | | 0             |
// | read val |          |←| 0             |
// |          | read val |←| 0             |
// | increase |          | | 0             |
// |          | increase | | 0             |
// | write val|          |→| 1             |
// |          | write val|→| 1             |
//
// And with mutual exclusion:
//
// | Thread 1 | Thread 2 | | Integer value |
// |----------|----------|-|---------------|
// |          |          | | 0             |
// | read val |          |←| 0             |
// | increase |          | | 1             |
// | write val|          |→| 1             |
// |          | read val |←| 1             |
// |          | increase | | 2             |
// |          | write val|→| 2             |
//
let updateBalance (change: decimal) account =
    match account.IsOpen with
    | true ->
        lock account (fun () -> account.Balance <- account.Balance + change)
        account
    | false -> failwith "Account is not open"
```

As I mentioned before, the explanation is provided as code comments, so I'll not replicate it here.

And for the most interesting parts of the automated tests, we have (provided by the Exercism platform itself):

``` fsharp
[<Fact>]
let ``Balance can increment or decrement`` () =
    let account = mkBankAccount() |> openAccount
    let openingBalance = account |> getBalance
    let addedBalance =
        account
        |> updateBalance 10.0m
        |> getBalance
    let subtractedBalance =
        account
        |> updateBalance -15.0m
        |> getBalance
    openingBalance |> should equal (Some 0.0m)
    addedBalance |> should equal (Some 10.0m)
    subtractedBalance |> should equal (Some -5.0m)

[<Fact>]
let ``Account can be updated from multiple threads`` () =
    let account =
        mkBankAccount()
        |> openAccount
    let updateAccountAsync =
        async {
            account
            |> updateBalance 1.0m
            |> ignore
        }
    updateAccountAsync
    |> List.replicate 1000
    |> Async.Parallel
    |> Async.RunSynchronously
    |> ignore
    getBalance account |> should equal (Some 1000.0m)
```

And to mention other interesting solutions:

- luboasdev's solution using a MailboxProcessor: [link](https://exercism.org/tracks/fsharp/exercises/bank-account/solutions/luboasdev). Interesting articles about the MailboxProcessor [link](https://thesharperdev.com/fsharps-mailboxprocessor/) and [link](https://en.wikibooks.org/wiki/F_Sharp_Programming/MailboxProcessor).
- kensuke's solution using a synchronized ArrayList: [link](https://exercism.org/tracks/fsharp/exercises/bank-account/solutions/kensuke).
- la122's solution using a Dictionary: [link](https://exercism.org/tracks/fsharp/exercises/bank-account/solutions/la122). An improvement idea, maybe it's worth using a [thread-safe](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-9.0#thread-safety) option like ConcurrentDictionary.
