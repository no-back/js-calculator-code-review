export const OPERATOR = {
  "+": "PLUS",
  "-": "SUBTRACT",
  X: "MULTIPLY",
  "/": "DIVIDE",
};

export const operate = {
  PLUS(first, second) {
    return first + second;
  },
  SUBTRACT(first, second) {
    return first - second;
  },
  MULTIPLY(first, second) {
    return first * second;
  },
  DIVIDE(first, second) {
    return Math.floor(first / second);
  },
};
