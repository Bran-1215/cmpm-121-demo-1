import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "bug buster";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonName = "Bust Bug 🪳";
const button = document.createElement("button");
button.innerHTML = buttonName;
app.append(button);

let counterVal: number = 0;
const counterDiv = document.createElement("div");
counterDiv.innerHTML = "🪳 Busted: " + counterVal;
button.addEventListener("click", () => {
  counterDiv.innerHTML = "🪳Busted: " + ++counterVal;
});
app.append(counterDiv);

const upgradeButtonName = "Upgrade: Auto-Buster (10 bugs)";
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = upgradeButtonName;
app.append(upgradeButton);

document.addEventListener("input", () => {
  upgradeButton.disabled = counterVal < 10;
});
upgradeButton.addEventListener("click", () => {
  if (counterVal >= 10) {
    counterVal -= 10;
    let timestamp = performance.now();
    requestAnimationFrame(function step(t) {
      counterVal += (t - timestamp) / 1000;
      timestamp = t;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});
