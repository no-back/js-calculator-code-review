import Calculator from "./components/Calculator.js";

const displayValue = document.querySelector("#total");
const calculator = new Calculator(displayValue);

document.addEventListener("click", (e) => {
  switch (e.target.className) {
    case "digit":
      calculator.putNumber(e.target.textContent);
      break;
    case "operation":
      calculator.putOperator(e.target.textContent);
      break;
    case "modifier":
      calculator.clearDisplay();
      break;
    default:
      break;
  }
});
