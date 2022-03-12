const $ = (selector) => {
  return document.querySelector(selector);
};

function Calculator() {
  const $digits = $(".digits");
  const $operations = $(".operations");
  const $equalSign = $("#equal-sign");
  const $modifier = $(".modifier");
  const $total = $("#total");
  const operators = ["/", "X", "-", "+"];

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
      return alert("숫자는 세 자리까지만 입력 가능합니다!");
    }
    if ($total.textContent === "0") {
      $total.textContent = e.target.textContent;
      return;
    }
    total.textContent += e.target.textContent;
  };
  const isValidLength = () => {
    const displayValue = $total.textContent;
    const operator = displayValue.split("").find((v) => operators.includes(v));

    if (!operator) {
      return displayValue.length < 3;
    }
    return displayValue.split(operator)[1].length < 3;
  };

  const putOperator = (e) => {
    if (e.target.textContent === "=") {
      return;
    }

    if (!isAbleAddOperator()) {
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
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
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      e.preventDefault();
      return;
    }

    const displayValue = $total.textContent;
    const operator = displayValue.split("").find((v) => operators.includes(v));
    const operands = displayValue.split(operator);
    const operations = {
      "+": (a, b) => Number(a) + Number(b),
      "-": (a, b) => Number(a) - Number(b),
      X: (a, b) => Number(a) * Number(b),
      "/": (a, b) => Math.floor(Number(a) / Number(b)),
    };
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
