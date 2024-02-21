export default {
   preset: 0,
   canvasHeight: 5,
   tree: {
      len: 10,
      width: 5,
      shrinking: 0.03,
      leafColors: ["#337B47", "#5DC939", "#40B225", "#077F20"],
      leafAlpha: 0.8,
      trunkColor: "#5FC73D",
      minTrunkWidth: 3,
      angle: 25,
   },
   rules: [
      {
         axiom: "F",
         rule: {
            F: [
               {
                  value: "F([+F]F[-F]F)",
                  prob: 1,
               },
            ],
            "(": [
               {
                  value: "",
                  prob: 1,
               },
            ],
            ")": [
               {
                  value: "",
                  prob: 1,
               },
            ],
         },
      },
   ],
};
