/* 
- [ ] 2개의 숫자에 대해 덧셈이 가능하다.
- [ ] 2개의 숫자에 대해 뺄셈이 가능하다.
- [ ] 2개의 숫자에 대해 곱셈이 가능하다.
- [ ] 2개의 숫자에 대해 나눗셈이 가능하다.
- [ ] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
- [ ] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
- [ ] 계산 결과를 표현할 때 소수점 이하는 버림한다.
*/

const { linkSync } = require("fs");

const OPERATOR_WARNING_MESSAGE = "숫자를 먼저 입력한 후 연산자를 입력해주세요!";
const LIMITED_NUMBER_WARNING_MESSAGE = "숫자는 세 자리까지만 입력 가능합니다!";
describe("Calculator Application Test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "5");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("-").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "1");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("*").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "6");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.get(".digit").contains("4").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "2");
  });
  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("1").click();
    cy.get(".modifier").contains("AC").click();
    cy.get("#total").should("have.text", "0");
  });
  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".digit").contains("4").click();
    cy.get("#total").should("have.text", "123").and("have.length", 3);
  });
  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "0");
  });
});

describe("Calculator Alert Test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });
  it("숫자를 입력하지 않고 연산자를 입력할 경우 경고 메시지를 띄운다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);

    cy.get(".operation")
      .contains("/")
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(OPERATOR_WARNING_MESSAGE);
      });
  });

  it("연산자 입력 경고 메시지를 확인한다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);

    cy.get(".operation")
      .contains("/")
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(OPERATOR_WARNING_MESSAGE);
      });
  });

  it("연산자를 연속해서 입력받을 경우 경고 메시지를 띄운다. ", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);

    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("/").click();
    cy.get(".operation")
      .contains("*")
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(OPERATOR_WARNING_MESSAGE);
      });
  });

  it("숫자를 4자리 이상 입력할 경우 경고 메시지를 띄운다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".digit")
      .contains("4")
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          LIMITED_NUMBER_WARNING_MESSAGE
        );
      });
  });

  it("숫자 4자리 이상 입력 경고 메시지를 확인한다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".digit")
      .contains("4")
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.be.equal(LIMITED_NUMBER_WARNING_MESSAGE);
      });
  });

  it("연산자 입력 후 숫자를 4자리 이상 입력할 경우 경고 메시지를 띄운다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".digit")
      .contains("4")
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          LIMITED_NUMBER_WARNING_MESSAGE
        );
      });
  });
});
