

const operators = ['+', '-', '*', '/']
let firstNumber;
let secondNumber;
let operator;
let inputValue = "";

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

function roundNumber(num, decimalPlaces) {
    return parseFloat(num.toFixed(decimalPlaces));
}
function checkoverFlow(num) {
    const MAXNUM = 12;
    const strNum = num.toString();
    if (strNum.length > MAXNUM)
        return true;
    return false;
}
function operate(operator, firstNumber, secondNumber) {
    let result;
    let finalresult;
    if (operator === '+')
        result = add(firstNumber, secondNumber);
    else if (operator === '*')
        result = multiply(firstNumber, secondNumber)
    else if (operator === '-')
        result = sub(firstNumber, secondNumber)
    else {
        if (secondNumber === 0)
            return "MATH ERROR";

        result = divide(firstNumber, secondNumber)
    }
    finalresult = roundNumber(result, 10);
    if (checkoverFlow(finalresult))
        return "MATH ERROR";
    return finalresult;

}


function populateDisplay() {
    const buttons = document.querySelectorAll("button");
    const displayResult = document.querySelector(".result");
    const displayInput = document.querySelector(".input");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            if (button.textContent >= 0 && button.textContent <= 9 || button.textContent === '.') {
                if (!inputValue.includes('.') && button.textContent === '.') {
                    inputValue += button.textContent;
                    displayInput.textContent += inputValue;
                }
                else if (button.textContent >= 0 && button.textContent <= 9) {
                    inputValue += button.textContent;
                    displayInput.textContent += button.textContent;
                }
            }
            else if (operators.includes(button.textContent)) {
                if (firstNumber && !inputValue) {
                    displayInput.textContent = firstNumber + button.textContent;
                    operator = button.textContent;
                }
                else if (inputValue && !firstNumber) {
                    displayInput.textContent += button.textContent;
                    firstNumber = parseFloat(inputValue);
                    inputValue = "";
                    operator = button.textContent;
                }
                else if (firstNumber && inputValue) {
                    secondNumber = parseFloat(inputValue);
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    displayInput.textContent += button.textContent;
                    inputValue = "";
                    operator = button.textContent;
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
                    inputValue = inputValue.slice(0, -1);
                    displayInput.textContent = inputValue;
                }
            }
            else if (button.textContent === "=") {
                if (firstNumber && inputValue) {
                    secondNumber = parseFloat(inputValue);
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    displayInput.textContent = "";
                    displayResult.textContent = firstNumber;
                    inputValue = "";
                }
            }
        })
    })
}
populateDisplay();
