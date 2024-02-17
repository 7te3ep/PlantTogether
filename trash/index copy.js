//===================================
// _____|IMPORT MODULE FILES| _____//
//===================================
let canvas = document.getElementById("canvas");
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
addEventListener("resize", (event) => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   drawTree(
      window.innerWidth / 2,
      1050,
      taille,
      baseAngle,
      baseWidthBranch,
      color1,
      color2
   );
});

let curve = 15;
let curve1 = 15;
let baseMinLenBranch = 10;
let baseWidthBranch = 40;
let baseAngle = 0;
let taille = 250;
let color1 = "brown";
let color2 = "green";

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
   ctx.beginPath();
   ctx.save();
   ctx.strokeStyle = color1;
   ctx.fillStyle = color2;
   ctx.lineWidth = branchWidth;
   ctx.translate(startX, startY);
   ctx.rotate((angle * Math.PI) / 180);
   ctx.moveTo(0, 0);
   ctx.lineTo(0, -len);
   ctx.stroke();

   if (len < baseMinLenBranch) {
      ctx.beginPath();
      ctx.arc(0, -len, 10, 0, Math.PI / 2);
      ctx.fill();
      ctx.restore();
      return;
   }

   //curve = random(10,20)
   drawTree(0, -len, len * 0.73, angle + curve, branchWidth * 0.65);
   drawTree(0, -len, len * 0.73, angle - curve1, branchWidth * 0.65);

   ctx.restore();
}
drawTree(
   window.innerWidth / 2,
   1050,
   taille,
   baseAngle,
   baseWidthBranch,
   color1,
   color2
);
