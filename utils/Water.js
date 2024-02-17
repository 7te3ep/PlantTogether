import { ctxW } from "./canvas.js";

export class Water {
   constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vy = vy;
      this.vx = vx;
      this.size = 5 + Math.floor(Math.random() * 5);
   }

   update() {
      this.y += this.vy;
      this.x += this.vx;
      this.vx *= 0.8;
      this.vy += 1;
   }

   draw() {
      ctxW.globalAlpha = 0.2 + Math.random();
      ctxW.fillStyle = "#348feb";
      ctxW.beginPath();
      ctxW.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctxW.fill();
   }
}
