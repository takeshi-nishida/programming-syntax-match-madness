import type { Problem } from "../../types/game";

// Level 2-3: forEach, map, filter, find, includes, Object操作
export const arrayProblems: Problem[] = [
  // Level 2 - 基本的な配列操作
  {
    id: "foreach-for",
    level: 2,
    pair: [
      { text: "arr.forEach(fn)" },
      { text: "for (let item of arr) { fn(item); }" },
    ],
  },
  {
    id: "includes-indexof",
    level: 2,
    pair: [
      { text: "arr.includes(x)" },
      { text: "arr.indexOf(x) !== -1" },
    ],
  },
  {
    id: "string-includes",
    level: 2,
    pair: [
      { text: 'str.includes("a")' },
      { text: 'str.indexOf("a") >= 0' },
    ],
  },
  {
    id: "array-join",
    level: 2,
    pair: [
      { text: 'arr.join(", ")' },
      { text: "arr.reduce((a, b) => a + ', ' + b)" },
    ],
  },
  {
    id: "array-reverse",
    level: 2,
    pair: [
      { text: "arr.reverse()" },
      { text: "[...arr].sort(() => -1)" },
    ],
  },

  // Level 3 - 配列メソッド
  {
    id: "map-function",
    level: 3,
    pair: [
      { text: "arr.map(x => x * 2)" },
      { text: "arr.map(function(x) { return x * 2; })" },
    ],
  },
  {
    id: "filter-function",
    level: 3,
    pair: [
      { text: "arr.filter(x => x > 0)" },
      { text: "arr.filter(function(x) { return x > 0; })" },
    ],
  },
  {
    id: "find-filter",
    level: 3,
    pair: [
      { text: "arr.find(x => x.id === 1)" },
      { text: "arr.filter(x => x.id === 1)[0]" },
    ],
  },
  {
    id: "some-find",
    level: 3,
    pair: [
      { text: "arr.some(x => x > 0)" },
      { text: "arr.find(x => x > 0) !== undefined" },
    ],
  },
  {
    id: "every-some",
    level: 3,
    pair: [
      { text: "arr.every(x => x > 0)" },
      { text: "!arr.some(x => x <= 0)" },
    ],
  },
  {
    id: "flat-concat",
    level: 3,
    pair: [
      { text: "arr.flat()" },
      { text: "[].concat(...arr)" },
    ],
  },
  {
    id: "flatmap",
    level: 3,
    pair: [
      { text: "arr.flatMap(fn)" },
      { text: "arr.map(fn).flat()" },
    ],
  },

  // Level 3 - テンプレートリテラル
  {
    id: "template-literal",
    level: 3,
    pair: [
      { text: "`Hello, ${name}!`" },
      { text: '"Hello, " + name + "!"' },
    ],
  },
  {
    id: "template-multiline",
    level: 3,
    pair: [
      { text: "`line1\\nline2`" },
      { text: '"line1\\n" + "line2"' },
    ],
  },
  {
    id: "template-expression",
    level: 3,
    pair: [
      { text: "`${a + b}`" },
      { text: "String(a + b)" },
    ],
  },

  // Level 3 - Object操作
  {
    id: "object-keys",
    level: 3,
    pair: [
      { text: "Object.keys(obj)" },
      { text: "let k = []; for (let p in obj) k.push(p);" },
    ],
  },
  {
    id: "object-values",
    level: 3,
    pair: [
      { text: "Object.values(obj)" },
      { text: "Object.keys(obj).map(k => obj[k])" },
    ],
  },
  {
    id: "object-entries",
    level: 3,
    pair: [
      { text: "Object.entries(obj)" },
      { text: "Object.keys(obj).map(k => [k, obj[k]])" },
    ],
  },
  {
    id: "object-from-entries",
    level: 3,
    pair: [
      { text: "Object.fromEntries(arr)" },
      { text: "arr.reduce((o, [k, v]) => ({...o, [k]: v}), {})" },
    ],
  },
  {
    id: "object-has-own",
    level: 3,
    pair: [
      { text: "Object.hasOwn(obj, 'x')" },
      { text: "obj.hasOwnProperty('x')" },
    ],
  },
];
