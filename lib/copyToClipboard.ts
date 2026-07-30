const COPY_FEEDBACK_DURATION_MS = 1500;

function showCopyFeedback(button: HTMLButtonElement): void {
  const originalLabel = button.getAttribute("aria-label");
  button.classList.add("is-copied");
  button.setAttribute("aria-label", "Copied to clipboard");
  button.disabled = true;

  setTimeout(() => {
    button.classList.remove("is-copied");
    if (originalLabel) button.setAttribute("aria-label", originalLabel);
    button.disabled = false;
  }, COPY_FEEDBACK_DURATION_MS);
}

function copyWithFallback(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

export function copyCodeToClipboard(text: string, button: HTMLButtonElement): void {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showCopyFeedback(button)).catch(() => {});
    return;
  }

  if (copyWithFallback(text)) {
    showCopyFeedback(button);
  }
}
