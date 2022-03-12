import {
  $,
  OPERATORS,
  operations,
  MESSAGE,
  MAX_DIGIT_LENGTH,
} from "./consts/consts.js";

function Calculator() {
  const $digits = $(".digits");
  const $operations = $(".operations");
  const $equalSign = $("#equal-sign");
  const $modifier = $(".modifier");
  const $total = $("#total");

  this.init = () => {
    initEventHandlers();
  };

  const initEventHandlers = () => {
    $digits.addEventListener("click", putNumber);
    $operations.addEventListener("click", putOperator);
    $equalSign.addEventListener("click", putResult);
    $modifier.addEventListener("click", clearDisplay);
  };

  const putNumber = (e) => {
    if (!isValidLength()) {
      return alert(MESSAGE.WARN_MAX_NUMBER);
    }
    if ($total.textContent === "0") {
      $total.textContent = e.target.textContent;
      return;
    }
    total.textContent += e.target.textContent;
  };

  const isValidLength = () => {
    const displayValue = $total.textContent;
    const operator = displayValue.split("").find((v) => OPERATORS.includes(v));
    const operands = displayValue.split(operator);

    if (!operator) {
      return displayValue.length < MAX_DIGIT_LENGTH;
    }
    return operands[1].length < MAX_DIGIT_LENGTH;
  };

  const putOperator = (e) => {
    if (e.target.textContent === "=") {
      return;
    }

    if (!isAbleAddOperator()) {
      alert(MESSAGE.WARN_SEQUENCE);
      e.preventDefault();
      return;
    }

    $total.textContent += e.target.textContent;
  };

  const isAbleAddOperator = () => {
    const displayValue = $total.textContent;
    if (displayValue === "0") {
      return false;
    }
    const lastValue = displayValue[displayValue.length - 1];
    return !isNaN(Number(lastValue));
  };

  const putResult = (e) => {
    if (!isAbleAddOperator()) {
      alert(MESSAGE.WARN_SEQUENCE);
      e.preventDefault();
      return;
    }

    const displayValue = $total.textContent;
    const operator = displayValue.split("").find((v) => OPERATORS.includes(v));
    const operands = displayValue.split(operator);
    if (operands.length === 1) {
      return;
    }
    $total.textContent = operations[operator](
      Number(operands[0]),
      Number(operands[1])
    );
  };

  const clearDisplay = () => {
    $total.textContent = "0";
  };
}

const calculator = new Calculator();
calculator.init();
