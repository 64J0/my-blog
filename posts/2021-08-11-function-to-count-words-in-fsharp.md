---
title: "Create a function to count words in F# docs using F#"
date: "2021-08-11"
show: true
tags: ["fsharp", ".net"]
---

> Disclaimer: This post was originally posted in Medium. [Link](https://medium.com/datarisk-io/create-a-function-to-count-words-in-f-docs-using-f-dfecf19e3c38).

Hello folks, hope you’re good. In this post I’ll be sharing a program I wrote with F# to count how many words are in the F# docs in the Microsoft platform.

> F# is an open-source, cross-platform programming language that makes it easy to write succinct, performant, robust, and practical code. — Microsoft docs.

My motivation to write this post is to share some things I’m learning about the F# language and also to confirm some information regarding my understanding of the algorithm implemented.

Alright, before getting into the code I want to say thanks to my friend [JZ](https://medium.com/@juarez.asf) who inspired me to write this function. Also, I have used an algorithm that he wrote in C# to do this same task as a guide, so thanks in double.

## Requirements

To reproduce this code you should have those tools installed:

* **.NET Core SDK version 5**
* **An IDE with support to F# syntax** (for now I’m using VS Code with Ionide extension, but in the future, I’ll probably move to Emacs)

Disclaimer: *During my explanation, I won’t focus on all introductory aspects of the F# language, like, I’m supposing that the reader already knows how to create a function and things like this. If you want a more detailed explanation please comment on this post*.

## Starting the project

Alright, after installing the SDK and the IDE, just open a terminal and write the following code:

*For instance, I’m using Ubuntu 20.04 to develop*.

```bash
# start the project with a boilerplate project
dotnet new console -o WordsCounter -lang "F#"
```

After this command execution, you’ll notice that a new folder has been created with the name `WordCounter`. Entering this folder you'll see two files and another folder, like in the following image.

![Photo by me.](/post-images/function-to-count-words-in-fsharp/terminal-1.png "My terminal")

Here, at this tutorial, we will be concerned only with the `Program.fs` file, since all the logic of the program will be written in this file.

Let’s continue, at this point you should open this file in your favorite IDE just to check the code.

## The code

When you open the file in your IDE it should display those lines of code:

```fsharp
// Learn more about F# at http://docs.microsoft.com/dotnet/fsharp

open System

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // return an integer exit code
```

This is the template of a console application written with F# code. If you want to run this project, simply type in the terminal:

```bash
dotnet run
```

With this command, the project will be compiled and a string should be displayed in the terminal, like the following image:

![Photo by me.](/post-images/function-to-count-words-in-fsharp/terminal-2.png "My terminal 2")

With this approach, you can say that the project has been compiled and if you check the WordCounter/ folder again you’ll notice that there is a new folder called `bin/`.

This is the folder where the compiled project lives. Also, some files can be used to debug the application but let’s keep it simple for now.

For the sake of simplicity, I’ll use the interactive way of running an F# program, because this is the way I run most of my introductory programs.

With this approach, you can test your code faster and learn fast too. At this point, I’m using this tool a lot to write my codes, so I think that you should consider using it too.

To create an F# script that runs on the interactive mode you only need to change the extension of the file. So, just change the file from `Program.fs` to `Program.fsx`, and that's it for now.

For some reason that I don’t know at this moment, running this code this way (with the interactive tool) will not print the result on the terminal. But ok, our code will work later.

Alright, the actual code we will use is in fact the following:

```fsharp
#if INTERACTIVE
#r "nuget: HtmlAgilityPack"
#endif

open System
open System.Net
open HtmlAgilityPack

let fetchHtmlContent (uri: Uri) =
    let httpClient = new Http.HttpClient()
    httpClient.GetStringAsync(uri)

let htmlNodeIsLeaf (node: HtmlNode) =
    (not node.HasChildNodes)
    && not (String.IsNullOrWhiteSpace(node.InnerHtml))

let countWords (textNodes: seq<HtmlNode>) =
    Seq.fold
        (fun (acc) (node: HtmlNode) ->
            acc + node.InnerText.Split(" ").Length)
        0 // acc initial value
        textNodes

let printResults url quantityOfWords =
    printfn "\nUrl: %s \nQuantity of words: %i" url quantityOfWords

let program (url: string) =
    async {
        let uri = Uri(url)
        let! rawHtml = fetchHtmlContent(uri) |> Async.AwaitTask
        let html = HtmlDocument()
        html.LoadHtml(rawHtml)

        let documentNode = html.DocumentNode

        // xpath -> select html components
        let xpath = @"//*[@id=""main-column""]"
        let singleNode =
            documentNode.SelectSingleNode(xpath)

        let descendants = singleNode.Descendants()
        let textNodes = descendants |> Seq.where htmlNodeIsLeaf

        let quantityOfWords = countWords textNodes

        printResults url quantityOfWords
    }


let listOfTargetSites =
    [ "https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/literals" (* 576 *)
      "https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/sequences" (* 4675 *) ]

listOfTargetSites
|> List.map program
|> Async.Parallel
|> Async.RunSynchronously
|> ignore
```

You may be thinking that this is complex but calm down, I’ll explain what is happening in the code here, in the next block of text…

## Explanation

In the first line, we’re importing an external library called `HtmlAgilityPack` using **nuget** which is the default package manager for .NET applications.

```fsharp
#if INTERACTIVE
#r "nuget: HtmlAgilityPack"
#endif
```

This package is useful because it presents some built-in functions to perform operations in HTML files as the name suggests. If you want to check the docs just [access this link](https://html-agility-pack.net/).

*You’ll notice that the examples are written with the C# syntax, but that’s ok. Using F# we need to get comfortable with this situation.*

With the surrounding syntax, we manage to only use this command when running the code with the interactive tool. This is a really nice feature since we can use the same code without changes in the build process.

If you want to know more about this interactive syntax please check this link from the [official docs](https://docs.microsoft.com/en-us/dotnet/fsharp/tools/fsharp-interactive/#interactive-and-compiled-preprocessor-directives).

Let’s continue, the next lines are used to open the packages we need to write the algorithm:

```fsharp
open System
open System.Net
open HtmlAgilityPack
```

Basically, we’re opening the `System` to use some built-in operations with Strings and get the special class `Uri()`, that is used later to grant that the function signature of `GetStringAsync()` is right.

The next package, `System.Net` as the name suggests, is used to handle network requests. And the last package, `HtmlAgilityPack`, is a special package used to perform operations in HTML files, like web scraping.

Ok, now let’s jump to the function called `program`. This is the main function that controls the flow of the algorithm, so let's check it deeply.

This function receives a URL, that is a string, then it requests this URL to fetch the content of the site. After this operation, the site content is parsed, getting the DocumentNodes.

In the next phase, we search in those DocumentNodes for the element with the id of **main-column**. The syntax used to define this element in the SelectSingleNode() function is called *XPath* and is beyond the scope of this post. If you are interested in this *XPath* syntax please check this [link with a cheatsheet](https://devhints.io/xpath).

We are searching for this element because all the relevant content is inside it like you can see in the next image.

![Photo by me 3.](/post-images/function-to-count-words-in-fsharp/browser-1.png "My browser")

Continuing, we dive into the leaves of the HTML structure (tree), which in this case are more probably to have the words we want to count.

* Assumption: *It’s more probable that we will find the text content in the last level of the tree, its leaves*.

Then, we perform a fold operation, that is very similar to the reduce, except for the fact that with this function we can specify the initial value of the accumulator.

Basically, with this operation, we iterate through all the nodes and add a specific value to the accumulator variable, in this case, we add the number of words in each phrase in each leaf.

In the end, we just print the result in the console for the user to see and store this information. In my case, I’m using it in a spreadsheet with the links I want to study just to get an estimated time based on my previous readings.

## Execution

For this example, I’ll be using only two links from the F# docs provided by Microsoft.

In the last two blocks of code, we’re defining a list with the URLs of the pages we want to count the number of words, and activating the algorithm.

```fsharp
let listOfTargetSites =
    [ "https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/literals" (* 576 *)
      "https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/sequences" (* 4675 *) ]

listOfTargetSites
|> List.map program
|> Async.Parallel
|> Async.RunSynchronously
|> ignore
```

Basically, in the last block of code, we’re running a map operation to apply that specific function (the program() itself) to each of the entries in the list.

After this, we’re saying to the .NET runtime to run the process in parallel, and that’s why sometimes we get strange results in the console.

That’s because the IO operations take some time to be concluded and we are not waiting for this operation to be concluded in any part of the code, we’re just waiting for the requests to be fulfilled.

Look at this example, at the first two operations everything went ok but in the last one the string with the number of words were merged in a buggy way:

![Photo by me 4.](/post-images/function-to-count-words-in-fsharp/terminal-3.png "My terminal 3")

Finally, to test the code we wrote, just type this command in the terminal:

```bash
dotnet fsi Program.fsx
```

The result should be:

![Photo by me 5.](/post-images/function-to-count-words-in-fsharp/terminal-4.png "My terminal 4")

## Conclusion

That’s it guys, with this program we get a good estimate of how many words we have on each page of the F# docs provided by Microsoft. Please, don’t consider this result as a flawless estimate since there are lots of things we didn’t consider when writing the code, just to make it simple and easy to understand.

Also, if you pretend to use this code on a different site just remember to change the XPath according to your context.

If you want to talk to me please write a comment in this post or contact me on [LinkedIn](https://www.linkedin.com/in/vinicius-gajo/).

I’ve been studying F# for 3 weeks now and I’m really liking it, please consider giving it a try. See you later with more posts.

*Originally, this post was written in the [dev.to site](https://dev.to/64j0/create-a-function-to-count-words-in-f-docs-using-f-1bp9)*.
