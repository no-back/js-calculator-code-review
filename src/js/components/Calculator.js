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

}
