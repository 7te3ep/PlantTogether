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
});

const rules = {
   X: [
      // Original rule
      { rule: "F[+X][-X]F>X", prob: 0.4 },
      { rule: "F[+X][-X]F<X", prob: 0.4 },
      { rule: "F[+X]F<X", prob: 0.1 },
      { rule: "F[-X]F<X", prob: 0.1 },

      // Fewer limbs
      { rule: "F[-X]FX", prob: 0.05 },
      { rule: "F[+X]FX", prob: 0.05 },

      // Extra rotation
      { rule: "F[++X][-X]FX", prob: 0.1 },
      { rule: "F[+X][--X]FX", prob: 0.1 },

      //Berries/fruits
      { rule: "F[+X][-X]FXA", prob: 0.1 },
      { rule: "F[+X][-X]FXB", prob: 0.1 },
   ],
   F: [
      // Original rule
      { rule: "F", prob: 0.6 },
      { rule: "F<F", prob: 0.2 },
      { rule: "F>F", prob: 0.2 },
   ],
};

function genTree(tree, gen) {
   function getRandomRule(array) {
      let rules = [];
      array.forEach((rule) => {
         for (let i = 0; i < rule.prob * 100; i++) {
            rules.push(rule);
         }
      });
      return rules[Math.floor(Math.random() * rules.length)].rule;
   }

   for (let i = 0; i < gen; i++) {
      tree = tree.replaceAll("X", () => getRandomRule(rules.X));
      tree = tree.replaceAll("F", () => getRandomRule(rules.F));
   }
   return tree;
}

function drawTree(plant, len, width, x, y) {
   ctx.reset();
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   ctx.lineWidth = width;
   ctx.strokeStyle = "#955E42";
   ctx.translate(window.innerWidth / 2, window.innerHeight);
   plant.split("").forEach((symb) => {
      if (ctx.lineWidth > 0.8) ctx.lineWidth -= 0.2;
      switch (symb) {
         case "F":
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();
            ctx.translate(0, -len + 1);
            break;

         case "A":
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
            break;

         case "B":
            ctx.fillStyle = "darkred";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
            break;

         case "-":
            ctx.rotate((30 * Math.PI) / 180);
            break;

         case "+":
            ctx.rotate((-30 * Math.PI) / 180);
            break;

         case "<":
            ctx.rotate((-3 * Math.PI) / 180);
            break;
         case ">":
            ctx.rotate((3 * Math.PI) / 180);

            break;

         case ">":
            len = len * 1;
            width = width * 0.5;
            ctx.lineWidth = width;
            break;

         case "[":
            ctx.save();
            break;

         case "]":
            drawLeaves("green");
            ctx.restore();
            break;
      }
   });
}

function drawLeaves(color) {
   ctx.save();
   //ctx.globalAlpha = 0.3 + Math.random() / 2;
   ctx.globalAlpha = 0.8;
   const colors = ["#03440C", "#036016", "#058E3F", "#069E2D"];
   //ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
   ctx.fillStyle = colors[0];
   ctx.beginPath();
   //ctx.arc(0, 0, 30 + Math.floor(Math.random() * 20), 0, Math.PI / 2);
   ctx.arc(0, 0, 30, 0, Math.PI / 2);
   ctx.fill();
   ctx.restore();
}

let t = 0;
let len = 0;
let tree = genTree("X", 1);
let index = 0;
function animate() {
   t++;
   len += 0.1;
   drawTree(tree, len, 15);
   if (len >= 15) {
      index++;
      len = 0;
      tree = genTree(tree, 1);
   }
   if (index < 7) requestAnimationFrame(animate);
}
animate();
