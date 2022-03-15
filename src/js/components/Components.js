export default class Components {
  constructor(displayElement, number) {
    this.number = number;
    this.operator = "";
    this.state = {
      firstNumber: "",
      secondNumber: "",
    };
    this.displayElement = displayElement;
  }

  setState(nextState) {
    this.state = nextState;
  }

  clearDisplay() {
    this.state = {
      firstNumber: "",
      secondNumber: "",
    };
    this.displayElement.textContent = "0";
    this.defaultState();
  }

  defaultState() {
    this.existFirstNumber = false;
    this.existSecondNumber = false;
    this.operator = "";
  }

  updateDisplay(
    value = this.state.firstNumber + this.operator + this.state.secondNumber
  ) {
    this.displayElement.textContent = value;
  }
}
