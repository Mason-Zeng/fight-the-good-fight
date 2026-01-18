// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("addTextBtn");
//   const text = document.getElementById("encouragingText");

//   btn.addEventListener("click", () => {
//     text.textContent = "test";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  textsArray = [
    "Jesus is rooting for you. Don't let him down.",
    "Remember the joy of that comes with walking with the Lord.",
    "You are a leader for Christ. How could you stumble them with your sin?",
    "Jesus loves you so much he died for you.",
    "Your body is a temple. Honor God with your body.",
    "Don't let this be the reason God takes away certain blessings.",
    "You were bought with a price. Don't live as if the cross was cheap."
  ];
  const index = Math.floor(Math.random() * textsArray.length);
  const textElement = document.getElementById("encouragingText");
  textElement.textContent = textsArray[index];
});
