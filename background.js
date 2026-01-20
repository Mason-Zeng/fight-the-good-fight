const UI_URL = chrome.runtime.getURL("popup.html");
const WINDOW_NAME = "hotkey_popup_window";

async function openOrFocusPopupWindow() {
  const wins = await chrome.windows.getAll({ populate: true });

  for (const w of wins) {
    for (const t of (w.tabs || [])) {
      if (t.url === UI_URL) {
        await chrome.windows.update(w.id, { focused: true });
        await chrome.tabs.update(t.id, { active: true });
        return;
      }
    }
  }

  await chrome.windows.create({
    url: UI_URL,
    type: "popup",
    width: 400,
    height: 400,
    focused: true
  });
}

// 🔹 Keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "show-ui") {
    openOrFocusPopupWindow();
  }
});

// 🔹 Pinned extension icon click
chrome.action.onClicked.addListener(() => {
  openOrFocusPopupWindow();
});
