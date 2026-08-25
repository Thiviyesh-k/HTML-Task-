var firstNumber = "";
var secondNumber = "";
var operator = "";
var currentValue = "";
var displayText = "";

function press(value) {
  currentValue = currentValue + value;
  displayText = displayText + value;
  document.getElementById("result").value = displayText;
}

function setOperator(op) {
  firstNumber = currentValue;
  operator = op;
  currentValue = "";
  displayText = displayText + op;
  document.getElementById("result").value = displayText;
}

function calculate() {
  secondNumber = currentValue;

  var num1 = Number(firstNumber);
  var num2 = Number(secondNumber);
  var answer = 0;

  if (operator == "+") {
    answer = num1 + num2;
  } else if (operator == "-") {
    answer = num1 - num2;
  } else if (operator == "*") {
    answer = num1 * num2;
  } else if (operator == "/") {
    answer = num1 / num2;
  }

  displayText = displayText + "=" + answer;
  document.getElementById("result").value = displayText;

  currentValue = "" + answer;
  displayText = "" + answer;
}

function clearResult() {
  currentValue = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayText = "";
  document.getElementById("result").value = "";
}