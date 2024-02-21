import config from "./config.js";
import { ctx, ctxW, c, cW } from "./utils/canvas.js";
import { drawPot, drawTree } from "./utils/draw.js";
import { nextGen } from "./utils/nextGen.js";
import { Water } from "./utils/Water.js";
import { Server } from "./utils/server.js";
const scroll = document.getElementById("scroll");
const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const showBtn = document.getElementById("show");
const helpBtn = document.getElementById("help");
const server = new Server();
scroll.scrollTo(0, window.innerHeight * config.canvasHeight);

let mouse = false,
   showChat = true,
   growing = 0,
   lastGrow = 0,
   pointerId = Math.round(Math.random() * 100 * Math.random() * 100);

let tree = await server.getData("tree/plant");
server.exeOnChange("tree/grow", updateGrow);
server.exeOnChange("tree/plant", updateTree);
let water = [];

async function end() {
   mouse = false;
   await server.setData(`pointer/${pointerId}`, null);
}
addEventListener("mousedown", async () => (mouse = true));
addEventListener("mouseup", end);
addEventListener("mousemove", (e) => spray(e));
chat.addEventListener("submit", (event) => sendMsg(event));
showBtn.addEventListener("click", (event) => {
   document.getElementById("hideIcon").style.display = showChat
      ? "none"
      : "block";
   document.getElementById("showIcon").style.display = showChat
      ? "block"
      : "none";
   showChat = !showChat;
});
addEventListener("resize", (e) => resize(e));

function sendMsg(e) {
   e.preventDefault();
   input.value = "";
}

async function updateGrow() {
   growing = await server.getData("tree/grow");
   if (Math.round(growing * 10000) / 10000 == lastGrow) return;
   draw();
   lastGrow = Math.round(growing * 10000) / 10000;
}

async function updateTree() {
   tree = await server.getData("tree/plant");
   draw();
}

function draw() {
   ctx.reset();
   drawTree(tree, growing);
   drawPot();
}

async function animate() {
   const pointer = (await server.getData("pointer")) || {};

   ctxW.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight * config.canvasHeight
   );

   Object.values(pointer).forEach((el) => {
      let vx = +5 - Math.floor(Math.random() * 10);
      let vy = +5 - Math.floor(Math.random() * 10);
      water.push(new Water(el.x, el.y, vx, vy));
   });
   for (let i in water) {
      const el = water[i];
      el.update();
      el.draw();
      if (el.y > window.innerHeight * 5) water.splice(i, 1);
   }
   requestAnimationFrame(animate);
}

async function spray(e, mobile = false) {
   e.preventDefault();
   if (!mouse) return;
   if (mobile) {
      var touchLocation = e.targetTouches[0];
      await server.setData(`pointer/${pointerId}`, {
         x: touchLocation.pageX,
         y: touchLocation.clientY + scroll.scrollTop,
      });
   } else {
      await server.setData(`pointer/${pointerId}`, {
         x: e.pageX,
         y: e.clientY + scroll.scrollTop,
      });
   }

   if (growing + 1 / tree.length >= 1) {
      await server.setData("tree/grow", 0.1);
      await server.setData("tree/plant", nextGen(tree));
   } else await server.setData("tree/grow", growing + 0.001 / tree.length);
}

function resize(e) {
   c.height = window.innerHeight * 5;
   c.width = window.innerWidth;
   cW.height = window.innerHeight * 5;
   cW.width = window.innerWidth;
   draw();
}

animate();
