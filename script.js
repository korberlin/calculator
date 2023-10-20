const { forEachChild } = require("typescript");

let firstNumberStr = "";
const operators = ['+', '-', '*', '/']
let firstNumber;
let secondNumber;
let operator;
let inputValue;

function add(x, y) {
    return x + y
}
function sub(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(operator, firstNumber, secondNumber) {
    if (operator === '+')
        return add(firstNumber, secondNumber);
    else if (operator === '*')
        return multiply(firstNumber, secondNumber)
    else if (operator === '-')
        return sub(firstNumber, secondNumber)
    else
        return divide(firstNumber, secondNumber)
}


function populateDisplay() {
    const buttons = document.querySelectorAll("button");
    const displayResult = document.querySelector(".result");
    const displayInput = document.querySelector(".input");
    display.forEach(button => {
        button.addEventListener("click", function () {
            if (button.textContent >= 0 && button.textContent <= 9 || button.textContent === '.') {
                if (!inputValue.includes('.') && button.textContent === '.') {
                    inputValue += button.textContent;
                    displayInput.textContent = inputValue;
                }
                else if (button.textContent >= 0 && button.textContent <= 9) {
                    inputValue += button.textContent;
                    displayInput.textContent = inputValue;
                }
            }
            else if (operators.includes(button.textContent)) {
                if (inputValue && !firstNumber) {
                    displayInput.textContent += button.textContent;
                    firstNumber = parseFloat(inputValue);
                    inputValue = "";
                    operator = button.textContent;
                }
                else if (firstNumber && inputValue) {
                    secondNumber = parseFloat(inputValue);
                    inputValue = "";
                    operator = button.textContent;
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    displayResult.textContent = firstNumber;
                }
            }
            else if (button.textContent === "CE") {
                inputValue = "";
                firstNumber = 0;
                secondNumber = 0;
                operator = null;
                displayInput.textContent = inputValue;
                displayResult.textContent = inputValue;
            }
            else if (button.textContent === "C") {
                if (inputValue) {
                    inputValue = inputValue.splice(-1, 0);
                    displayInput = inputValue;
                }
            }
            else if (button.textContent === "=") {
                if (firstNumber && inputValue) {
                    secondNumber = parseFloat(inputValue);
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    displayInput.textContent = firstNumber;
                    displayResult.textContent = firstNumber;
                    inputValue = "";
                }
            }
        })
    })
}

