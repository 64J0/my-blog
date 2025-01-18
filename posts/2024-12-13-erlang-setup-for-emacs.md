---
title: "Erlang programming setup for Emacs"
date: "2024-12-13"
show: true
tags: ["erlang", "emacs"]
---

Recently, after talking to some friends from the [Don’t rely on Nulls](https://www.dontrelynulls.org/) and [Dr-Nekoma](https://github.com/Dr-Nekoma), I decided to start studying the famous Erlang programming language. Since the beginning of this journey, my goal was to leverage the LSP whenever possible to help writing programs.

So, with this post I'm going to present my programming setup for Erlang programming with Emacs. But first, some considerations:

- This setup was tested using:
  - [Emacs](https://www.gnu.org/software/emacs/) 29.4
  - [Erlang/OTP](https://www.erlang.org/downloads) 27.1.2
  - [erlang-language-platform](https://github.com/WhatsApp/erlang-language-platform) 1.1.0+build-2024-11-07
- The configuration presented here does not reflect my complete setup. To access it, please look at this repository: [64J0/emacs-config](https://github.com/64J0/emacs-config).

With no further ado, let's start. The gist of changes required were:

``` emacs-lisp
;; Changes at the lsp-mode configuration
(use-package lsp-mode
  :hook ((lsp-mode       . lsp-headerline-breadcrumb-mode)
         ;; ...
         (erlang-mode    . lsp-deferred))
  :config
  ;; ...
  ;; There's something wrong with the ELP installation through lsp, so it was
  ;; required to install the package manually from:
  ;; `https://github.com/WhatsApp/erlang-language-platform/releases'.
  ;;
  ;; More informations regarding this tool:
  ;; `https://whatsapp.github.io/erlang-language-platform/docs/get-started/editors/emacs/'
  ;;
  ;; Other tips:
  ;;
  ;; 1. After setting this configuration, LSP and ELP were trying to add file
  ;; watchers to all my files down the Desktop/ folder. I was able to make it
  ;; work properly; ie look for the files only from my project, using the
  ;; command `lsp-workspace-remove-all-folders'. Then, after reopeing the Erlang
  ;; codebase, it asked me for the root directory, which I provided
  ;; interactively.
  (lsp-register-client
   (make-lsp-client :new-connection (lsp-stdio-connection '("elp" "server"))
                    :major-modes '(erlang-mode)
                    :priority 0
                    :server-id 'erlang-language-platform))
  )

;; ...

;; Erlang configuration
;;
;; Notice that I installed it using `https://github.com/kerl/kerl';
;;
;; $ kerl build 27.1.2
;; $ kerl install 27.1.2 /home/gajo/lib/erlang/27.1.2
;; $ . /home/gajo/lib/erlang/27.1.2/activate
;;
;; About erlang-mode:
;; `https://www.erlang.org/doc/apps/tools/erlang_mode_chapter.html'
;;
;; Another tutorial:
;; `https://alexott.net/en/writings/emacs-devenv/EmacsErlang.html'
;;
(setq load-path (cons "/home/gajo/lib/erlang/27.1.2/lib/tools-4.1/emacs" load-path))
(setq erlang-root-dir "/home/gajo/lib/erlang/27.1.2")
(setq exec-path (cons "/home/gajo/lib/erlang/27.1.2/bin" exec-path))
(setq erlang-man-root-dir "/home/gajo/lib/erlang/27.1.2/man")
(require 'erlang-start)
(add-to-list 'auto-mode-alist '("\\.erl?$" . erlang-mode))
(add-to-list 'auto-mode-alist '("\\.hrl?$" . erlang-mode))
```

Notice that the commands used for downloading and installing the necessary tools are already mentioned at this code sample. For your local configuration, you'll need to adapt the paths like `/home/gajo/...` to something that makes sense at your system.

And this is how it looks like at my computer, with the Erlang Shell at the side:

![Erlang setup for Emacs sample](/post-images/erlang-setup-for-emacs/sample.png "Erlang setup for Emacs sample")
