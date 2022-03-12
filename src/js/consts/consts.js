export const $ = (selector) => {
  return document.querySelector(selector);
};

export const OPERATORS = ["/", "X", "-", "+"];

export const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  X: (a, b) => a * b,
  "/": (a, b) => Math.floor(a / b),
};

export const MESSAGE = {
  WARN_MAX_NUMBER: "숫자는 세 자리까지만 입력 가능합니다!",
  WARN_SEQUENCE: "숫자를 먼저 입력한 후 연산자를 입력해주세요!",
};

export const MAX_DIGIT_LENGTH = 3;
