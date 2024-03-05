import config from "./config.js";
import pool from "./pool.js";
import { ctx, ctxW, c, cW } from "./utils/canvas.js";
import { drawPot, drawTree } from "./utils/draw.js";
import { nextGen } from "./utils/nextGen.js";
const scroll = document.getElementById("scroll");
const growEl = document.getElementById("grow");
const genEl = document.getElementById("gen");
growEl.value = 1;
genEl.value = 5;

scroll.scrollTo(0, window.innerHeight * config.canvasHeight);

let grow = 1;
let tree = "F";
genFrules();

for (let i = 0; i < genEl.value; i++) {
   tree = nextGen(tree);
}
draw();

growEl.addEventListener("change", (e) => {
   grow = growEl.value;
   draw();
});

genEl.addEventListener("change", (e) => {
   tree = "F";
   tree = nextGen(tree);
   for (let i = 0; i < genEl.value; i++) {
      tree = nextGen(tree);
   }
   draw();
});

addEventListener("resize", (e) => resize(e));

function draw() {
   ctx.reset();
   drawTree(tree, grow);
   drawPot();
}

function resize(e) {
   c.height = window.innerHeight * 5;
   c.width = window.innerWidth;
   cW.height = window.innerHeight * 5;
   cW.width = window.innerWidth;
   scroll.scrollTo(0, window.innerHeight * config.canvasHeight);
   draw();
}

function genFrules() {
   let probs = [];
   for (let i = 0; i < pool.rules.F.length; i++) {
      probs.push(Math.random());
   }
   const sum = probs.reduce((curr, stock) => (stock += curr), 0);
   probs = probs.map((a) => a * (1 / sum));
   for (const i in pool.rules.F) {
      pool.rules.F[i]["prob"] = probs[i];
   }
}
