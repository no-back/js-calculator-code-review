describe("calculator-test", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "3");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("-").click();
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "1");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("X").click();
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "2");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "2");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".modifier").contains("AC").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".digit").contains("4").click();
    cy.get("#total").should("have.text", "123");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", "0");
  });
});

describe("calculator-test-2", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("숫자버튼을 클릭했을 때 해당 숫자를 디스플레이에 표시한다.", () => {
    cy.get("#total").then(() => {
      cy.get(".digit").contains("2").click();
      cy.get("#total").should("have.text", "2");
    });
  });

  it("숫자버튼 입력 후 연산자를 클릭했을 때 해당 연산자를 디스플레이에 표시한다.", () => {
    cy.get("#total").then(() => {
      cy.get(".digit").contains("2").click();
      cy.get(".operation").contains("/").click();
      cy.get("#total").should("have.text", "2/");
    });
  });

  it("네자리 이상의 숫자 입력을 시도했을 경우 경고메세지를 띄운다.", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#total").then(() => {
      for (let i = 0; i < 3; i++) {
        cy.get(".digits").contains("1").click(); // "111"
      }
      cy.get(".digits")
        .contains("1")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "숫자는 세 자리까지만 입력 가능합니다!"
          );
        });
      cy.get(".operations").contains("/").click();
      for (let i = 0; i < 3; i++) {
        cy.get(".digits").contains("1").click();
      }
      cy.get(".digits")
        .contains("1")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "숫자는 세 자리까지만 입력 가능합니다!"
          );
        });

      cy.get("#total").should("have.text", "111/111");
    });
  });

  it("숫자를 입력받지 않았을 때 연산자를 클릭하면 경고메세지를 띄운다.", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#total").then(() => {
      cy.get(".operation")
        .contains("=")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "숫자를 먼저 입력한 후 연산자를 입력해주세요!"
          );
        });

      cy.get(".digit").contains("1").click();
      cy.get(".operations").contains("/").click();
      cy.get(".operations")
        .contains("/")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "숫자를 먼저 입력한 후 연산자를 입력해주세요!"
          );
        });
    });
  });
});

// 구현 기능 목록
//  - [x] 숫자버튼을 클릭했을 때 해당 숫자를 디스플레이에 표시한다.
//  > - [x] 2을 클릭하면 2이 디스플레이에 표시되는지 테스트 한다.

//  - [x] 숫자버튼 입력 후 연산자를 클릭했을 때 해당 연산자를 디스플레이에 표시한다.
//  > - [x] 1을 클릭하고 '/'을 클릭했을 때 디스플레이에 '1/'이 표시되는지 테스트 한다.

//  - [x] 네자리 이상의 숫자 입력을 시도했을 경우 경고메세지를 띄운다.
// > - [x] '1111'을 순서대로 클릭했을 때 alert('숫자는 세 자리까지만 입력 가능합니다!')가 뜨는지 테스트 한다.
// > - [x] (이어서)'/1111'을 순서대로 클릭했을 때 alert('숫자는 세 자리까지만 입력 가능합니다!')가 뜨는지 테스트 한다.

// - [x] 숫자를 입력받지 않았을 때 연산자를 클릭하면 경고메세지를 띄운다.
// > - [x] 초기화면에서 '/'을 클릭했을 때 alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')가 뜨는지 테스트한다.
// > - [x] '1//'를 순서대로 클릭했을 때 alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')가 뜨는지 테스트한다.
