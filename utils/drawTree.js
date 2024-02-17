import { ctx } from "./canvas.js";

function drawLeaves(len, i) {
   const colors = ["#337B47", "#5DC939", "#40B225", "#077F20"];
   const size = len;
   ctx.save();
   ctx.globalAlpha = 0.8;
   ctx.fillStyle = colors[i];
   ctx.scale(size / 2, size);
   ctx.beginPath();
   ctx.moveTo(0, 0);
   ctx.lineTo(1, -1);
   ctx.lineTo(0, -4);
   ctx.lineTo(-1, -1);
   ctx.lineTo(0, 0);
   ctx.closePath();
   ctx.fill();
   ctx.restore();
}

function drawBranch(len) {
   ctx.beginPath();
   ctx.strokeStyle = "#5FC73D";
   ctx.moveTo(0, 0);
   ctx.lineTo(0, -len);
   ctx.stroke();
   ctx.translate(0, -len + 1);
}

function drawFruit() {}

export function drawTree(x, y, plant, len, grow, width, shrinking) {
   ctx.reset();
   ctx.lineWidth = width;
   ctx.translate(x, y);
   let leafIndex = 0;
   let isGrowing = false;
   const growingLen = len * grow;
   for (var i = 0; i < plant.length; i++) {
      const symb = plant[i];
      if (ctx.lineWidth > 3) ctx.lineWidth -= shrinking;
      switch (symb) {
         case "F":
            if (isGrowing) drawBranch(growingLen);
            else drawBranch(len);
            break;

         case "A":
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
            break;

         case "-":
            ctx.rotate((25 * Math.PI) / 180);
            break;

         case "+":
            ctx.rotate((-25 * Math.PI) / 180);
            break;

         case "<":
            ctx.rotate((-3 * Math.PI) / 180);
            break;

         case ">":
            ctx.rotate((3 * Math.PI) / 180);
            break;

         case ">":
            len = len * 1;
            ctx.lineWidth = width;
            break;

         case "[":
            ctx.save();
            break;

         case "]":
            if (isGrowing) drawLeaves(growingLen, leafIndex);
            else drawLeaves(len, leafIndex);
            leafIndex = leafIndex == 3 ? 0 : leafIndex + 1;
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
            ctx.arc(0, 0, 10, 0, 2 * Math.PI);
            ctx.fill();
            break;
      }
   }
}
