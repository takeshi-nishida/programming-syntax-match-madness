import type { Problem } from "../../types/game";

// Level 4: 分割代入、アロー関数、スプレッド、三項演算子、デフォルト引数
export const modernProblems: Problem[] = [
  // 分割代入
  {
    id: "destructure-object",
    level: 4,
    pair: [
      { text: "const { a, b } = obj;" },
      { text: "const a = obj.a, b = obj.b;" },
    ],
  },
  {
    id: "destructure-array",
    level: 4,
    pair: [
      { text: "const [a, b] = arr;" },
      { text: "const a = arr[0], b = arr[1];" },
    ],
  },
  {
    id: "destructure-rename",
    level: 4,
    pair: [
      { text: "const { a: x } = obj;" },
      { text: "const x = obj.a;" },
    ],
  },
  {
    id: "destructure-default",
    level: 4,
    pair: [
      { text: "const { a = 0 } = obj;" },
      { text: "const a = obj.a ?? 0;" },
    ],
  },
  {
    id: "destructure-rest",
    level: 4,
    pair: [
      { text: "const [a, ...rest] = arr;" },
      { text: "const a = arr[0], rest = arr.slice(1);" },
    ],
  },
  {
    id: "destructure-param",
    level: 4,
    pair: [
      { text: "function f({ a, b }) { }" },
      { text: "function f(obj) { const a = obj.a, b = obj.b; }" },
    ],
  },

  // アロー関数
  {
    id: "arrow-function",
    level: 4,
    pair: [
      { text: "const f = (x) => x * 2;" },
      { text: "const f = function(x) { return x * 2; };" },
    ],
  },
  {
    id: "arrow-no-paren",
    level: 4,
    pair: [
      { text: "const f = x => x * 2;" },
      { text: "const f = (x) => { return x * 2; };" },
    ],
  },
  {
    id: "arrow-object-return",
    level: 4,
    pair: [
      { text: "const f = () => ({ a: 1 });" },
      { text: "const f = () => { return { a: 1 }; };" },
    ],
  },
  {
    id: "arrow-multiline",
    level: 4,
    pair: [
      { text: "x => { y(); return z; }" },
      { text: "function(x) { y(); return z; }" },
    ],
  },

  // スプレッド演算子
  {
    id: "spread-array",
    level: 4,
    pair: [
      { text: "[...arr1, ...arr2]" },
      { text: "arr1.concat(arr2)" },
    ],
  },
  {
    id: "spread-object",
    level: 4,
    pair: [
      { text: "{ ...obj1, ...obj2 }" },
      { text: "Object.assign({}, obj1, obj2)" },
    ],
  },
  {
    id: "spread-copy-array",
    level: 4,
    pair: [
      { text: "[...arr]" },
      { text: "arr.slice()" },
    ],
  },
  {
    id: "spread-copy-object",
    level: 4,
    pair: [
      { text: "{ ...obj }" },
      { text: "Object.assign({}, obj)" },
    ],
  },
  {
    id: "spread-push",
    level: 4,
    pair: [
      { text: "[...arr, x]" },
      { text: "arr.concat([x])" },
    ],
  },

  // 三項演算子
  {
    id: "ternary-basic",
    level: 4,
    pair: [
      { text: "x ? 'yes' : 'no'" },
      { text: "x ? 'yes' : 'no'" }, // if文バージョンは長すぎるので同じ形に
    ],
  },
  {
    id: "ternary-assign",
    level: 4,
    pair: [
      { text: "const r = a ? b : c;" },
      { text: "let r; if (a) { r = b; } else { r = c; }" },
    ],
  },

  // デフォルト引数
  {
    id: "default-param",
    level: 4,
    pair: [
      { text: "function f(x = 0) { }" },
      { text: "function f(x) { if (x === undefined) x = 0; }" },
    ],
  },
  {
    id: "default-param-or",
    level: 4,
    pair: [
      { text: "function f(x = 0) { }" },
      { text: "function f(x) { x = x ?? 0; }" },
    ],
  },

  // 短絡評価
  {
    id: "short-circuit-and",
    level: 4,
    pair: [
      { text: "a && fn()" },
      { text: "if (a) { fn(); }" },
    ],
  },
  {
    id: "short-circuit-or",
    level: 4,
    pair: [
      { text: "x = a || b" },
      { text: "x = a ? a : b" },
    ],
  },

  // 計算されたプロパティ
  {
    id: "computed-property",
    level: 4,
    pair: [
      { text: "{ [key]: value }" },
      { text: "let o = {}; o[key] = value;" },
    ],
  },

  // プロパティ短縮
  {
    id: "property-shorthand",
    level: 4,
    pair: [
      { text: "{ a, b }" },
      { text: "{ a: a, b: b }" },
    ],
  },

  // メソッド短縮
  {
    id: "method-shorthand",
    level: 4,
    pair: [
      { text: "{ fn() { } }" },
      { text: "{ fn: function() { } }" },
    ],
  },
];
