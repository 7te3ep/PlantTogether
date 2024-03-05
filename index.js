import config from "./config.js";
import { ctx, ctxW, c, cW } from "./utils/canvas.js";
import { drawPot, drawTree } from "./utils/draw.js";
import { nextGen } from "./utils/nextGen.js";
import { Water } from "./utils/Water.js";
import { Server } from "./utils/server.js";
const scroll = document.getElementById("scroll");
const chat = document.getElementById("chatInput");
const input = document.getElementById("msg");
const showBtn = document.getElementById("show");
const helpBtn = document.getElementById("help");
const server = new Server();
scroll.scrollTo(0, window.innerHeight * config.canvasHeight);

let showChat = true,
   lastMsg = Date.now();

server.exeOnChange("tree/grow", draw);
server.exeOnChange("tree/plant", draw);
server.exeOnChange("chat", updateChat);

chat.addEventListener("submit", (event) => sendMsg(event));
showBtn.addEventListener("click", (event) => showBtnClick());
helpBtn.addEventListener("click", (e) => {
   window.open("help.html", "_blank");
});
addEventListener("resize", (e) => resize(e));

async function sendMsg(e) {
   e.preventDefault();
   if (input.value.length == 0) return;
   if (Date.now() - lastMsg < 1000) return;
   lastMsg = Date.now();
   await server.setData("lastMsg", lastMsg);
   const grow = await server.getData("tree/grow");
   const tree = await server.getData("tree/plant");
   const nextGrow = grow + 1 / tree.length;
   if (nextGrow >= 1) {
      await server.setData("tree/grow", 0.1);
      await server.setData("tree/plant", nextGen(tree));
   } else await server.setData("tree/grow", nextGrow);

   let chat = Object.values((await server.getData("chat")) || {});
   if (chat.length == 14) chat.pop();
   chat.unshift(input.value);
   await server.setData("chat", chat);
   input.value = "";
}

function showBtnClick() {
   document.getElementById("hideIcon").style.display = showChat
      ? "none"
      : "block";
   document.getElementById("showIcon").style.display = showChat
      ? "block"
      : "none";

   document.getElementById("chatArea").style.display = showChat
      ? "flex"
      : "none";
   showChat = !showChat;
}

async function draw() {
   const last = await server.getData("lastMsg");
   if (Date.now() - last > 86400000) {
      await server.setData("tree/grow", 0);
      await server.setData("tree/plant", "F");
   }

   ctx.reset();
   drawTree(
      await server.getData("tree/plant"),
      await server.getData("tree/grow")
   );
   drawPot();
}

async function updateChat() {
   let chat = document.getElementById("chatBox");
   chat.innerHTML = ``;
   Object.values((await server.getData("chat")) || {}).forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("msg");
      let text = document.createTextNode(el);
      div.appendChild(text);
      chat.appendChild(div);
   });
}

function resize(e) {
   c.height = window.innerHeight * 5;
   c.width = window.innerWidth;
   cW.height = window.innerHeight * 5;
   cW.width = window.innerWidth;
   scroll.scrollTo(0, window.innerHeight * config.canvasHeight);
   draw();
}
