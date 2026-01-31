import type { Problem } from "../../types/game";

// Level 1-2: 基礎文法、変数、ループ、基本演算子
export const basicProblems: Problem[] = [
  // Level 1 - 基礎文法
  {
    id: "let-var",
    level: 1,
    pair: [
      { text: "let x = 5;" },
      { text: "var x = 5;" },
    ],
  },
  {
    id: "increment",
    level: 1,
    pair: [
      { text: "x++" },
      { text: "x = x + 1" },
    ],
  },
  {
    id: "decrement",
    level: 1,
    pair: [
      { text: "x--" },
      { text: "x = x - 1" },
    ],
  },
  {
    id: "add-assign",
    level: 1,
    pair: [
      { text: "x += 5" },
      { text: "x = x + 5" },
    ],
  },
  {
    id: "mult-assign",
    level: 1,
    pair: [
      { text: "x *= 2" },
      { text: "x = x * 2" },
    ],
  },
  {
    id: "string-concat",
    level: 1,
    pair: [
      { text: '"Hello " + name' },
      { text: '"Hello ".concat(name)' },
    ],
  },
  {
    id: "and-operator",
    level: 1,
    pair: [
      { text: "if (a && b) { }" },
      { text: "if (a) { if (b) { } }" },
    ],
  },
  {
    id: "not-operator",
    level: 1,
    pair: [
      { text: "if (!a) { }" },
      { text: "if (a === false) { }" },
    ],
  },
  {
    id: "strict-equal",
    level: 1,
    pair: [
      { text: "x === 5" },
      { text: "x == 5 && typeof x === 'number'" },
    ],
  },
  {
    id: "not-equal",
    level: 1,
    pair: [
      { text: "x !== 5" },
      { text: "!(x === 5)" },
    ],
  },

  // Level 2 - ループと基本パターン
  {
    id: "for-while",
    level: 2,
    pair: [
      { text: "for (let i = 0; i < 5; i++) { }" },
      { text: "let i = 0; while (i < 5) { i++; }" },
    ],
  },
  {
    id: "for-of-index",
    level: 2,
    pair: [
      { text: "for (let item of arr) { }" },
      { text: "for (let i = 0; i < arr.length; i++) { let item = arr[i]; }" },
    ],
  },
  {
    id: "array-push",
    level: 2,
    pair: [
      { text: "arr.push(x)" },
      { text: "arr[arr.length] = x" },
    ],
  },
  {
    id: "array-length-check",
    level: 2,
    pair: [
      { text: "arr.length > 0" },
      { text: "arr.length !== 0" },
    ],
  },
  {
    id: "array-empty-check",
    level: 2,
    pair: [
      { text: "arr.length === 0" },
      { text: "!arr.length" },
    ],
  },
  {
    id: "property-access",
    level: 2,
    pair: [
      { text: "obj.name" },
      { text: 'obj["name"]' },
    ],
  },
  {
    id: "property-dynamic",
    level: 2,
    pair: [
      { text: "obj[key]" },
      { text: "obj[`${key}`]" },
    ],
  },
  {
    id: "math-floor",
    level: 2,
    pair: [
      { text: "Math.floor(x)" },
      { text: "~~x" },
    ],
  },
  {
    id: "math-pow",
    level: 2,
    pair: [
      { text: "x ** 2" },
      { text: "Math.pow(x, 2)" },
    ],
  },
  {
    id: "string-to-number",
    level: 2,
    pair: [
      { text: "Number(str)" },
      { text: "+str" },
    ],
  },
];
