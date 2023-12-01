// DOM Refs
const calculator = document.querySelector(".calculator");
const displayBox = document.querySelector(".calculator__display");
const calculatorKeys = document.querySelector(".calculator__keys");
const allKeys = document.querySelectorAll(".key");
const numberKeys = document.querySelectorAll(".key[data-value]");
const operatorKeys = document.querySelectorAll(".key--operator");
// Initial Values
let operations = {
	"+": (x, y) => parseFloat((x + y).toFixed(2)),
	"-": (x, y) => parseFloat((x - y).toFixed(2)),
	"*": (x, y) => parseFloat((x * y).toFixed(2)),
	"/": (x, y) => parseFloat((x / y).toFixed(2)),
};

let previousOperend = "";
let currentOperend = "";
let operator = null;
let result = null;
let equalClicked = false;

/*************************** Add Keyboard Codes To DOM */
addKeyboardCodes();
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
			updateOperator(target, action);
		}
		if (action === "calculate") {
			equalClicked = true;
			operate(operator, previousOperend, currentOperend);
			resetBtns();
		}
		if (action === "clear") {
			reset();
		}
		if (action === "decimal") {
			appendNewChar(target, ".");
		}
		if (action === "delete") {
			deleteOneCharToLeft();
		}
	}
	/******* Values ********/
	if (value) {
		appendNewChar(target, value);
	}
});

/*************************** Keyboard Support ***********************/
document.addEventListener("keydown", (e) => {
	const keyValue = e.key;
	const keyCode = keyValue.charCodeAt();
	const target = document.querySelector(`.key[data-code="${keyCode}"]`);
	if (!/[0-9.//+*/-=]|Backspace|Enter/.test(keyValue)) {
		e.preventDefault();
		return;
	}
	console.log(!!Number(keyValue));
	if (Number(keyValue) || keyValue === "." || keyValue === "0") {
		appendNewChar(target, keyValue);
	} else {
		switch (keyValue) {
			case "+":
			case "-":
			case "*":
			case "/":
				updateOperator(target, keyValue);
				break;
			case ".":
				appendNewChar(target, ".");
				break;
			case "Enter":
			case "=":
				equalClicked = true;
				operate(operator, previousOperend, currentOperend);
				resetBtns();
				break;
			case "Backspace":
				if (e.shiftKey) {
					reset();
				} else {
					deleteOneCharToLeft();
				}
		}
	}
});
/*************************** Functions ********************************/
function addKeyboardCodes() {
	numberKeys.forEach((key) => {
		const value = key.dataset.value;
		const code = value.charCodeAt();
		key.dataset.code = code;
	});
	operatorKeys.forEach((key) => {
		const action = key.dataset.action;
		const code = action.charCodeAt();
		key.dataset.code = code;
	});
}
function updateOperator(target, action) {
	if (operator && !equalClicked) {
		operate(operator, previousOperend, currentOperend);
	}
	updateOperends("");
	operator = operations[action];
	// visuals
	operatorKeys.forEach((key) => {
		key.classList.remove("active");
	});
	target.classList.add("active");
}
function deleteOneCharToLeft() {
	if (displayBox.textContent.length === 1) {
		reset();
		return;
	}
	currentOperend = currentOperend.toString().slice(0, -1);
	updateDisplay();
}
function appendNewChar(target, value) {
	if (value === "." && displayBox.textContent.includes(".")) return;
	currentOperend += value;
	updateDisplay();
	// visuals
	numberKeys.forEach((key) => {
		key.classList.remove("active");
	});
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
	displayBox.textContent = "0";
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
