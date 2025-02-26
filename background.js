// Create the parent context menu item
browser.contextMenus.create({
  id: "grok-text",
  title: "Send to Grok",
  contexts: ["selection"],
});

// Create submenu items for commands
const commands = [
  { id: "explain", title: "Explain" },
  { id: "translate", title: "Translate to English" },
  { id: "summarize", title: "Summarize" },
  { id: "respond", title: "Write a response to" },
];

commands.forEach((command) => {
  browser.contextMenus.create({
    id: command.id,
    parentId: "grok-text",
    title: command.title,
    contexts: ["selection"],
  });
});

// Handle menu item clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (
    info.menuItemId === "grok-text" ||
    commands.some((cmd) => cmd.id === info.menuItemId)
  ) {
    const selectedText = info.selectionText;
    const command =
      commands.find((cmd) => cmd.id === info.menuItemId)?.title || "";
    const textToSend = command ? `${command}: ${selectedText}` : selectedText;

    // Open Grok in new tab
    browser.tabs
      .create({
        url: "https://x.com/i/grok",
      })
      .then((newTab) => {
        // Wait for page to load before injecting script
        setTimeout(() => {
          browser.tabs.executeScript(newTab.id, {
            code: `
            // Find tweet textarea and populate with selected text
            const waitForElement = setInterval(() => {
              const textArea = document.querySelector('textarea');
              const submitButton = document.querySelector('button[aria-label="Grok something"]');
              if (textArea) {
                textArea.value = ${JSON.stringify(textToSend)};
                clearInterval(waitForElement);
                textArea.focus();

                // force x ui to recognize the input (so that it's not cleared on re-renders etc)
                const inputEvent = new Event('input', { bubbles: true });
                textArea.dispatchEvent(inputEvent);

                setTimeout(() => {
                  submitButton.click();
                }, 1000)
              }
            }, 500); // Check every 500ms
          `,
          });
          // Initial delay to let page begin loading
        }, 2000);
      });
  }
});
