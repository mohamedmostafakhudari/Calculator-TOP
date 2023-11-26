// DOM Refs
const calculator = document.querySelector(".calculator");
const displayBox = document.querySelector(".calculator__display");
const calculatorKeys = document.querySelector(".calculator__keys");

// Control Operends and Operator
let operator = "";
let previousOperend = 0;
let currentOperend = 0;
let result = 0;
/*************************** Event Listeners **************************/
// Listen for key strokes
calculatorKeys.addEventListener("click", (e) => {
	const target = e.target.closest(".key");
	if (!target) return;
	const action = target.dataset.action;
	const value = target.dataset.value;
	/******** Actions ********/
	if (action) {
		switch (action) {
			case "add":
				previousOperend += +currentOperend;
				currentOperend = 0;
				operator = add(+previousOperend);
				break;
			case "subtract":
				break;
			case "multiply":
				break;
			case "divide":
				break;
			case "calculate":
				result = operator(+currentOperend);
				previousOperend = 0;
				currentOperend = result;
				console.log(result);
				break;
			case "decimal":
				break;
			case "clear":
				break;
		}
	}
	/******* Values ********/
	if (value) {
		updateOperends(value);
	}
});
/*************************** Functions ********************************/
// Handle Operends
function updateOperends(operend) {
	currentOperend += +operend;
}
// Handle Display
function updateDisplay(number) {
	displayBox.textContent += number;
}
function clearDisplay() {
	displayBox.textContent = "";
}
// Operators
function add(num1) {
	return (num2) => {
		return parseFloat((num1 + num2).toFixed(2));
	};
}

function subtract(num1, num2) {
	return parseFloat((num1 - num2).toFixed(2));
}

function multiply(num1, num2) {
	return parseFloat((num1 * num2).toFixed(2));
}

function divide(num1, num2) {
	return parseFloat((num1 / num2).toFixed(2));
}
