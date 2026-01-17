document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("addTextBtn");
  const text = document.getElementById("encouragingText");

  btn.addEventListener("click", () => {
    text.textContent = "test";
  });
});
