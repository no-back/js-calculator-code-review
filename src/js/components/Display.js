class Display {
  constructor(button) {
    this.button = button;
    this.display = document.querySelector("#total");
    this.state = {
      prevType: null,
      operator: null,
      stack: [],
    };
    this.plus = 1;
    this.render();
    console.log(this.state);
  }
  
  setState(nextState) {
    this.state = nextState;
    console.log(this.state);
  }

  changeState(button) {
    this.display.textContent = button;
  }

  connectStates() {
    this.display.textContent += this.button.textContent;
  }

  render() {
    this.plus++;
    console.log(this.plus);
    // this.display.textContent =
    //   this.state.stack.length > 1 ? this.state.stack.join("") : 0;
  }
}

export default Display;
