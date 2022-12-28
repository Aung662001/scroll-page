"use strict";
var allCalearBtn = document.querySelector(".all-clear");
var deleteBtn = document.querySelector(".delete");
var negateBtn = document.querySelector(".negate");
var percentBtn = document.querySelector(".percent");
var numberBtns = document.querySelectorAll(".number");
var operatorBtns = document.querySelectorAll(".operator");
var resultContainer = document.querySelector(".result-container");
var equalBtn = document.querySelector(".equal");

var resultDisplayed = false;

//adding click handalers to number buttons
allCalearBtn.addEventListener("click", function () {
  resultContainer.value = "";
  active();
});
deleteBtn.addEventListener("click", () => {
  var deleteValue = resultContainer.value.splice(0, -1);
  resultContainer.value = deleteValue;
  active();
});
function active() {
  if (resultContainer.value.length > 0) {
    deleteBtn.classList.add("active");
  } else {
    deleteBtn.classList.remove("active");
  }
}
//adding click handler to numbers
for (var i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", function (e) {
    //storing it current string and it last characters in variables-use later
    var currentString = resultContainer.value;
    var lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      resultContainer.value += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar == "+") ||
      lastChar == "-" ||
      lastChar == "×" ||
      lastChar == "÷"
    ) {
      //if result is currently display and user press an operator
      //we need to keep on adding to the string for next operation
      resultDisplayed = false;
      resultContainer.value += e.target.innerHTML;
    } else {
      //if result is currently displayed and user press an number
      //we need to clear the input and add the new input to start the next operation
      resultDisplayed = false;
      resultContainer.value = "";
      resultContainer.value += e.target.innerHTML;
    }
    active();
  });
}
for (var i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", function (e) {
    //storing it current string and it last characters in variables-use later
    var currentString = resultContainer.value;
    var lastChar = currentString[currentString.length - 1];

    //if(lastChar === "+"|| lastChar === "-" || lastChar === "x" || lastChar == "÷"){
    //  var newString = currentString.substring( 0, currentString.length - 1) + e.target.innerHTML;
    //resultContainer.value=newString;
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      resultContainer.value = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      resultContainer.value += e.target.innerHTML;
      console.log("err");
    }
  });
}
percentBtn.addEventListener("click", () => {
  var per = eval(resultContainer.value / 100);
  resultContainer.value = per;
});

negateBtn.addEventListener("click", () => {
  var neg = -parseFloat(resultContainer.value);
  resultContainer.value = neg;
});
equalBtn.addEventListener("click", () => {
  var inputString = resultContainer.value;
  var numbers = inputString.split(/\+|\-|\×|\÷/gi);
  console.log(numbers);

  var operators = inputString.replace(/[0-9]|\./gi, "").split("");
  console.log(operators);

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    console.log(divide);
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var plus = operators.indexOf("+");
  while (plus != -1) {
    numbers.splice(
      plus,
      2,
      parseFloat(numbers[plus]) + parseFloat(numbers[plus + 1])
    );
    operators.splice(plus, 1);
    plus = operators.indexOf("+");
  }

  resultContainer.value = numbers[0];
  console.log(numbers[0]);

  resultDisplayed = true;
});
