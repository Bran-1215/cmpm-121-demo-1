import "./style.css";
import upgradeItems from "./items.json";

interface Item {
  upgradeName: string;
  upgradeDescription: string;
  bugCost: number;
  bustRate: number;
}

const availableItems: Item[] = upgradeItems as Item[];

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

let bustRate = 0;
const itemCounters = availableItems.map(() => 0);
const statusDisplay = document.createElement("div");

const updateStatusDisplay = () => {
  const itemStatus = availableItems
    .map((item, index) => `${item.upgradeName}: ${itemCounters[index]}`)
    .join(", ");
  statusDisplay.innerHTML = `Busting Rate: ${Math.round(bustRate * 10) / 10} bugs/second, ${itemStatus}`;
};
app.append(statusDisplay);

const addUpgradeButtonListeners = (
  button: HTMLButtonElement,
  itemCost: number,
  index: number
) => {
  document.addEventListener("click", () => {
    button.innerHTML = `${availableItems[index].upgradeName} (${itemCost} bugs)`;
  });

  document.addEventListener("input", () => {
    button.disabled = counterVal < itemCost;
  });
};

const createUpgradeButton = (item: Item, index: number) => {
  let itemCost = item.bugCost;

  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.upgradeName} (${itemCost} bugs)`;
  app.append(upgradeButton);

  const upgradeDescriptionDiv = document.createElement("div");
  upgradeDescriptionDiv.innerHTML = item.upgradeDescription;
  app.append(upgradeDescriptionDiv);

  addUpgradeButtonListeners(upgradeButton, itemCost, index);

  upgradeButton.addEventListener("click", () => {
    if (counterVal >= itemCost) {
      bustRate += item.bustRate;
      itemCounters[index] += 1;
      counterVal -= itemCost;
      itemCost = Math.round(itemCost * 1.15 * 100) / 100;

      let timestamp = performance.now();
      requestAnimationFrame(function step(t) {
        counterVal += ((t - timestamp) / 1000) * item.bustRate;
        timestamp = t;
        counterDiv.innerHTML = "🪳Busted: " + Math.floor(counterVal);
        requestAnimationFrame(step);
      });
    }
    updateStatusDisplay();
  });
};

availableItems.forEach((item, index) => {
  createUpgradeButton(item, index);
});
