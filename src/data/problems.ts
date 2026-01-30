import type { Problem } from "../types/game";

// JavaScript 構文ペア問題（10問）
// 各問題は同じ意味を持つ2つの構文をペアにしている

export const PROBLEMS: Problem[] = [
  {
    id: "destructure-object",
    pair: [
      { text: "const { a, b } = obj;" },
      { text: "const a = obj.a, b = obj.b;" },
    ],
  },
  {
    id: "destructure-array",
    pair: [
      { text: "const [a, b] = arr;" },
      { text: "const a = arr[0], b = arr[1];" },
    ],
  },
  {
    id: "arrow-function",
    pair: [
      { text: "const f = (x) => x * 2;" },
      { text: "const f = function(x) { return x * 2; };" },
    ],
  },
  {
    id: "template-literal",
    pair: [
      { text: "`Hello, ${name}!`" },
      { text: "\"Hello, \" + name + \"!\"" },
    ],
  },
  {
    id: "spread-array",
    pair: [
      { text: "[...arr1, ...arr2]" },
      { text: "arr1.concat(arr2)" },
    ],
  },
  {
    id: "spread-object",
    pair: [
      { text: "{ ...obj1, ...obj2 }" },
      { text: "Object.assign({}, obj1, obj2)" },
    ],
  },
  {
    id: "default-param",
    pair: [
      { text: "function f(x = 0) {}" },
      { text: "function f(x) { x = x || 0; }" },
    ],
  },
  {
    id: "nullish-coalescing",
    pair: [
      { text: "a ?? b" },
      { text: "a !== null && a !== undefined ? a : b" },
    ],
  },
  {
    id: "optional-chaining",
    pair: [
      { text: "obj?.prop?.value" },
      { text: "obj && obj.prop && obj.prop.value" },
    ],
  },
  {
    id: "shorthand-property",
    pair: [
      { text: "{ name, age }" },
      { text: "{ name: name, age: age }" },
    ],
  },
];
