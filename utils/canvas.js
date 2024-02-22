const c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight * 5;
const ctx = c.getContext("2d");

let hour = new Date();
hour = hour.getHours();
console.log(hour);
c.classList.remove("night");
if (hour > 11 && hour < 18) {
   c.classList.add("day");
} else if (hour > 18 && hour < 23) {
   c.classList.add("evening");
} else if (hour > 4 && hour < 11) {
   c.classList.add("morning");
} else {
   c.classList.add("night");
}

const cW = document.getElementById("water");
cW.width = window.innerWidth;
cW.height = window.innerHeight * 5;
const ctxW = cW.getContext("2d");

export { ctx, ctxW, c, cW };
