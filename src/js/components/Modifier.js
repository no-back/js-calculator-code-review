import Display from "./Display.js";

class Modifier extends Display {
  constructor(button) {
    super(button);
    this.rendering();
  }

  rendering() {
    this.display.textContent = "0";
    this.reset();
  }

  reset() {
    this.setState({
      ...this.state,
      input: null,
      prevType: null,
      stack: [],
    });
  }
}

export default Modifier;
