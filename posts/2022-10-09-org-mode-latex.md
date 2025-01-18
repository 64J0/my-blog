---
title: "GNU Emacs Org-Mode and LaTeX"
date: "2022-10-09"
show: true
tags: ["emacs", "org-mode", "latex"]
---

# Introduction

Recently, I started taking some classes from the ElvenWorks Bootcamp on SRE
(Site Reliability Engineering), and among the extra lessons (they share these
before the beginning of the Bootcamp itself), I felt the necessity of writing
some custom formulas in my notes.

Since I'm using *GNU Emacs + Org-Mode + Org-Roam* to keep my notes organized,
and I had some previous knowledge of *LaTeX*, I decided to combine both of this
knowledge in order to make my notes more effective and powerful.

This post was created to share my path in this journey, and some clarifications
for the official docs, which I think could be more clear.

## Definitions

Before diving into the article content, I decided to add this small section to
present the definitions of some terms used.

### GNU Emacs

+ Official [link](https://www.gnu.org/software/emacs/ "Emacs link").

> GNU Emacs is an extensible, customizable, free/libre text editor - and more.
>
> At its core is an interpreter for Emacs Lisp, a dialect of the Lisp
> programming language with extensions to support text editing.

GNU Emacs is a very powerful tool, which is being developed since
~ 1985. Although it's age, this tool is still maintained by several open source
contributors, which are constantly adding new features.

Some even call it a dream come true.

### Org-Mode

+ Official [link](https://orgmode.org/worg/org-tutorials/org-latex-preview.html "Org-mode link").

> Org Mode
>
> Your life in plain text
>
> A GNU Emacs major mode for keeping notes, authoring documents, computational
> notebooks, literate programming, maintaining to-do lists, planning projects,
> and more - in a fast and effective plain text system.

Org Mode is a tool that many consider the killer feature of Emacs.

The description I got from the official docs and shared previously explains it
in a good way.

### Org-Roam

+ Official [link](https://www.orgroam.com/ "Org-roam link").

> A plain-text personal knowledge management system.

Org-roam is a package that must be used along with Org-mode. It applies the
[Zettelkasten
Method](https://www.orgroam.com/manual.html#A-Brief-Introduction-to-the-Zettelkasten-Method)
for note keeping, organizing the notes in a reasonable way.

### LaTeX

Finally, LaTeX is a software system for document preparation, which is very
popular in the academic world, due to its power in expressing complex formulas
in a good look manner.

You can read more about it in its Wikipedia article:
[link](https://en.wikipedia.org/wiki/LaTeX "LaTeX wikipedia article").

# The Docs

First of all, in my journey I consulted the following links from the Org-Mode
documentation:

+ [org-tutorials: LaTeX preview in org](https://orgmode.org/worg/org-tutorials/org-latex-preview.html "org-tutorials: LaTeX preview in org")
+ [org-manual: Embedded LaTeX](https://orgmode.org/manual/Embedded-LaTeX.html "org-manual: Embedded LaTeX")
+ [org-manual: LaTeX Fragments](https://orgmode.org/manual/LaTeX-fragments.html "org-manual: LaTeX Fragments")
+ [org-manual: Previewing LaTeX Fragments](https://orgmode.org/manual/Previewing-LaTeX-fragments.html "org-manual: Previewing LaTeX Fragments")
+ [org-manual: Using CDLaTeX to Enter Math](https://orgmode.org/manual/CDLaTeX-mode.html "org-manual: Using CDLaTeX to Enter Math")

Consider reading it to get more deeper knowledge that I did not touch on in this
short article.

# The Goal

My initial goal in this journey was to be able to compile the LaTeX formulas,
ideally in an automated way, and display the result in the body of the document
I'm writing.

With this in mind, I went directly to the docs mentioned before. I was pretty
happy when I found that Org-mode provided the facility I wanted out of the box.

But, in reality, it was a bit tricky to make it work.

In essence, we can use the command *org-preview-latex-fragment*, which is bound
to *C-c C-x C-l*. This command will process the LaTeX code and produce a PNG
image which is later shown in the body of the note.

The command mentioned before works like a toggle button, so, if you want to
disable the image preview and work again in the LaTeX code, you can simply call
it again with the cursor in the preview image.

## dvipng

According to the docs, there are two methods we can use for LaTeX preview:
**dvipng** and **imagemagick**. I decided to pick the first, for no special
reason other than it appearing first in the documentation.

Since I'm using a Debian-based GNU Linux distribution, it was required to
install the **dvipng** package. It's pretty straightforward to do using the
**apt** package manager:

```bash
sudo apt install dvipng
```

The next step is to configure the Org package to use this tool. In order to do
it, add this configuration to your initialization script:

```emacs-lisp
(setq org-latex-create-formula-image-program 'dvipng)
```

Now, create a new org-file (extension **.org**), and add the following block of
code:

```plaintext
This is my first time using LaTeX in Org-Mode!

Let's compile this:

\begin{equation}
e^{i \pi} + 1 = 0
\end{equation}
```

Now, put your cursor in the equation content and hit *C-c C-x C-l*.

You'll get something like this:

![Org Mode and LaTeX preview.](/gifs/org-latex-example-1.gif "Org Mode and LaTeX preview")

That's it!

You can change the look of this built image in order to make it more readable,
for example:

```emacs-lisp
; increase the size
(setq org-format-latex-options (plist-put org-format-latex-options :scale 2.0))
; highlight latex code in org-mode
(setq org-highlight-latex-and-related '(native))
```

## Automate the Preview Generation

According to the documentation, you can automatically turn on the LaTeX preview
feature by adding this property to the Org file:

``` emacs-lisp
#+STARTUP: latexpreview
```

And, to disable it:

``` emacs-lisp
#+STARTUP: nolatexpreview
```

# Conclusion

In this article, I have presented a quick overview of the LaTeX visualization
features available in GNU Emacs + Org-Mode. The idea to write about it was the
lacking of good and direct examples that I found while reading the documentation
and making my initial research.

I believe that with this content, now it's easier to start exploring and using
this tool in your own GNU Emacs setup since we have a working example to start.

For me, initially I thought it would be required to wrap the LaTeX configuration
in the *#+BEGIN_SRC latex* block, and during my tests, this feature was never
working, but, fortunately, I found a working example in 4Chan with the code to
look at.

There I noticed that the source block was **not used**.

Finally, if you want to dig deeper into this topic, please consult the official
documentation. The links mentioned in **The Docs** section are a very good
start.
