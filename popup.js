document.addEventListener("DOMContentLoaded", () => {
  function enableSound() {
    const video = document.getElementById("video");

    video.muted = false;
    video.volume = 1.0;
    console.log(video.muted);

    video.play().catch((err) => {
      console.warn("play() failed:", err);
    });
  }
  document.addEventListener("mousemove", enableSound, { once: true });
  
  let customTexts = readFromStroage();
  let textsArray = [
    "Jesus is rooting for you. Don't let him down.",
    "Remember the joy that comes with walking with the Lord.",
    "You are a leader for Christ. How could you stumble others with your sin?",
    "Jesus loves you so much he died for you.",
    "Don't let this be the reason God takes away certain blessings.",
  ];
  textsArray = textsArray.concat(customTexts);

  const container = document.querySelector(".container");
  if (!container) return;

  // Save the original "page" markup so we can restore it later.
  const originalMarkup = container.innerHTML;

  function renderHomePage({ text } = {}) {
    // Restore original UI
    container.innerHTML = originalMarkup;

    // Re-bind elements because we replaced the DOM
    const textElement = document.getElementById("encouragingText");
    const addTextBtn = document.getElementById("addTextBtn");

    // Set text (user-provided or random)
    if (textElement) {
      if (typeof text === "string" && text.trim() !== "") {
        textElement.textContent = text.trim();
      } else {
        const index = Math.floor(Math.random() * textsArray.length);
        textElement.textContent = textsArray[index];
      }
    }

    // Re-bind click handler
    if (addTextBtn) {
      addTextBtn.addEventListener("click", () => renderAddTextPage());
    }
  }

  function renderAddTextPage() {
    // Replace the whole container content with a "new page"
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; padding:16px; border-bottom:1px solid #e5e7eb;">
        <button id="backBtn" aria-label="Back"
          style="border:none; background:transparent; cursor:pointer; font-size:20px; line-height:1;">
          ←
        </button>
        <div style="font-size:14px; font-weight:600; color:#111827;">Add Text</div>
      </div>

      <div style="padding:16px; display:flex; flex-direction:column; gap:10px;">
        <input id="textInput" type="text" placeholder="Type text and press Enter"
          style="width:100%; padding:10px; font-size:16px; border:1px solid #d1d5db; border-radius:6px; outline:none;" />
        <div style="font-size:12px; color:#6b7280;">Press Enter to submit • Esc to go back</div>
      </div>
    `;

    const backBtn = document.getElementById("backBtn");
    const input = document.getElementById("textInput");

    backBtn?.addEventListener("click", () => renderHomePage());

    input?.focus();

    input?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        renderHomePage();
        return;
      }

      if (e.key === "Enter") {
        const value = (input.value || "").trim();
        if (value.length === 0) {
          return;
        }
        addToLocalStorage(value);
        // Go back to the original page and display the user's text
        renderHomePage({ text: value });
      }
    });
  }

  // Initial render: show the normal/home page (random message)
  renderHomePage();
});

function addToLocalStorage(text) {
  let texts = readFromStroage();
  texts.push(text);
  localStorage.setItem("texts", JSON.stringify(texts));
}

function readFromStroage(){
  const stored = localStorage.getItem("texts");
  const texts = stored ? JSON.parse(stored) : [];
  return texts;
}

