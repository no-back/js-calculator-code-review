class Operator {
  constructor(firstNumber, secondNumber) {
    this.firstNumber = +firstNumber;
    this.secondNumber = +secondNumber;
  }

  calculate() {
    return;
  }
}

export class Plus extends Operator {
  calculate() {
    return this.firstNumber + this.secondNumber;
  }
}

export class Minus extends Operator {
  calculate() {
    return this.firstNumber - this.secondNumber;
  }
}

export class Multiple extends Operator {
  calculate() {
    return this.firstNumber * this.secondNumber;
  }
}

export class Divide extends Operator {
  calculate() {
    return this.firstNumber / this.secondNumber;
  }
}
