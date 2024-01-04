const DEFAULT_COLOR = "#222222";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const blackButton = document.getElementById("black");
const rainbowButton = document.getElementById("rainbow");
const eraseButton = document.getElementById("erase");
const resetButton = document.getElementById("reset");

const sizeValue = document.getElementById("size-value");
const sizeSlider = document.getElementById("slider");
const grid = document.getElementById("grid");

blackButton.addEventListener("click", () => setCurrentMode("black"));
rainbowButton.addEventListener("click", () => setCurrentMode("rainbow"));
eraseButton.addEventListener("click", () => setCurrentMode("erase"));
resetButton.addEventListener("click", () => resetGrid());

sizeSlider.addEventListener("input", (e) => {
    changeSizeValue(e.target.value);
    changeSize(e.target.value);
});

function activateButton(newMode) {
    if (currentMode === "black") {
        blackButton.classList.remove("active");
    }
    else if (currentMode === "rainbow") {
        rainbowButton.classList.remove("active");
    }
    else if (currentMode === "erase") {
        eraseButton.classList.remove("active");
    }

    if (newMode === "black") {
        blackButton.classList.add("active");
    }
    else if (newMode === "rainbow") {
        rainbowButton.classList.add("active");
    }
    else if (newMode === "erase") {
        eraseButton.classList.add("active");
    }
}

function setCurrentMode(mode) {
    activateButton(mode);
    currentMode = mode;
}

function setCurrentSize(size) {
    currentSize = size;
}

function changeSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) {
        return;
    }

    if (currentMode === "black") {
        e.target.style.backgroundColor = currentColor;
    }
    else if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
    
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (currentMode === "erase") {
        e.target.style.backgroundColor = "#ededed";
    }
}

function setGridSize(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let index = 0; index < size * size; index++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        gridElement.addEventListener("mouseover", changeColor);
        gridElement.addEventListener("mousedown", changeColor);
        grid.appendChild(gridElement);
    }
}

function resetGrid() {
    grid.innerHTML = '';
    setGridSize(currentSize);
}

function changeSize(value) {
    setCurrentSize(value);
    changeSizeValue(value);
    resetGrid();
}

window.onload = () => {
    setGridSize(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}