const c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight * 5;
const ctx = c.getContext("2d");

const cW = document.getElementById("water");
cW.width = window.innerWidth;
cW.height = window.innerHeight * 5;
const ctxW = cW.getContext("2d");

export { ctx, ctxW, c, cW };
