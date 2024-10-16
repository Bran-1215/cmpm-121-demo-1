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

let counterVal:number = 0;
const counterDiv = document.createElement("div");
counterDiv.innerHTML = "🪳 Busted: " + counterVal;
button.addEventListener("click", () => {
    console.log(counterVal);
    counterDiv.innerHTML = "🪳Busted: " + ++counterVal;
});
app.append(counterDiv);
