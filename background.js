const UI_URL = chrome.runtime.getURL("popup.html");
const WINDOW_NAME = "hotkey_popup_window";

async function openOrFocusPopupWindow() {
  // Try to find an existing popup window we created
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

  // Otherwise, create a new small centered popup window
  const width = 400;
  const height = 400;

  // Best-effort centering: some browsers may ignore left/top
//   const left = Math.round((screen.width - width) / 2);
//   const top = Math.round((screen.height - height) / 2);

  await chrome.windows.create({
    url: UI_URL,
    type: "popup",
    width,
    height,
    focused: true
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "show-ui") {
    await openOrFocusPopupWindow();
  }
});
