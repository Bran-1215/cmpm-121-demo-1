import "./style.css";

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Bug Traps", description: "Sticky traps to catch bugs", cost: 10, rate: 0.1 },
  { name: "Bug Spray", description: "Aerosolized weaponry against bugs", cost: 100, rate: 2 },
  { name: "Exterminator", description: "Just some guy whose better at busting bugs than you", cost: 1000, rate: 50 },
  { name: "Fumigator", description: "Like bug spray but better, and more dangerous", cost: 10000, rate: 500 },
  { name: "Bug Nuke", description: "Bug Nuke. Nuke for bugs. Bugs will be nuked.", cost: 100000, rate: 10000 },
];

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

// Refactored Code
let rate = 0;
const itemCounters = availableItems.map(() => 0);
const statusDisplay = document.createElement("div");

const updateStatusDisplay = () => {
  const itemStatus = availableItems
    .map((item, index) => `${item.name}: ${itemCounters[index]}`)
    .join(", ");
  statusDisplay.innerHTML = `Busting Rate: ${Math.round(rate * 10) / 10} bugs/second, ${itemStatus}`;
};
app.append(statusDisplay);

const createUpgradeButton = (item: Item, index: number) => {
  let itemCost = item.cost;

  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.name} (${itemCost} bugs)`;
  app.append(upgradeButton);

  // Create a description element
  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = item.description;
  app.append(descriptionDiv);

  document.addEventListener("click", () => {
    upgradeButton.innerHTML = `${item.name} (${itemCost} bugs)`;
  });

  document.addEventListener("input", () => {
    upgradeButton.disabled = counterVal < itemCost;
  });

  upgradeButton.addEventListener("click", () => {
    if (counterVal >= itemCost) {
      rate += item.rate;
      itemCounters[index] += 1;
      counterVal -= itemCost;
      itemCost = Math.round(itemCost * 1.15 * 100) / 100;
      let timestamp = performance.now();
      requestAnimationFrame(function step(t) {
        counterVal += ((t - timestamp) / 1000) * item.rate;
        timestamp = t;
        counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
        requestAnimationFrame(step);
      });
    }
    updateStatusDisplay();
  });
};

// Creation of Buttons
availableItems.forEach((item, index) => {
  createUpgradeButton(item, index);
});
