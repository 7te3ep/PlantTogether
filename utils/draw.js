import config from "../config.js";
import { ctx } from "./canvas.js";
import pool from "../pool.js";

let theme = pool.themes[Math.floor(Math.random() * pool.themes.length)];
let shape = pool.shapes[Math.floor(Math.random() * pool.shapes.length)];

export function drawTree(plant, grow) {
   ctx.resetTransform();
   ctx.lineWidth = config.tree.width;
   ctx.translate(
      window.innerWidth - window.innerWidth / config.x,
      window.innerHeight * config.canvasHeight - window.innerWidth / 6 - 20
   );
   let leafIndex = 1;
   let isGrowing = false;
   const growingLen = config.tree.len * grow;
   for (var i = 0; i < plant.length; i++) {
      const symb = plant[i];
      if (ctx.lineWidth > 3) ctx.lineWidth -= config.tree.shrinking;
      switch (symb) {
         case "F":
            if (isGrowing) drawBranch(growingLen);
            else drawBranch(0);
            break;

         case "-":
            ctx.rotate((config.tree.angle * Math.PI) / 180);
            break;

         case "+":
            ctx.rotate((-config.tree.angle * Math.PI) / 180);
            break;

         case "[":
            ctx.save();
            break;

         case "]":
            leafIndex = leafIndex == theme.length - 1 ? 1 : leafIndex + 1;
            if (isGrowing) drawLeaves(leafIndex, grow);
            else drawLeaves(leafIndex);

            ctx.restore();
            break;

         case "(":
            isGrowing = true;
            break;

         case ")":
            isGrowing = false;
            break;

         case "B":
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
            break;

         case "R":
            ctx.fillStyle = "pink";
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i <= 3; i++) {
               ctx.rotate(90);
               ctx.ellipse(0, 0, 5, 10, Math.PI / 4, 0, 2 * Math.PI);
            }
            ctx.fill();
            ctx.restore();
      }
   }
}

function drawLeaves(i, grow = 1) {
   const size = config.tree.len * grow;

   ctx.save();
   ctx.globalAlpha = 0.8;
   ctx.fillStyle = theme[i];
   ctx.scale(size / 2, size);
   shape(ctx);
   ctx.fill();
   ctx.restore();
}

function drawBlob() {
   ctx.beginPath();
   ctx.moveTo(0, 0);
   ctx.quadraticCurveTo(3, -3, 0, -4);
   ctx.quadraticCurveTo(-3, -1, 0, 0);
   //ctx.quadraticCurveTo(0, 0, 0.5, -0.5);
   ctx.closePath();
}

function drawBranch(growingLen = config.tree.len) {
   ctx.beginPath();
   ctx.strokeStyle = theme[0];
   ctx.moveTo(0, 0);
   ctx.lineTo(0, -growingLen);
   ctx.stroke();
   ctx.translate(0, -growingLen + 1);
}

export function drawPot() {
   let size = window.innerWidth / 6;
   ctx.resetTransform();

   ctx.save();
   ctx.translate(0, window.innerHeight * config.canvasHeight - size / 2);
   ctx.fillStyle = "#9adc7f";
   ctx.fillRect(0, 0, window.innerWidth, size / 2);
   ctx.restore();

   ctx.save();
   ctx.translate(
      window.innerWidth - window.innerWidth / config.x - size / 2,
      window.innerHeight * config.canvasHeight - 20
   );
   ctx.fillStyle = "#b05923";
   ctx.scale(size, size);
   ctx.beginPath();
   ctx.moveTo(0, 0);
   ctx.lineTo(0.9, 0);
   ctx.lineTo(1, -1);
   ctx.lineTo(0, -1);
   ctx.lineTo(0.1, 0);
   ctx.closePath();
   ctx.fill();

   ctx.fillStyle = "#7a3f1b";
   ctx.beginPath();
   ctx.moveTo(0, -0.8);
   ctx.lineTo(1.08, -0.8);
   ctx.lineTo(1.08, -1);
   ctx.lineTo(-0.08, -1);
   ctx.lineTo(-0.08, -0.8);
   ctx.closePath();
   ctx.fill();
   ctx.restore();
}
