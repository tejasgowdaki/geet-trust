// // const calculator = {
// //   num: 0,
// //   sum: (x) => {
// //     this.num += x;
// //     return this;
// //   },
// //   subtract: (x) => {
// //     this.num -= x;
// //     return this;
// //   },
// //   multiply: (x) => {
// //     this.num = this.num * x;
// //     return this;
// //   },
// //   result: () => this.num,
// // };

// // console.log(calculator.result());

// class Calculator {
//   constructor() {
//     this.num = 0;
//   }

//   sum(...array) {
//     this.num = 0;
//     this.num = array.reduce((sum, n) => (sum += n), this.num);
//     return this;
//   }

//   subtract(x) {
//     this.num -= x;
//     return this;
//   }

//   multiply(x) {
//     this.num = this.num * x;
//     return this;
//   }

//   result() {
//     return this.num;
//   }
// }
// const calc = new Calculator();

// console.log(calc.sum(23).subtract(3).multiply(2).result());
// console.log(calc.sum(10, 30).subtract(15).multiply(6).result());
// console.log(calc.sum(10, 10, 3, 5).multiply(2).subtract(5).result());
// console.log(calc.sum(10, 10, 3, 5).result());

// // calculator.sum(23).subtract(3).multiply(2).result() should output 40
// // calculator.sum(10, 30).subtract(15).multiply(6).result() should output 150
// // calculator.sum(10, 10, 3, 5).multiply(2).subtract(5).result() should output 51
// // calculator.sum(10, 10, 3, 5).result() should output 28

// class Snapshot {
//   constructor(value) {
//     this.value = [...value];
//   }

//   restore() {
//     return [...this.value];
//   }
// }

// var array = [1, 2];
// var snap = new Snapshot(array);
// array[0] = 3;
// array = snap.restore();
// console.log(array.join()); //It should log "1,2"
// array.push(4);
// array = snap.restore();
// console.log(array.join()); //It should log "1,2"

// // JS proxy

// function* loop(array) {
//   array.forEach((element) => {
//     console.log(element);
//     yield;
//   });
// }

// loop([1, 2, 3, 4]).next();

// // Can you implement a function which can be called like below;

// // sum(1)(2)(3)(4)... and output must be the sum of all parameters passed.

// // some examples,
// // for sum(1)(2)(3)() output must be 6.
// // for sum(2)(4)(5)(10)() output must be 21.

// const add = (a, b) => {
//   return a + b;
// };

// const sum = (x) => {
//   if (x) {
//     add(x);
//   }
// };

// console.log(sum(1)(2)(3)());

// const isParanthesisMatch = (str) => {
//   const openBraces = [];

//   const braces = str.split("");

//   let isMatch = true;

//   for (const bracket of braces) {
//     if (!isMatch) return isMatch;

//     let lastBracket = null;

//     switch (bracket) {
//       case "{":
//       case "(":
//       case "[":
//         openBraces.push(bracket);

//         break;
//       case "}":
//         lastBracket = openBraces.pop();
//         isMatch = lastBracket === "{";
//         break;
//       case ")":
//         lastBracket = openBraces.pop();
//         isMatch = lastBracket === "(";
//         break;
//       case "]":
//         lastBracket = openBraces.pop();
//         isMatch = lastBracket === "[";
//         break;
//     }
//   }

//   return isMatch;
// };

// console.log(isParanthesisMatch("{({[]})}[()]{}"));

// function curry(f) {
//   // curry(f) does the currying transform
//   return function (a) {
//     return function (b) {
//       return f(a, b);
//     };
//   };
// }

// function sum(a, b) {
//   return a + b;
// }

// let curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(3)); // 3

function sum(numberOne) {
  var count = numberOne;
  return function by(numberTwo) {
    if (numberTwo === undefined) {
      return count;
    } else {
      count += numberTwo;
      return by;
    }
  };
}
console.log(sum(1)(4)(66)(35)(4)());
