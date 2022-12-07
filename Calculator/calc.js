document.getElementById("mode-btn").addEventListener("click", changeTheme);
let calculatorText = document.querySelector("#text-show-operation");
let calculatorInputText = document.querySelector("#calculator-input");

var firstNumber = "",
  secondNumber = "",
  operand = "";
result = "";
operandFlag = false;
equalFlag = false;
firstNumberFlag = false;
secondNumberFlag = false;

function changeTheme() {
  let themeCssEl = document.querySelector("#theme-css");

  if (themeCssEl.getAttribute("href") === "light.css") {
    let template = `<i id="moon" class="fa-sharp fa-solid fa-moon mode"></i>`;
    themeCssEl.setAttribute("href", "dark.css");

    document.querySelector("#icon").innerHTML = template;
  } else {
    let template = `<i id="sun" class="fa-sharp fa-solid fa-sun mode"></i>`;
    themeCssEl.setAttribute("href", "light.css");

    document.querySelector("#icon").innerHTML = template;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial rendering of the items
  let template = `<i id="sun" class="fa-sharp fa-solid fa-sun mode"></i>`;

  document.querySelector("#icon").innerHTML = template;

  renderCalculatorButtons();
});

let buttons = [
  { class: "seven", value: "7" },
  { class: "eight", value: "8" },
  { class: "nine", value: "9" },
  { class: "div", value: "/" },
  { class: "four", value: "4" },
  { class: "five", value: "5" },
  { class: "six", value: "6" },
  { class: "mul", value: "*" },
  { class: "one", value: "1" },
  { class: "two", value: "2" },
  { class: "three", value: "3" },
  { class: "minus", value: "-" },
  { class: "zero", value: "0" },
  { class: "C", value: "C" },
  { class: "equal", value: "=" },
  { class: "plus", value: "+" },
];

function calculate(operand) {
  let result = "";
  switch (operand) {
    case "+":
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
      break;
    case "-":
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
      break;
    case "/":
      result = parseFloat(firstNumber) / parseFloat(secondNumber);
      break;
    case "*":
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
      break;
  }

  return result;
}

function clearAll() {
  calculatorInputText.innerHTML = "0";
  calculatorText.innerHTML = "";
  firstNumber = "";
  secondNumber = "";
  firstNumberFlag = false;
  secondNumberFlag = false;
  operand = "";
  equalFlag = false;
  operandFlag = false;
  result = "";
}

function workWhenButtonIsNumber(item) {
  console.log("worked");
  let calcText = calculatorText.innerHTML + item.innerHTML;
  calculatorText.innerHTML = calcText;
  let calcInputText = "";

  if (equalFlag == true) {
    clearAll();
    calculatorText.innerHTML = item.innerHTML;
  }

  if (operandFlag === false) {
    if (firstNumberFlag === false) {
      calcInputText = item.innerHTML;
      firstNumber = calcInputText;
      calculatorInputText.innerHTML = calcInputText;
      firstNumberFlag = true;
    } else {
      calcInputText = calculatorInputText.innerHTML + item.innerHTML;
      firstNumber = calcInputText;
      calculatorInputText.innerHTML = calcInputText;
    }
  } else {
    if (secondNumberFlag === false) {
      calcInputText = item.innerHTML;
      secondNumber = calcInputText;
      calculatorInputText.innerHTML = calcInputText;
      secondNumberFlag = true;
    } else {
      calcInputText = calculatorInputText.innerHTML + item.innerHTML;
      secondNumber = calcInputText;
      calculatorInputText.innerHTML = calcInputText;
    }
  }
}

function workWhenButtonIsOperand(item, stringInput) {
  if (equalFlag == true) {
    firstNumber =
      calculatorInputText.innerHTML !== ""
        ? parseFloat(calculatorInputText.innerHTML)
        : 0;
    firstNumberFlag = true;
    secondNumber = "";
    secondNumberFlag = false;
    calculatorText.innerHTML = firstNumber + " " + item.innerHTML + " ";

    equalFlag = false;
  }

  if (operandFlag === true) {
    if (firstNumberFlag === false && secondNumberFlag === false) {
      return;
    }

    result = calculate(operand);

    secondNumber = "";
    firstNumber = result ? result : firstNumber;
    firstNumberFlag = true;
    secondNumberFlag = false;
    operand = stringInput;

    let lastCharOfCalculatorText =
      calculatorText.innerHTML[calculatorText.innerHTML.length - 2];

    if (
      lastCharOfCalculatorText.charCodeAt(0) >= 42 &&
      lastCharOfCalculatorText.charCodeAt(0) <= 47
    )
      return;
    calculatorInputText.innerHTML = result;
    calculatorText.innerHTML += " " + stringInput + " ";
  } else {
    if (firstNumberFlag === true) {
      operandFlag = true;
      calculatorText.innerHTML = firstNumber + " " + item.innerHTML + " ";
      operand = stringInput;
    } else {
      firstNumber = "0";
      operandFlag = true;
      calculatorText.innerHTML = firstNumber + " " + item.innerHTML + " ";
      calculatorInputText.innerHTML = "0";
      operand = stringInput;
    }
  }
}

function workWhenButtonIsEqual(stringInput) {
  result = calculate(operand);
  calculatorInputText.innerHTML = result.toString();
  equalFlag = true;

  if (operandFlag === true) {
    calculatorText.innerHTML =
      firstNumber + " " + operand + " " + secondNumber + " " + stringInput;
    firstNumber = result;
    return;
  } else {
    if (result === "") {
      calculatorText.innerHTML =
        (firstNumber !== "" ? firstNumber : "0") + " = ";
      calculatorInputText.innerHTML = firstNumber !== "" ? firstNumber : "0";
      return;
    }

    firstNumber = result;
    operandFlag = false;
    firstNumberFlag = false;
    secondNumberFlag = false;

    if (calculatorText.innerHTML[calculatorText.innerHTML.length - 2] === "=")
      return;

    calculatorText.innerHTML += " " + stringInput + " ";
  }
}

function renderScreenValues(item) {
  let stringInput = item.innerHTML;

  if (calculatorInputText.innerHTML === "0") calculatorInputText.innerHTML = "";

  // [48, 57] -> [0, 9]
  if (stringInput.charCodeAt(0) >= 48 && stringInput.charCodeAt(0) <= 57) {
    workWhenButtonIsNumber(item);
  } else if (
    // [42, 47] -> [*, /]
    stringInput.charCodeAt(0) >= 42 &&
    stringInput.charCodeAt(0) <= 47
  ) {
    workWhenButtonIsOperand(item, stringInput);
  } else if (stringInput === "=") {
    workWhenButtonIsEqual(stringInput);
  } else if (stringInput === "C") {
    clearAll();
  }
}

function renderCalculatorButtons() {
  let template = "";
  for (let i = 0; i < buttons.length; i++) {
    let item = buttons[i];
    let temp = "btn-" + item.class;
    template += `<button class="btn ${temp}" onClick="renderScreenValues(this)">${item.value}</button>`;
  }

  document.querySelector("#calculator-buttonss").innerHTML = template;
}
