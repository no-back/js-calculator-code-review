import { MESSAGE } from "../utils/const.js";
import { OPERATE, OPERATOR } from "../utils/math.js";
import Components from "./Components.js";

export default class Calculator extends Components {
  putNumber(number) {
    if (!this.isValidLength()) {
      return alert(MESSAGE.LIMITED_NUMBER_WARNING_MESSAGE);
    }

    if (this.displayElement.textContent === "0") {
      if (number === "0") return;
    }
    if (!this.existFirstNumber) {
      this.setState({
        ...this.state,
        firstNumber: this.state.firstNumber + number,
      });
      this.updateDisplay();
      return;
    }

    this.setState({
      ...this.state,
      secondNumber: this.state.secondNumber + number,
    });
    this.existSecondNumber = true;
    this.updateDisplay();
    return;
  }

  putOperator(operator) {
    if (operator === "=") {
      if (!this.operator) {
        alert(MESSAGE.OPERATOR_WARNING_MESSAGE);
        return;
      }
      if (!this.existSecondNumber) {
        alert(MESSAGE.NEED_SECOND_NUMBER_MESSAGE);
        return;
      }
      return this.calculate();
    }

    if (this.displayElement.textContent === "0")
      this.setState({ ...this.state, firstNumber: "0" });
    this.operator = operator;
    this.existFirstNumber = true;

    this.updateDisplay();
  }

  isValidLength() {
    if (!this.existFirstNumber) {
      if (this.state.firstNumber.length >= "3") {
        return false;
      }
    }

    if (this.state.secondNumber.length >= "3") {
      return false;
    }
    return true;
  }

  calculate() {
    this.value = OPERATE[OPERATOR[this.operator]](
      +this.state.firstNumber,
      +this.state.secondNumber
    );
    this.updateDisplay(this.value);
    this.setState({ ...this.state, firstNumber: this.value, secondNumber: "" });
    this.defaultState();
  }



  
}
