function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function load() {
  function equalTo(input) {
    // Last char of string
    var lastChar = input[input.length - 1];

    // Replace x to *, + to / which could be calculated in eval
    input = input.replace(/×/g, "*").replace(/÷/g, "/");

    // Checking the last character of the input.
    // If it's an operator or a decimal, remove it
    // /.$/ means last char in regex
    if (operators.indexOf(lastChar) > -1 || lastChar == ".")
      input = input.replace(/.$/, "");

    if (input) {
      // If the argument is an expression, eval() evaluates the expression.
      // If the argument is one or more JavaScript statements, eval() executes the statements.
      let result = eval(input);
      if (isFloat(result)) {
        return parseFloat(result).toFixed(2);
      } else {
        return "%d", result;
      }
    }
  }
  var btns = document.querySelectorAll(".calculator span");
  var operators = ["+", "-", "×", "÷"];
  var inputScreen = document.querySelector(".calculator .screen");
  var btnValue;
  var input;
  inputScreen.innerHTML = "0";
  for (var i = 0; i < btns.length; i++) {
    var decimalAdded = false; // Flag used to avoid two decimal

    btns[i].addEventListener("click", function () {
      btnValue = this.innerHTML;
      input = inputScreen.innerHTML;

      switch (btnValue) {
        case "AC":
          inputScreen.innerHTML = "0";
          decimalAdded = false;
          break;
        case "=":
          inputScreen.innerHTML = equalTo(input);
          decimalAdded = false;
          break;
        case ".":
          if (!decimalAdded) {
            inputScreen.innerHTML += btnValue;
            decimalAdded = true;
          }
          break;
        case "+/-":
          inputScreen.innerHTML = -1 * input;
          break;
        case "%":
          let priya = 0.01 * equalTo(input);
          if (isFloat(priya)) {
            inputScreen.innerHTML = parseFloat(priya).toFixed(2);
          } else {
            inputScreen.innerHTML = priya;
          }
          break;
        case "+":
        case "-":
        case "×":
        case "÷":
          // Last char of string
          var lastChar = input[input.length - 1];

          // Only add operator if input is not empty and there is no operator at the last
          if (input != "" && operators.indexOf(lastChar) == -1)
            inputScreen.innerHTML += btnValue;
          // Allows minus if the string is empty. The first number could be under zero
          else if (input == "" && btnValue == "-")
            inputScreen.innerHTML += btnValue;

          // Allows to represent the last operation
          if (operators.indexOf(lastChar) > -1 && input.length > 1) {
            inputScreen.innerHTML = input.replace(/.$/, btnValue);
          }
          decimalAdded = false;
          break;
        default:
          if (inputScreen.innerHTML == "0") {
            inputScreen.innerHTML = "";
          }
          inputScreen.innerHTML += btnValue;
          decimalAdded = false;
          break;
      }
    });
  }
}
