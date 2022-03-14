import { OPERATORS, MESSAGE, MAXIMUM_DIGITS_LENGTH } from "../utils/const.js";
import { operate, OPERATOR } from "../utils/math.js";

export default class Calculator {
  constructor(displayElement) {
    this.operator = "";
    this.state = {
      firstNum: "",
      secondNum: "",
    };
    this.displayElement = displayElement;
    this.defaultState();
  }

  setState(nextState) {
    this.state = nextState;
  }
  putNumber(number) {
    if (!this.isValidLength()) {
      return alert(MESSAGE.LIMITED_NUMBER_WARNING_MESSAGE);
    }

    if (this.displayElement.textContent === "0") {
      if (number === "0") return;
    }
    this.operatorCheck = false;
    if (!this.isLeftNum) {
      this.setState({ ...this.state, firstNum: this.state.firstNum + number });
      this.updateDisplay();
      return;
    }

    this.setState({
      ...this.state,
      secondNum: this.state.secondNum + number,
    });
    this.isRightNum = true;
    this.updateDisplay();
    return;
  }

  putOperator(operator) {
    if (this.operator && !this.isRightNum) {
      alert("두 번째 숫자를 입력해 주세요.");
      return;
    }

    if (operator === "=") {
      if (this.isRightNum) return this.calculate();
      return;
    }
    if (this.displayElement.textContent === "0")
      this.setState({ ...this.state, firstNum: "0" });
    this.operator = operator;
    this.isLeftNum = true;

    this.updateDisplay();
  }

  isValidLength() {
    if (!this.isLeftNum) {
      if (this.state.firstNum.length >= "3") {
        return false;
      }
    }

    if (this.state.secondNum.length >= "3") {
      return false;
    }
    return true;
  }

  calculate() {
    this.modifierCheck = true;
    this.value = operate[OPERATOR[this.operator]](
      +this.state.firstNum,
      +this.state.secondNum
    );
    console.log(this.value);

    this.updateDisplay(this.value);
    this.setState({ ...this.state, firstNum: this.value, secondNum: "" });
    this.defaultState();
  }

  clearDisplay() {
    this.state = {
      firstNum: "",
      secondNum: "",
    };
    this.displayElement.textContent = "0";
    this.defaultState();
  }

  defaultState() {
    this.operatorCheck = true;
    this.modifierCheck = false;
    this.isLeftNum = false;
    this.isRightNum = false;
    this.operator = "";
  }

  updateDisplay(
    value = this.state.firstNum + this.operator + this.state.secondNum
  ) {
    this.displayElement.textContent = value;
  }
}
