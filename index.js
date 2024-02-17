//===================================
// _____|IMPORT MODULE FILES| _____//
//===================================
import { ctxW } from "./utils/canvas.js";
import { drawTree } from "./utils/drawTree.js";
import { nextGen } from "./utils/nextGen.js";
import { Water } from "./utils/Water.js";
let scroll = document.getElementById("scroll");
scroll.scrollTo(0, window.innerHeight * 5);

let mouse = false;
let growing = 0;
let len = 10;
let tree = nextGen("F");
tree = nextGen(tree);
let width = 5;
let shrinking = 0.03;
let x = window.innerWidth / 2;
let y = window.innerHeight * 5;
drawTree(x, y, tree, len, growing, width, shrinking);

let water = [new Water(100, 100)];

function animate() {
   if (growing >= 1) {
      tree = nextGen(tree);
      growing = 0.1;
   }
   drawTree(x, y, tree, len, growing, width, shrinking);
   ctxW.clearRect(0, 0, window.innerWidth, window.innerHeight * 5);
   for (let i in water) {
      const el = water[i];
      el.update();
      el.draw();
      if (el.y > window.innerHeight * 5) water.splice(i, 1);
   }

   requestAnimationFrame(animate);
}
animate();

addEventListener("mousedown", () => (mouse = true));
addEventListener("mouseup", () => (mouse = false));
addEventListener("mousemove", (e) => {
   if (!mouse) return;
   growing += 1 / tree.length;
   growing = Math.floor(growing * 10000) / 10000;
   console.log(0.01 / tree.length);
   for (let i = 0; i < 2; i++) {
      let x = e.pageX;
      let y = e.clientY + scroll.scrollTop;
      let vx = +5 - Math.floor(Math.random() * 10);
      let vy = +5 - Math.floor(Math.random() * 10);
      water.push(new Water(x, y, vx, vy));
   }
});

addEventListener("resize", (event) => {
   canvas.height = window.innerHeight * 5;
   canvas.width = window.innerWidth;
   x = window.innerWidth / 2;
   y = window.innerHeight * 5;
   drawTree(x, y, tree, len, growing, width, shrinking);
});
