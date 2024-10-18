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

// Status Display
let rate = 0;
let itemACounter = 0;
let itemBCounter = 0;
let itemCCounter = 0;
const statusDisplay = document.createElement("div");
statusDisplay.innerHTML = `Busting Rate: ${rate} bugs/second, Item A: ${itemACounter}, Item B: ${itemBCounter}, Item C: ${itemCCounter}`;
document.addEventListener("click", () => {
  statusDisplay.innerHTML = `Busting Rate: ${Math.round(rate*10)/10} bugs/second, Item A: ${itemACounter}, Item B: ${itemBCounter}, Item C: ${itemCCounter}`;
});
app.append(statusDisplay);

// Upgrade Button A
const upgradeButtonAName = "Upgrade: Auto-Buster A (10 bugs)";
const upgradeButtonA = document.createElement("button");
upgradeButtonA.innerHTML = upgradeButtonAName;
app.append(upgradeButtonA);

document.addEventListener("input", () => {
  upgradeButtonA.disabled = counterVal < 10;
});

upgradeButtonA.addEventListener("click", () => {
  if (counterVal >= 10) {
    rate += 0.1;
    itemACounter += 1;
    counterVal -= 10;
    let timestampA = performance.now();
    requestAnimationFrame(function step(tA) {
      counterVal += ((tA - timestampA) / 1000)*0.1;
      timestampA = tA;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});

// Upgrade Button B
const upgradeButtonBName = "Upgrade: Auto-Buster B (100 bugs)";
const upgradeButtonB = document.createElement("button");
upgradeButtonB.innerHTML = upgradeButtonBName;
app.append(upgradeButtonB);

document.addEventListener("input", () => {
  upgradeButtonB.disabled = counterVal < 100;
});

upgradeButtonB.addEventListener("click", () => {
  if (counterVal >= 100) {
    rate += 2;
    itemBCounter += 1;
    counterVal -= 100;
    let timestampB = performance.now();
    requestAnimationFrame(function step(tB) {
      counterVal += ((tB - timestampB) / 1000)*2;
      timestampB = tB;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});

// Upgrade Button C
const upgradeButtonCName = "Upgrade: Auto-Buster C (1000 bugs)";
const upgradeButtonC = document.createElement("button");
upgradeButtonC.innerHTML = upgradeButtonCName;
app.append(upgradeButtonC);

document.addEventListener("input", () => {
  upgradeButtonC.disabled = counterVal < 1000;
});

upgradeButtonC.addEventListener("click", () => {
  if (counterVal >= 1000) {
    rate += 50;
    itemCCounter += 1;
    counterVal -= 1000;
    let timestampC = performance.now();
    requestAnimationFrame(function step(tC) {
      counterVal += ((tC - timestampC) / 1000)*50;
      timestampC = tC;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});

