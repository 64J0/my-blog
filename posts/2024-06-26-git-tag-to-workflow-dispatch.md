---
title: "Creating another custom GH Action using F#: git-tag-to-workflow-dispatch"
date: "2024-06-26"
show: true
tags: ["project", "fsharp", "github actions"]
---

# Introduction

Last year, I wrote the post [Custom GH Action using F# and dynamic matrix configuration](./2023-05-10-custom-fsharp-gh-action-and-dynamic-matrix) explaining how I created a custom GitHub Action using F# for generating a dynamic matrix configuration. By that time, my goal was only to tackle a personal necessity regarding a Terraform automation workflow, so I decided not to publish the action.

Then, this year I discovered the [Is there possible to use Git Tags as a choice of workflow dispatch's input](https://github.com/orgs/community/discussions/45871) discussion on GitHub community repo, which, to this day, is still open. And I thought it was an interesting challenge.

But before we dig into the custom action details, we need to establish a common ground. You need to know what is a workflow, and what are some of the available configuration for the workflows, with focus on the `workflow_dispatch` trigger.

And I know that this knowledge is not common for people outside the DevOps/DevSecOps environment, which are more familiar with CI/CD concepts, so let's start by exploring these concepts, and later I present the problem using more clear sentences.

## The problem

According to the GitHub documentation, in the context of GitHub Actions:

> A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository and will run when triggered by an event in your repository, or they can be triggered manually, or at a defined schedule.
>
> Workflows are defined in the .github/workflows directory in a repository, and a repository can have multiple workflows, each of which can perform a different set of tasks. For example, you can have one workflow to build and test pull requests, another workflow to deploy your application every time a release is created, and still another workflow that adds a label every time someone opens a new issue.
>
> &#x2014; [1]

When we create our workflows, we could use different triggers. The `workflow_dispatch` trigger is used:

> To enable a workflow to be triggered manually, you need to configure the workflow\_dispatch event. You can manually trigger a workflow run using the GitHub API, GitHub CLI, or GitHub browser interface.
>
> [&#x2026;]
>
> You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow.
>
> &#x2014; [2]

So, with this short introduction to GitHub Actions concepts, you can finally understand that what this people are asking for is a way to have the repository tags listed automatically as input options when using a workflow with a `workflow_dispatch` trigger.

# The solution

Since the problem is still open, I decided to create my own solution [FsharpGHActions/git-tag-to-workflow-dispatch](https://github.com/FsharpGHActions/git-tag-to-workflow-dispatch) and share with the community, using F# again because this is my main language for now. So let's start exploring it.

Let's start from the [action.yml](https://github.com/FsharpGHActions/git-tag-to-workflow-dispatch/blob/master/action.yml) file, which is the entrypoint for the custom action. At the `runs:` key we start defining the steps of it.

The first step is a new checkout (`actions/checkout@v4`) of the repository, so this action has access to the repository `.github/workflows` folder. At first I thought this was not required, because the client would already run the checkout, but after a test I noticed it was necessary.

```yaml
- name: Checkout repo
  uses: actions/checkout@v4
```

Then, the next step is just to build the environment variable **HELPER\_PATH**. This variable is going to be used later to specify where to download the custom F# program, and to avoid collisions with the repository folders. I decided to use the commit SHA (`GITHUB_SHA`) appended to the string `-fsharp-program`. The value of the `GITHUB_SHA` is defined as:

> The commit SHA that triggered the workflow. [&#x2026;] For example, ffac537e6cbbf934b08745a378932722df287a53.
>
> &#x2014; [3]

```yaml
- name: Add HELPER_PATH
  shell: bash
  run: echo "HELPER_PATH=${GITHUB_SHA}-fsharp-program" >> "${GITHUB_ENV}"
```

The next three steps are related to the download, extraction and execution of the custom F# program:

```yaml
- name: Download the self-contained .NET program
  shell: bash
  env:
    PACKAGE_URL: 'https://github.com/FsharpGHActions/git-tag-to-workflow-dispatch/releases/download/v0.0.017/fsharp-program.tar.gz'
  run: wget -O "${HELPER_PATH}.tar.gz" "${PACKAGE_URL}"
- name: Uncompress the .NET program
  shell: bash
  run: |
    mkdir "${HELPER_PATH}/"
    tar -xf "${HELPER_PATH}.tar.gz" -C "${HELPER_PATH}/"
- name: Run the .NET program
  shell: bash
  env:
    VALUES_TO_TAKE: ${{ inputs.values-to-take }}
    WORKFLOW_KEY: ${{ inputs.workflow-yaml-key }}
    GIT_TAGS: ${{ inputs.git-tags }}
  run: ./${HELPER_PATH}/out/Main "${GIT_TAGS}"
```

This F# program is responsible for building the new `workflow_dispatch` options. It starts from this template:

```yaml
on:
  workflow_dispatch:
    inputs:
      TEMP_WORKFLOW_KEY%%:
        type: choice
        options:
        - v1.0.0
        - v1.0.1
```

and generates something like this, configured to take as much as **VALUES\_TO\_TAKE** tags from **GIT\_TAGS**, and later replacing the placeholder **TEMP\_WORKFLOW\_KEY%%** from the template by the **WORKFLOW\_KEY** value.

For example, suppose that you sent this:

-   **VALUES\_TO\_TAKE** = 5
-   **WORKFLOW\_KEY** = version
-   **GIT\_TAGS** = [v0.0.010, v0.0.009, v0.0.008, v0.0.007, v0.0.006, v0.0.005, v0.0.004, v0.0.003, v0.0.002, v0.0.001]

It will generate this file:

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        type: choice
        options:
          - v0.0.010
          - v0.0.009
          - v0.0.008
          - v0.0.007
          - v0.0.006
```

Next, there's a step that merges this updated `workflow_dispatch` configuration with the target workflow, preserving almost perfectly the target YAML configuration. Other than that, you can later review the PR automatically created to before applying this update, just to make sure it's good enough.

There, I decided to use [mikefarah/yq](https://github.com/mikefarah/yq) because it's easy, has many features and works really well.

```yaml
- name: Merge the workflows
  uses: mikefarah/yq@master
  env:
    WORKFLOW_FILE_NAME: ${{ inputs.workflow-file-name }}
  with:
    cmd: yq -i '. * load("./workflow.new.yml")' ".github/workflows/${WORKFLOW_FILE_NAME}"
```

The next steps are for debugging and cleaning the repository, where the merged workflow is printed to the console, and the F# program files are removed.

```yaml
- name: Debug -> Print the new workflow file
  shell: bash
  env:
    WORKFLOW_FILE_NAME: ${{ inputs.workflow-file-name }}
  run: cat ".github/workflows/${WORKFLOW_FILE_NAME}"

- name: Clean action
  shell: bash
  run: |
    rm "./workflow.new.yml"
    rm "./${HELPER_PATH}.tar.gz"
    rm -rf "./${HELPER_PATH}/"
```

And finally, the last step is where we create the pull request that updates the repository configuration using [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request) project.

```yaml
- name: Create pull request
  # if: ${{ inputs.pull-request }} # TODO
  uses: peter-evans/create-pull-request@v6
  with:
    token: ${{ inputs.github-token }}
    base: ${{ inputs.base }}
    branch-suffix: timestamp
    branch: git-tag-to-workflow-dispatch
    commit-message: |
      chore: automated git tags to workflow dispatch

      this commit is updating the workflow dispatch (github actions) options autonomously
      with the tags from this repository
```

My idea in the long run is to map more inputs from this action to my own custom action, to let the user configure more properties of the pull request that is going to be used.

## How to use it

The usage instructions are already explained at the repository [README.org](https://github.com/FsharpGHActions/git-tag-to-workflow-dispatch/blob/master/README.org), and if this is not good yet, there's a sample project showing how it can be used here: [link](https://github.com/FsharpGHActions/gh-samples/blob/main/.github/workflows/git-tag-to-workflow-dispatch.yml).

If you don't want to go for that link, this is the workflow configuration:

```yaml
name: On tag creation

on:
  workflow_dispatch:
  push:
    tags: # https://github.com/orgs/community/discussions/25302
    - '*'

jobs:
  test-git-tag-to-workflow-dispatch:
    name: Test git-tag-to-workflow-dispatch
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        files: [example-001.yml]
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # to get the tags
      - name: Get the repository tags
        run: |
          THIS_GIT_TAGS=$(git tag --sort -creatordate | tr '\n' ' ')

          echo "Git tags: ${THIS_GIT_TAGS}"

          echo "THIS_GIT_TAGS=${THIS_GIT_TAGS}" >> "${GITHUB_ENV}"
      - name: Run custom action
        uses: FsharpGHActions/git-tag-to-workflow-dispatch@v0.0.018
        with:
          values-to-take: 5
          workflow-file-name: ${{ matrix.files }}
          workflow-yaml-key: 'version'
          pull-request: true
          # needs to be a PAT to update the workflows/ folder
          github-token: ${{ secrets.PAT_GITHUB }}
          git-tags: ${{ env.THIS_GIT_TAGS }}
          base: 'main'
```

And you can find an example pull request created here: [link](https://github.com/FsharpGHActions/gh-samples/pull/2).

# Conclusion

I know that this solution is not really what the community wants, but considering the current limitations, and considering that the real solution is only possible from GitHub dev team itself, I think it's good enough, working as an automation helper.

By using this action you don't really need to remember to update the workflow whenever a new tag is created, you'll already have an open PR with the necessary changes waiting to be reviewed and merged.

# References

-   [1] About workflows. GitHub Actions Docs. [Link](https://docs.github.com/en/actions/using-workflows/about-workflows).

-   [2] Events that trigger workflows: workflow\_dispatch. GitHub Actions Docs. [Link](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch).

-   [3] Default environment variables. GitHub Actions Docs. [Link](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables).
