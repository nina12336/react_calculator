import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "normalize.css";
import "./style/app.css";

function App() {
  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState("");

  const updateCalculation = (value) => {
    setCalculation(calculation + value);
    console.log(calculation);
  };

  const clear = () => {
    setResult("");
    setCalculation("");
  };

  //符號優先權確認
  const priority = (target) => {
    if (target === "+" || target === "-") {
      return 1;
    }
    if (target === "×" || target === "÷") {
      return 2;
    } else {
      return 0;
    }
  };

  //數字上限判斷
  const resultLimit = (stack) => {
    let total = Number(stack.toString());
    if (total <= Math.pow(2, 32)) {
      setResult(total);
    } else {
      setResult("超過數字上限");
    }
  };

  // 後序計算
  const postfixCal = (postfix) => {
    let stack = [];
    postfix.forEach((el) => {
      if ("+-×÷".indexOf(el) === -1) {
        stack.push(el);
      } else {
        const last = Number(stack.pop());
        const penultimate = Number(stack.pop());
        let cal;
        switch (el) {
          case "+":
            cal = preciseCal(last, penultimate, "+");
            stack.push(cal);
            break;
          case "-":
            cal = preciseCal(penultimate, last, "-");
            stack.push(cal);
            break;
          case "×":
            cal = preciseCal(last, penultimate, "×");
            stack.push(cal);
            break;
          case "÷":
            cal = preciseCal(penultimate, last, "÷");
            stack.push(cal);
            break;
          default:
            break;
        }
      }
    });
    return resultLimit(stack);
  };

  //中序轉後序
  const toPostfix = (str) => {
    let numberArr = [];
    let operatorArr = [];
    let calculationArr = str.match(/[0-9.]+[0-9]+|[\+\-\×\÷]|\d+/g);
    // console.log(calculationArr);
    calculationArr.forEach((target) => {
      if ("+-×÷".indexOf(target) === -1) {
        numberArr.push(target);
      } else {
        while (
          operatorArr.length !== 0 &&
          priority(target) <= priority(operatorArr[operatorArr.length - 1])
        ) {
          numberArr.push(operatorArr.pop());
        }
        operatorArr.push(target);
      }
    });
    while (operatorArr.length !== 0) {
      numberArr.push(operatorArr.pop());
    }
    console.log("numberArr", numberArr);
    console.log("operatorArr", operatorArr);
    // return numberArr;
    return postfixCal(numberArr);
  };

  //解決JS小數計算的問題
  const preciseCal = (arg1, arg2, operator) => {
    const num1 = (arg1.toString().split(".")[1] || "").length;
    const num2 = (arg2.toString().split(".")[1] || "").length;
    const baseNum = Math.pow(10, Math.max(num1, num2));
    switch (operator) {
      case "+":
        return (arg1 * baseNum + arg2 * baseNum) / baseNum;
      case "-":
        return (arg1 * baseNum - arg2 * baseNum) / baseNum;
      case "×":
        return (arg1 * baseNum * arg2 * baseNum) / baseNum ** 2;
      case "÷":
        return (arg1 * baseNum) / (arg2 * baseNum);
    }
  };

  //產生數字鍵
  const createDigitBtn = () => {
    const digits = [];

    for (let i = 0; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalculation(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  // drag item
  // const ItemTypes = {
  //   CALCULATOR: "calculator",
  // };

  // const [{}, dragRef] = useDrag({ item: { type: ItemTypes.CALCULATOR } });

  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="calculator">
      <div className="showArea">
        <input
          type="text"
          placeholder="計算結果"
          value={result}
          readOnly
        ></input>
        <input
          className="calculation"
          type="text"
          placeholder="算式"
          value={calculation}
          readOnly
        ></input>
      </div>
      <div className="functionalButton">
        <button
          onClick={() => {
            updateCalculation("+");
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            updateCalculation("-");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            updateCalculation("×");
          }}
        >
          ×
        </button>
        <button
          onClick={() => {
            updateCalculation("÷");
          }}
        >
          ÷
        </button>
        <button
          onClick={() => {
            clear();
          }}
        >
          AC
        </button>
      </div>
      <div className="numberButton">
        {createDigitBtn()}
        <button
          onClick={() => {
            updateCalculation(".");
          }}
        >
          .
        </button>
        <button
          onClick={() => {
            toPostfix(calculation);
          }}
        >
          =
        </button>
      </div>
    </div>
    // </DndProvider>
  );
}

export default App;
