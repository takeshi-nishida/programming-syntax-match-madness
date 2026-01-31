import type { Problem } from "../../types/game";

// Level 2: DOM操作、イベント、コールバック
export const domProblems: Problem[] = [
  {
    id: "get-by-id",
    level: 2,
    pair: [
      { text: 'document.getElementById("x")' },
      { text: 'document.querySelector("#x")' },
    ],
  },
  {
    id: "get-by-class",
    level: 2,
    pair: [
      { text: 'document.getElementsByClassName("x")' },
      { text: 'document.querySelectorAll(".x")' },
    ],
  },
  {
    id: "event-onclick",
    level: 2,
    pair: [
      { text: "el.onclick = fn" },
      { text: 'el.addEventListener("click", fn)' },
    ],
  },
  {
    id: "innerhtml-textcontent",
    level: 2,
    pair: [
      { text: "el.textContent = str" },
      { text: "el.innerText = str" },
    ],
  },
  {
    id: "create-element",
    level: 2,
    pair: [
      { text: 'document.createElement("div")' },
      { text: "new HTMLDivElement()" },
    ],
  },
  {
    id: "classlist-add",
    level: 2,
    pair: [
      { text: 'el.classList.add("x")' },
      { text: 'el.className += " x"' },
    ],
  },
  {
    id: "classlist-contains",
    level: 2,
    pair: [
      { text: 'el.classList.contains("x")' },
      { text: 'el.className.includes("x")' },
    ],
  },
  {
    id: "set-attribute",
    level: 2,
    pair: [
      { text: 'el.setAttribute("id", "x")' },
      { text: 'el.id = "x"' },
    ],
  },
  {
    id: "parent-node",
    level: 2,
    pair: [
      { text: "el.parentNode" },
      { text: "el.parentElement" },
    ],
  },
  {
    id: "child-nodes",
    level: 2,
    pair: [
      { text: "el.children" },
      { text: "el.querySelectorAll(':scope > *')" },
    ],
  },
];
