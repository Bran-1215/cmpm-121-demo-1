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
statusDisplay.innerHTML = `Busting Rate: ${rate} bugs/second, Bug Traps: ${itemACounter}, Bug Spray: ${itemBCounter}, Exterminator: ${itemCCounter}`;
document.addEventListener("click", () => {
  statusDisplay.innerHTML = `Busting Rate: ${Math.round(rate * 10) / 10} bugs/second, Bug Traps: ${itemACounter}, Bug Spray: ${itemBCounter}, Exterminator: ${itemCCounter}`;
});
app.append(statusDisplay);

// Upgrade Button A
let upgradeACost = 10;
const upgradeButtonA = document.createElement("button");
upgradeButtonA.innerHTML = `Bug Traps (${upgradeACost} bugs)`;
document.addEventListener("click", () => {
  upgradeButtonA.innerHTML = `Bug Traps (${upgradeACost} bugs)`;
});
app.append(upgradeButtonA);

document.addEventListener("input", () => {
  upgradeButtonA.disabled = counterVal < upgradeACost;
});

upgradeButtonA.addEventListener("click", () => {
  if (counterVal >= upgradeACost) {
    rate += 0.1;
    itemACounter += 1;
    counterVal -= upgradeACost;
    upgradeACost = Math.round(upgradeACost * 1.15 * 100) / 100;
    let timestampA = performance.now();
    requestAnimationFrame(function step(tA) {
      counterVal += ((tA - timestampA) / 1000) * 0.1;
      timestampA = tA;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});

// Upgrade Button B
let upgradeBCost = 100;
const upgradeButtonB = document.createElement("button");
upgradeButtonB.innerHTML = `Bug Spray (${upgradeBCost} bugs)`;
document.addEventListener("click", () => {
  upgradeButtonB.innerHTML = `Bug Spray (${upgradeBCost} bugs)`;
});
app.append(upgradeButtonB);

document.addEventListener("input", () => {
  upgradeButtonB.disabled = counterVal < upgradeBCost;
});

upgradeButtonB.addEventListener("click", () => {
  if (counterVal >= upgradeBCost) {
    rate += 2;
    itemBCounter += 1;
    counterVal -= upgradeBCost;
    upgradeBCost = Math.round(upgradeBCost * 1.15 * 100) / 100;
    let timestampB = performance.now();
    requestAnimationFrame(function step(tB) {
      counterVal += ((tB - timestampB) / 1000) * 2;
      timestampB = tB;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});

// Upgrade Button C
let upgradeCCost = 1000;
const upgradeButtonC = document.createElement("button");
upgradeButtonC.innerHTML = `Exterminator (${upgradeCCost} bugs)`;
document.addEventListener("click", () => {
  upgradeButtonC.innerHTML = `Exterminator (${upgradeCCost} bugs)`;
});
app.append(upgradeButtonC);

document.addEventListener("input", () => {
  upgradeButtonC.disabled = counterVal < upgradeCCost;
});

upgradeButtonC.addEventListener("click", () => {
  if (counterVal >= upgradeCCost) {
    rate += 50;
    itemCCounter += 1;
    counterVal -= upgradeCCost;
    upgradeCCost = Math.round(upgradeCCost * 1.15 * 100) / 100;
    let timestampC = performance.now();
    requestAnimationFrame(function step(tC) {
      counterVal += ((tC - timestampC) / 1000) * 50;
      timestampC = tC;
      counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
      requestAnimationFrame(step);
    });
  }
});
