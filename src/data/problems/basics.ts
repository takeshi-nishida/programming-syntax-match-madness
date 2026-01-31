import type { Problem } from "../../types/game";

/**
 * Level 1-2: 基礎文法、変数、ループ、基本演算子
 *
 * 規約: pair[0] = モダン/簡潔な書き方（左に表示）
 *       pair[1] = 従来/冗長な書き方（右に表示）
 */
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
      { text: "if (a && b) {\n  // ...\n}" },
      { text: "if (a) {\n  if (b) { }\n}" },
    ],
  },
  {
    id: "not-operator",
    level: 1,
    pair: [
      { text: "if (!a) {\n  // ...\n}" },
      { text: "if (a === false) {\n  // ...\n}" },
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
      { text: "for (let i = 0; i < 5; i++) {\n  // ...\n}" },
      { text: "let i = 0;\nwhile (i < 5) {\n  i++;\n}" },
    ],
  },
  {
    id: "for-of-index",
    level: 2,
    pair: [
      { text: "for (let item of arr) {\n  // ...\n}" },
      { text: "for (let i = 0; i < arr.length; i++) {\n  let item = arr[i];\n}" },
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
