// DOM Refs
const calculator = document.querySelector(".calculator");
const displayBox = document.querySelector(".calculator__display");
const calculatorKeys = document.querySelector(".calculator__keys");
const allKeys = document.querySelectorAll(".key");
const numberKeys = document.querySelectorAll(".key[data-value]");
const operatorKeys = document.querySelectorAll(".key--operator");
// Initial Values
let operations = {
	add: (x, y) => parseFloat((x + y).toFixed(2)),
	subtract: (x, y) => parseFloat((x - y).toFixed(2)),
	multiply: (x, y) => parseFloat((x * y).toFixed(2)),
	divide: (x, y) => parseFloat((x / y).toFixed(2)),
};

let previousOperend = "";
let currentOperend = "";
let operator = null;
let result = null;
let equalClicked = false;
/*************************** Event Listeners **************************/
// Listen for key strokes
calculatorKeys.addEventListener("click", (e) => {
	const target = e.target.closest(".key");
	if (!target) return;
	const action = target.dataset.action;
	const value = target.dataset.value;
	/******** Actions ********/
	if (action) {
		if (operations[action]) {
			if (operator && !equalClicked) {
				operate(operator, previousOperend, currentOperend);
			}
			updateOperends("");
			operator = operations[action];
		}
		if (action === "calculate") {
			equalClicked = true;
			operate(operator, previousOperend, currentOperend);
		}
		if (action === "clear") {
			reset();
		}
		if (action === "decimal") {
			if (displayBox.textContent.includes(".")) return;
			currentOperend += ".";
			updateDisplay();
		}
	}
	/******* Values ********/
	if (value) {
		currentOperend += value;
		updateDisplay();
	}
	manageInteractivity(target, value, action);
});
/*************************** Functions ********************************/
// Manage Interactivity
function manageInteractivity(target, value, action) {
	if (action === "calculate" || action === "clear") {
		resetBtns();
	}
	if (operations[action]) {
		operatorKeys.forEach((key) => {
			key.classList.remove("active");
		});
	} else if (value) {
		numberKeys.forEach((key) => {
			key.classList.remove("active");
		});
	}
	target.classList.add("active");
}
// Operator function
function operate(operator, x, y) {
	result = operator(+x, +y);
	updateOperends(result);
	updateDisplay(result);
}
// Handle Operends
function updateOperends(value) {
	previousOperend = currentOperend;
	currentOperend = value;
}
// Handle Display
function updateDisplay(value) {
	if (displayBox.textContent === "0") {
		displayBox.textContent = "";
	}
	displayBox.textContent = value || currentOperend;
}
function clearDisplay() {
	displayBox.textContent = "";
}
function reset() {
	clearDisplay();
	resetBtns();
	previousOperend = "";
	currentOperend = "";
	operator = null;
	result = null;
	equalClicked = false;
}
function resetBtns() {
	allKeys.forEach((key) => {
		key.classList.remove("active");
	});
}
