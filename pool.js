export default {
   shapes: [
      (ctx) => {
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.quadraticCurveTo(1, -1, 0, -2);
         ctx.quadraticCurveTo(-1, -1, 0, 0);
         ctx.closePath();
      },
      (ctx) => {
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.lineTo(0.5, -0.5);
         ctx.lineTo(0, -1.5);
         ctx.lineTo(-0.5, -0.5);
         ctx.lineTo(0, 0);
         ctx.closePath();
      },
      (ctx) => {
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.quadraticCurveTo(1, -1, 0, -2);
         ctx.quadraticCurveTo(-1, -1, 0, 0);
         ctx.closePath();
      },
      (ctx) => {
         ctx.beginPath();
         ctx.ellipse(0, 0, 0.6, 0.3, 0, 0, 2 * Math.PI);
         ctx.fill();
      },
   ],
   themes: [
      ["#5FC73D", "#337B47", "#5DC939", "#40B225", "#077F20"],
      ["#955E42", "#74d3ae", "#457D61", "#7E764D", "#678D58"],
      ["#071013", "#FFBACB", "#FF92C4", "#B27696"],
      ["#5A3A31", "#2F4B26", "#50a163", "#789742"],
      ["#CB904D", "#343F26", "#566E3D", "#8DAC67", "#C3E991"],
      ["#bc4749", "#a7c957", "#6a994e", "#a7c957", "#386641"],
      ["#d16014", "#939f5c", "#bbce8a", "#e2f9b8"],
      ["#b38a58", "#6f732f", "#3c5233", "#264027"],
   ],
   rules: {
      F: [
         {
            value: "F([+F])",
         },
         {
            value: "F([-F])",
         },
         {
            value: "FF",
         },
         {
            value: "F([+F]F[-F]F)",
         },
         {
            value: "F([+F][-F]F)",
         },
      ],
      "]": [
         {
            value: "B]",
         },
         {
            value: "R]",
         },
         {
            value: "]",
         },
      ],
      "(": [
         {
            value: "",
         },
      ],
      ")": [
         {
            value: "",
         },
      ],
   },
};
