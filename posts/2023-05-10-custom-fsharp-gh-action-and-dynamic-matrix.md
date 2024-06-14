---
title: "Creating a custom GH Action using F# and dynamic matrix configuration"
date: "2023-05-10"
show: true
---

# Introduction

Suppose that you are the responsible for a central repository that takes care of several projects using infrastructure as code tools ([Terraform](https://developer.hashicorp.com/terraform/docs), for example), and that the you can't know for certain how this repository is going to evolve (especially related to the instances of this project that will be needed).

Maybe you're thinking, why you decided to centralize everything in this repository?

Well, good question. I'm going to present some reasons, in this illustrative scenario.

1.  The first piece of information I'd like to present is that all those projects share the same context. They are related to different instances of the same product with some particularities, but in the long run, you expect that they are going to develop in the same basis.
2.  The second piece of information is that your team is relatively small. So you want to optimize as much as possible. Since you're taking care of a single repository, you can share some of the updates through all the inner instances of the project, without the necessity to duplicate the code in other places. And this extends over the modularization of the IaC tool.
3.  Third, and my last argument, is that it's easier to understand the puzzle when you have all the pieces together. If those projects were splitted among several repositories, it would be harder to keep track of all the instances, and even explain to other stakeholders and members of the team the full landscape.

With this in mind, let's start disposing the next pieces of information.

Your repository is currently hosted in GitHub, so for the CI/CD you are encouraged to use [GitHub Actions](https://docs.github.com/en/actions).

The company you work on adopted the [F# language](https://learn.microsoft.com/en-us/dotnet/fsharp/what-is-fsharp) as the main language for the back-end development. Since a great portion of the team is familiarized with it, you think it's a good choice to adopt it for this task as well.

This way, you can show and even motivate other people to create their own custom GitHub Actions eventually.

With this context in mind, we can start exploring how one can solve this problem, by leveraging a custom F# GitHub Action that is later used to build a dynamic matrix workflow configuration that evolves automatically along with the Terraform instances added to the central repository.


# Development

Since I'm not intended to disclose any secret or critical information related to this project, I'm going to use a sample POC project with a very simple Terraform configuration. You can find it in this [repository link](https://github.com/64J0/custom-fsharp-gh-action-and-dynamic-matrix).

With no further ado, let's dive deep into the POC.


## IaC - Terraform

As mentioned before, my goal is to use a very simple Terraform configuration, that still let's me run the following commands:

```bash
# initializes a working directory containing Terraform configuration files
terraform init

# creates an execution plan, which lets you preview the changes that Terraform
# plans to make to your infrastructure
terraform plan

# executes the actions proposed in a Terraform plan
terraform apply

# is a convenient way to destroy all remote objects managed by a particular
# Terraform configuration
terraform destroy
```

After looking for very simple projects in the web, I eventually decided to use the [[1]​](#orgb1aeb3c) configuration. It is basically composed of an *output* block, along with a *terraform* block specifying the minimum Terraform version required to run the code:

```bash
# terraform/instance-1/network/main.tf
terraform {
  required_version = ">=1.3.6"
}

output "network" {
  value = "Network created"
}
```

I decided to add two sub-folders for each instance of the Terraform code, *network* and *virtual-machine*, so we can easily see the matrix configuration working.

The project structure for this part is:

```bash
terraform/
├── instance-1
│   ├── network
│   │   └── main.tf
│   └── virtual-machine
│       └── main.tf
└── instance-2
    ├── network
    │   └── main.tf
    └── virtual-machine
        └── main.tf
```

In the future, we can simply add a new instance (say *instance-3*), and start working straight.


## Custom GitHub Action with F#

Now that we talked about the Terraform configuration, we can start talking about the custom F# GitHub Action created.

First, let's present what is a GitHub Action.

> Actions are individual tasks that you can combine to create jobs and customize your workflow. You can create your own actions, or use and customize actions shared by the GitHub community. &#x2014; [[3]​](#orgb1aeb3c)

By the time I'm writing this article, the possible ways to create custom actions are using ([[3]​](#orgb1aeb3c)):

| Type              | Linux | macOS | Windows |
|----------------- |----- |----- |------- |
| Docker container  | x     |       |         |
| JavaScript        | x     | x     | x       |
| Composite Actions | x     | x     | x       |

Since my intention was to use F# to write the custom action, I decided to move on with the **Docker container** approach. This way, I have a more consistent and reliable action, since all the necessary environment tools to run it can be packaged in the container itself.

But notice that it's the most restrictive option, since, for now, they can only be executed on runners with a Linux operating system.

All the custom actions types have their trade-offs. If you're interested to dive deeper, you can consult the reference [[3]​](#orgb1aeb3c).


### Creating the Docker Container Action

In order to learn how to create the Docker container action, I consulted the reference [[4]​](#orgb1aeb3c).

One can find it in the path *.github/fsharp-custom-action/*.

The structure of the custom action is described as follow:

```bash
.github/fsharp-custom-action/
├── action.yml
├── Dockerfile
├── README.org
├── src
│   ├── main.fsproj
│   └── Program.fs
└── tests
    ├── Program.fs
    └── tests.fsproj
```

Each component is going to be presented in the following sections.

1.  action.yml

    Let's start from the configuration file of the custom action, named *action.yml*.

    The contents of this file are:

    ```yaml
    name: 'Fsharp Custom Action'
    description: 'Get the modified directories in a formatted style'
    inputs:
      directories: # id of input
        description: 'Modified directories without formatting'
        required: true
        default: '[]'
    outputs:
      formatted-directories: # id of output
        description: 'Modified directories formatted'
    runs:
      using: 'docker'
      image: 'Dockerfile'
      args:
        - ${{ inputs.directories }}
    ```

    Each metadata piece of this configuration is properly explained in reference [[5]​](#orgb1aeb3c), but let's give a quick overview here.

    The *name* and *description* are self evident, so I'm skipping it.

    The *inputs* are where we specify the data that the action expects during runtime. We can add a description to keep it documented, define if it is required or not and set a default value.

    From the documentation:

    > GitHub stores input parameters as environment variables. Input ids with uppercase letters are converted to lowercase during runtime. We recommend using lowercase input ids. &#x2014; [[5]​](#orgb1aeb3c)

    In this context, the action is expecting to received a stringified JSON array of paths, related to the modified directories in the open PR.

    Along with the *inputs*, we can also define the expected *outputs* of the action. This way, actions that run later in a workflow, can use the output data set in previously run actions.

    As we did for the *inputs*, you must keep this information in mind when declaring the *outputs*:

    > Outputs are Unicode strings, and can be a maximum of 1 MB. The total of all outputs in a workflow run can be a maximum of 50 MB. &#x2014; [[5]​](#orgb1aeb3c)

    For this action, the expected output is a strigified JSON array containing the formatted paths of the modified files. This information is later going to be used in the dynamic matrix configuration, to fine-tune the workflow execution.

    Finally, the last part of this action definition is describing the type of the action (Docker container), and how the action is executed, passing the argument defined in the *inputs*.

2.  Dockerfile

    Next, let's explore the multi-stage Dockerfile that is responsible for containerizing the application.

    The code used is:

    ```dockerfile
    # ========================================================
    # Build image
    FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

    # define the work directory for the container
    WORKDIR /proj

    # copy the contents of the src/ directory in the current file system to the
    # container file system, under ./, which stands for the /proj directory defined
    # in the workdir
    COPY src/ ./

    # restore + build + publish the project to the out/ directory
    RUN dotnet publish -c Release -o out

    # ========================================================
    # Runtime image
    FROM mcr.microsoft.com/dotnet/runtime:6.0

    # define the work directory for the container
    WORKDIR /proj

    # copy the compiled project from the 'build-env' stage, from the path /proj/out
    # to the /proj path in this new container stage
    COPY --from=build-env /proj/out .

    # define the container entrypoint to use the compiled code
    ENTRYPOINT ["/proj/main"]
    ```

    In order to explain the Dockerfile configuration, I decided to add comments in the code itself. If you want to learn more about the multi-stage Dockerfile approach, you can consult the reference [[6]​](#orgb1aeb3c).

    When launched in the GitHub Actions environment, this container will receive the input as argument. I have added some example commands that one can use to test it locally in the *.github/fsharp-custom-action/README.org* file.

3.  src/Program.fs

    Finally, this is the main part of the custom F# action, the F# code itself.

    This action is responsible for formatting a stringified JSON array representing paths (strings), in order to keep them in a way that we can later add to a GitHub CI matrix configuration.

    The code:

    ```fsharp
    module GitHubActionMain

    open System
    open System.IO
    open System.Text.RegularExpressions
    open Newtonsoft.Json

    let GITHUB_OUTPUT_FILE = "GITHUB_OUTPUT"

    let private removeSquareBrackets (s: string) : string = Regex.Replace(s, "\[|\]", "")

    let private removeDoubleQuotes (s: string) : string = s.Replace("\"", "")

    let private removeBackslash (s: string) : string = s.Replace("\\", "")

    let getDirectory (s: string) : string =
        let dirsNameArray = s.Split [| '/' |]

        match (dirsNameArray.Length > 3) with
        | true -> $"{dirsNameArray.[0]}/{dirsNameArray.[1]}/{dirsNameArray.[2]}"
        | false -> ""

    let getFormattedDirectories (args: string array) =
        (args.[0] |> removeSquareBrackets |> removeDoubleQuotes |> removeBackslash)
            .Split
            [| ',' |]
        |> Array.map getDirectory
        |> Array.distinct

    let getserializedResult (result: string array) : string = JsonConvert.SerializeObject result

    let private getGitHubOutputPath () : string =
        Environment.GetEnvironmentVariable(GITHUB_OUTPUT_FILE)

    // https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action#writing-the-action-code
    let private writeToGitHubOutput (serializedResult: string) : unit =
        let githubOutputPath = getGitHubOutputPath ()
        printfn "githubOutputPath: %s" githubOutputPath

        match (File.Exists githubOutputPath) with
        | false -> () // when running outside GitHub Actions environment
        | true -> File.AppendAllText(githubOutputPath, $"formatted-directories={serializedResult}")

    [<EntryPoint>]
    let main (args: string array) : int =
        let result = getFormattedDirectories args
        let serializedResult = getserializedResult result
        printfn "serializedResult: %s" serializedResult

        writeToGitHubOutput serializedResult

        0 // no error code
    ```

    Since it's not the intention of the article to dive deeper into the F# syntax and program, I'm not going to explore it here, just trust that it works.

    But let's focus on the GitHub Actions specific parts.

    The input in this case is retrieved from the arguments to the entrypoint main function, with this piece of code:

    ```fsharp
    args.[0]
    ```

    Later, this input is sanitized to use a string structure that fits better to F#. I decided to implement this part myself, since I was liking to program in this language, but I guess I could have used the Newtonsoft package ([[7]​](#orgb1aeb3c)), using the `JsonConvert.DeserializeObject<Type'>(input)` for more complex inputs.

    After running the program, we need to write the output to a file as explained by GitHub's documentation [[4]​](#orgb1aeb3c).

    The path of this file is available in the environment variable **GITHUB\_OUTPUT**, and we can simply append the output value there, like:

    ```bash
    # using bash example to make it more simple for non-F# programmers to
    # understand.
    # say that you specified that the output is named: formatted-directories
    echo "formatted-directories=value123" >> $GITHUB_OUTPUT
    ```

4.  tests/Program.fs

    In order to automatically assert that the previous code was generating the expected output, I added some simple unit tests to the project.

    The main test engine used was Expecto ([[8]​](#orgb1aeb3c)), since it's pretty simple to setup and start using.

    The code:

    ```fsharp
    module GitHubActionTests

    open Expecto
    open GitHubActionMain

    let zeroDirZeroSize = "[]"
    let oneDirOneSize = "[\"terraform/instance-1/network/main.tf\"]"

    let oneDirTwoSize =
        "[\"terraform/instance-1/network/main.tf\",\"terraform/instance-1/network/outputs.tf\"]"

    let twoDirThreeSizeArray =
        "[\"terraform/instance-1/network/main.tf\",\"terraform/instance-1/network/outputs.tf\",\"terraform/instance-2/virtual-machine/main.tf\"]"

    [<Tests>]
    let tests =
        testList
            "Different input scenarios"
            [ test "Empty array input" {
                  let result = getFormattedDirectories [| zeroDirZeroSize |]
                  Expect.equal result [| "" |] "The strings should equal"

                  let serializedResult = getserializedResult result
                  Expect.equal serializedResult "[\"\"]" "The strings should equal"
              }

              test "Single directory one-size array input" {
                  let result = getFormattedDirectories [| oneDirOneSize |]
                  Expect.equal result [| "terraform/instance-1/network" |] "The strings should equal"

                  let serializedResult = getserializedResult result
                  Expect.equal serializedResult "[\"terraform/instance-1/network\"]" "The strings should equal"
              }

              test "Single directory two-size array input" {
                  let result = getFormattedDirectories [| oneDirTwoSize |]
                  Expect.equal result [| "terraform/instance-1/network" |] "The strings should equal"

                  let serializedResult = getserializedResult result
                  Expect.equal serializedResult "[\"terraform/instance-1/network\"]" "The strings should equal"
              }

              test "Two directories three-size array input" {
                  let result = getFormattedDirectories [| twoDirThreeSizeArray |]

                  Expect.equal
                      result
                      [| "terraform/instance-1/network"; "terraform/instance-2/virtual-machine" |]
                      "The strings should equal"

                  let serializedResult = getserializedResult result

                  Expect.equal
                      serializedResult
                      "[\"terraform/instance-1/network\",\"terraform/instance-2/virtual-machine\"]"
                      "The strings should equal"
              } ]

    [<EntryPoint>]
    let main args = runTests defaultConfig tests
    ```


### Using the Custom F# Action

After defining the F# action code, now it's time to start using it.

The idea of this workflow, is that it will first run some validation jobs to assert that the Terraform code is well formatted and valid, and later run the *terraform plan* so we can analyze the proposed changes.

Since the repository structure is going to evolve along the time, with the addition and removal of separate instances, it would be nice to have a configuration in the CI that is smart enough to trigger the job only for the modified projects.

And indeed, we can do it using a dynamic matrix ([[9]​](#orgb1aeb3c))!

From the GitHub documentation:

> A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are based on the combinations of the variables. &#x2014; [[9]​](#orgb1aeb3c)

Great, right? Read more about it in [[13]​](#orgb1aeb3c).

So, by using this strategy, we can dynamically adjust the workflow trigger to execute only for the required instances, based on the code changes submitted in the pull request.

Let's check the code now (*.github/workflows/tf-development.yml*):

```yaml
name: Terraform Development

on:
  pull_request:
    paths:
      - 'terraform/**.tf'

# Kill other jobs when we trigger this workflow by sending new commits
# to the PR.
# https://stackoverflow.com/a/72408109
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  # https://github.com/marketplace/actions/changed-files
  get-modified-files:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v35
        with:
          json: true
          files: terraform/
      - name: List all changed files
        id: modified-directories
        uses: ./.github/fsharp-custom-action
        with:
          directories: ${{ steps.changed-files.outputs.all_changed_files }}
    outputs:
      matrix: ${{ steps.modified-directories.outputs.formatted-directories }}

  # Check the Terraform configuration formatting
  format:
    runs-on: ubuntu-22.04
    needs: [get-modified-files]
    strategy:
      matrix:
        PROJECT_DIRECTORY: ${{ fromJSON(needs.get-modified-files.outputs.matrix) }}
    defaults:
      run:
        working-directory: ./${{ matrix.PROJECT_DIRECTORY }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Check Terraform format
        run: terraform fmt -check

  # Validate the Terraform configuration
  validate:
    runs-on: ubuntu-22.04
    needs: [get-modified-files]
    strategy:
      matrix:
        PROJECT_DIRECTORY: ${{ fromJSON(needs.get-modified-files.outputs.matrix) }}
    defaults:
      run:
        working-directory: ./${{ matrix.PROJECT_DIRECTORY }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Validate Terraform configuration
        run: terraform validate

  # Get the Terraform plan to understand what will change before applying
  terraform-plan:
    needs: [get-modified-files, format, validate]
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        PROJECT_DIRECTORY: ${{ fromJSON(needs.get-modified-files.outputs.matrix) }}
    defaults:
      run:
        working-directory: ./${{ matrix.PROJECT_DIRECTORY }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Terraform plan
        run: terraform plan
```

1.  Workflow Name

    The first line is used to define the workflow name, in this case: "Terraform Development". You need to always use a descriptive name, so it's easier to understand later.

    ```yaml
    name: Terraform Development
    ```

2.  Workflow Triggers

    Next, we have the triggers configuration. It defines which events are going to start the workflow ([[12]​](#orgb1aeb3c)).

    ```yaml
    on:
      pull_request:
        paths:
          - 'terraform/**.tf'
    ```

    In this case, we're going to trigger it whenever a file with extension *.tf* that is inside the directory *terraform/* changes in some open pull request.

3.  Concurrency

    The next block already has a documentation comment, so I'm not going to explain it here again. There's also a link pointing to the place I found it.

    ```yaml
    # Kill other jobs when we trigger this workflow by sending new commits
    # to the PR.
    # https://stackoverflow.com/a/72408109
    concurrency:
      group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
      cancel-in-progress: true
    ```

4.  Job: get-modified-files

    Now, we finally enter the jobs definition. And the first job, is the one where we'll use the custom F# action:

    ```yaml
    get-modified-files:
      runs-on: ubuntu-22.04
      steps:
        - name: Checkout repository
          uses: actions/checkout@v3
        - name: Get changed files
          id: changed-files
          uses: tj-actions/changed-files@v35
          with:
            json: true
            files: terraform/
        - name: List all changed files
          id: modified-directories
          uses: ./.github/fsharp-custom-action
          with:
            directories: ${{ steps.changed-files.outputs.all_changed_files }}
      outputs:
        matrix: ${{ steps.modified-directories.outputs.formatted-directories }}
    ```

    After the job name in the first line, we're specifying the OS that we're going to run the job, in this case **ubuntu-22.04**. I could have used **ubuntu-latest** there, but the problem is that the **ubuntu-latest** is going to change along the time, while the **ubuntu-22.04** is going to keep the same (in theory).

    It's the same rationale to avoid using the **latest** tag for Docker images. If you want to have a reliable configuration along the time, you need to keep things specific, including the version/tag of the components that you're using.

    The next instruction is where we start defining the steps of the job.

    First, we use the **actions/checkout** ([[15]​](#orgb1aeb3c)) action to check-out our repository inside the VM that is executing the CI, under `$GITHUB_WORKSPACE`. It already picks the branch that we're working, so for example, if the branch is named *add-instance-2*, it's going to check-out this branch with our fresh modifications.

    Then, we use the **tj-actions/changed-files** ([[16]​](#orgb1aeb3c)) to retrieve only the modified files and directories related to the branch we're working. In the action configuration, I'm defining some values to filter where this action is going to look for modifications and the format of the output.

    I'm setting the *json* option to true, so the output is a list of changed files in a JSON formatted string, which by itself can be used for matrix jobs.

    And I'm also setting the *files* to *terraform/*. This configuration is used to define the patterns to detect changes. In this case, I'm interested only in changes within the *terraform/* directory.

    Continuing the explanation, the next step is finally our custom F# action usage. Notice that instead of passing the name of the action in the *uses* part, I need to use its path so GitHub knows where to find its code: *./.github/fsharp-custom-action*.

    Other than that, I'm also passing an input to the action, which is going to be sent as the argument to the F# function. Notice that the name **directories** is the same defined in the custom action *action.yml* input configuration.

    And the value of this argument is basically an output from the previous step. You can find the list of all the outputs from the **tj-actions/changed-files** action consulting its README in [[16]​](#orgb1aeb3c).

    The format to define the output is basically:

    ```bash
    ${{ steps.<STEP_ID>.outputs.<OUTPUT_NAME> }}
    ```

    -   Note: The `${{ ... }}` syntax stands for a GitHub Action expression. Read more about it in reference [[17]​](#orgb1aeb3c).

    Finally, we're defining the output of this step, so it's more readable to use it later, at least in my opinion.

5.  Job: format

    Continuing the configuration, the next job is responsible for checking the formatting of the Terraform configuration.

    In this job, I'm leveraging the default configuration of the ubuntu-22.04 host, that already has the Terraform tool installed. You can check the default software available in it using the reference [[18]​](#orgb1aeb3c).

    There, the piece of configuration that interests us is basically:

    ```yaml
    format:
      runs-on: ubuntu-22.04
      needs: [get-modified-files]
      strategy:
        matrix:
          PROJECT_DIRECTORY: ${{ fromJSON(needs.get-modified-files.outputs.matrix) }}
      defaults:
        run:
          working-directory: ./${{ matrix.PROJECT_DIRECTORY }}
      # ...
    ```

    The **needs** keyword is used to define the jobs that must run before we can start executing this job. In this case, the only dependency is the *get-modified-files*.

    Next, we define the matrix strategy to run the job.

    In this case, we're using a matrix strategy, which lets us use different variables in a single definition to automatically create multiple jobs runs that are based on the combinations of the variables ([[13]​](#orgb1aeb3c)).

    The value of the matrix is going to be stored in the variable *PROJECT_DIRECTORY*, which itself is the result of parsing a JSON array that is the output of our custom F# action.

    We use the built-in function *fromJSON()* to parse the value.

    Later, we set some *defaults* configuration, specifying that we want to use, as the *working-directory* for the job, the path stored in the *PROJECT_DIRECTORY* variable.

    And the same approach is replicated for the next jobs in the *tf-development.yml* file. They're used to validate the Terraform configuration and run the *terraform plan*, consecutively.


# Conclusion

In this article I covered my journey for creating a custom F# GitHub Action, and use it with a POC project that is itself using Terraform.

I hope I was able to show you that it's indeed not that hard.

Notice that, although I decided to write the action using F#, it could have been written in any other language, you just need to obey the interface used by the action runtime and containerize your application accordingly.

If you found some point to improve, don't hesitate to send a PR to the original repository, so we can evolve the project along the time.

And that's it, see you another time.


# Appendix


## Other Workflows

Along with the **tf-deployment.yml** workflow covered in this article, we can find other interesting jobs in the project repository.

In this appendix section I'm going to give a quick overview of them.

-   **fsharp-auto-tests.yml:** This workflow is used to run the automated tests for the F# custom action automatically, whenever we send an update to a file with the extensions *fs*, *fsx* and *fsproj*.
-   **fsharp-lint.yml:** Used to check the lint of the code, with the same trigger used in the previous workflow. In this context, I'm assuming that the lint is related to stylistic formatting of the code. We use the tool named fantomas ([[19]​](#orgb1aeb3c)) with its default configuration to check the codebase.
-   **tf-apply.yml:** As expected, runs the *terraform apply* for the project and module defined in the input of the action. Notice that it has a *workflow_dispatch* trigger which accepts some inputs, which I decided to not cover in this article.
-   **tf-destroy.yml:** Similar to the workflow explored before, but runs the *terraform destroy* command instead.


## .gitattributes

One thing to keep in mind is that GitHub ignores the content inside the *.github/* folder when checking the languages used in the repository.

In this POC project, the GitHub page was showing only HCL language being used, so I created a new discussion in the GitHub Community to understand why ([[10]​](#orgb1aeb3c)). My goal was to show the F# language usage as well.

Eventually, I learned more about the GitHub usage of Linguist ([[11]​](#orgb1aeb3c)) to detect the languages in the repository, and its default configuration for ignored paths (thanks [airtower-luna](https://github.com/airtower-luna)).

In order to change the default configuration, and allow GitHub to check the language within the *.github/fsharp-custom-action/* directory, it was required to add this *.gitattributes* file:

```sh
.github/fsharp-custom-action/** -linguist-vendored
```


# References

[1] - [Terratest: Terraform "Hello, World" Example](https://github.com/gruntwork-io/terratest/tree/master/examples/terraform-hello-world-example)

[2] - [64J0/custom-fsharp-gh-action-and-dynamic-matrix](https://github.com/64J0/custom-fsharp-gh-action-and-dynamic-matrix)

[3] - [GitHub Docs: Types of Actions](https://docs.github.com/en/actions/creating-actions/about-custom-actions#types-of-actions)

[4] - [GitHub Docs: Creating a Docker container action](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action)

[5] - [GitHub Docs: Metadata syntax for GitHub Actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)

[6] - [Docker Docs: Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

[7] - [Nuget: Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/)

[8] - [haf/expecto](https://github.com/haf/expecto)

[9] - [GitHub Docs: Using a matrix for your jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)

[10] - [GitHub Community: Repository "Languages" showing incorrect information](https://github.com/orgs/community/discussions/54854)

[11] - [github-linguist/linguist](https://github.com/github-linguist/linguist)

[12] - [GitHub Docs: Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

[13] - [Medium: Dynamic matrix in GitHub Action](https://vs-blogs.medium.com/dynamic-matrix-in-github-action-e516019cfdf5)

[14] - [GitHub Docs: GitHub Actions Documentation](https://docs.github.com/en/actions)

[15] - [actions/checkout](https://github.com/actions/checkout)

[16] - [tj-actions/changed-files](https://github.com/tj-actions/changed-files)

[17] - [GitHub Docs: Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)

[18] - [actions/runner-images/images/linux/Ubuntu2204-Readme.md](https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2204-Readme.md)

[19] - [fsprojects/fantomas](https://github.com/fsprojects/fantomas)
