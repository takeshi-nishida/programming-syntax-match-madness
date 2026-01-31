import type { Problem } from "../../types/game";

// Level 5: async/await, オプショナルチェーン, Null合体, Promise
export const asyncProblems: Problem[] = [
  // async/await
  {
    id: "async-await-basic",
    level: 5,
    pair: [
      { text: "const data = await fetch(url);" },
      { text: "fetch(url).then(data => { ... });" },
    ],
  },
  {
    id: "async-function",
    level: 5,
    pair: [
      { text: "async function f() { }" },
      { text: "function f() { return Promise.resolve(); }" },
    ],
  },
  {
    id: "async-arrow",
    level: 5,
    pair: [
      { text: "const f = async () => { };" },
      { text: "const f = () => Promise.resolve();" },
    ],
  },
  {
    id: "await-json",
    level: 5,
    pair: [
      { text: "const json = await res.json();" },
      { text: "res.json().then(json => { ... });" },
    ],
  },
  {
    id: "try-catch-async",
    level: 5,
    pair: [
      { text: "try { await f(); } catch (e) { }" },
      { text: "f().catch(e => { });" },
    ],
  },

  // Promise
  {
    id: "promise-all",
    level: 5,
    pair: [
      { text: "await Promise.all([p1, p2])" },
      { text: "const r1 = await p1; const r2 = await p2;" },
    ],
  },
  {
    id: "promise-resolve",
    level: 5,
    pair: [
      { text: "Promise.resolve(x)" },
      { text: "new Promise(r => r(x))" },
    ],
  },
  {
    id: "promise-reject",
    level: 5,
    pair: [
      { text: "Promise.reject(e)" },
      { text: "new Promise((_, r) => r(e))" },
    ],
  },
  {
    id: "promise-finally",
    level: 5,
    pair: [
      { text: "p.finally(fn)" },
      { text: "p.then(fn, fn)" },
    ],
  },

  // オプショナルチェーン
  {
    id: "optional-chain",
    level: 5,
    pair: [
      { text: "obj?.a?.b" },
      { text: "obj && obj.a && obj.a.b" },
    ],
  },
  {
    id: "optional-call",
    level: 5,
    pair: [
      { text: "fn?.()" },
      { text: "fn && fn()" },
    ],
  },
  {
    id: "optional-index",
    level: 5,
    pair: [
      { text: "arr?.[0]" },
      { text: "arr && arr[0]" },
    ],
  },

  // Null合体
  {
    id: "nullish-coalescing",
    level: 5,
    pair: [
      { text: "a ?? b" },
      { text: "a !== null && a !== undefined ? a : b" },
    ],
  },
  {
    id: "nullish-assign",
    level: 5,
    pair: [
      { text: "x ??= y" },
      { text: "x = x ?? y" },
    ],
  },
  {
    id: "or-vs-nullish",
    level: 5,
    pair: [
      { text: "a ?? b" },
      { text: "(a !== null && a !== void 0) ? a : b" },
    ],
  },

  // その他上級
  {
    id: "logical-and-assign",
    level: 5,
    pair: [
      { text: "x &&= y" },
      { text: "x = x && y" },
    ],
  },
  {
    id: "logical-or-assign",
    level: 5,
    pair: [
      { text: "x ||= y" },
      { text: "x = x || y" },
    ],
  },
  {
    id: "at-method",
    level: 5,
    pair: [
      { text: "arr.at(-1)" },
      { text: "arr[arr.length - 1]" },
    ],
  },
  {
    id: "structuredclone",
    level: 5,
    pair: [
      { text: "structuredClone(obj)" },
      { text: "JSON.parse(JSON.stringify(obj))" },
    ],
  },
];
