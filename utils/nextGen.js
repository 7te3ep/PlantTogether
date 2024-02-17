//const rules = {
//   X: [
//      // Original rule
//      { rule: "(F[+X][-X]FX)", prob: 0.5 },
//
//      // Fewer limbs
//      { rule: "<(F[-X]FX)", prob: 0.05 },
//      { rule: ">(F[+X]FX)", prob: 0.05 },
//
//      // Extra rotation
//      { rule: "<(F[++X][-X]FX)", prob: 0.1 },
//      { rule: ">(F[+X][--X]FX)", prob: 0.1 },
//
//      // Berries/fruits
//      { rule: "(F[+X][-X]FXA)", prob: 0.1 },
//      { rule: "(F[+X][-X]FXB)", prob: 0.1 },
//   ],
//   F: [
//      // Original rule
//      { rule: "F(F)", prob: 0.8 },
//
//      // Stunted growth
//      { rule: "F", prob: 0.2 },
//   ],
//};
const rules = {
   X: [
      // Original rule
      { rule: "(F[+X][-X]FL)", prob: 0.5 },
   ],
   F: [
      // Original rule
      { rule: "F([+F]F[-F]F)", prob: 0.8 },
   ],
};

export function nextGen(tree) {
   function getRandomRule(array) {
      let rules = [];
      array.forEach((rule) => {
         for (let i = 0; i < rule.prob * 100; i++) {
            rules.push(rule);
         }
      });
      return rules[Math.floor(Math.random() * rules.length)].rule;
   }

   tree = tree.split("");

   for (let i = 0; i < tree.length; i++) {
      if (tree[i] == "X") tree[i] = getRandomRule(rules.X);
      if (tree[i] == "L") tree[i] = getRandomRule(rules.L);

      if (tree[i] == "F") tree[i] = getRandomRule(rules.F);

      if (tree[i] == "(" || tree[i] == ")") tree[i] = "";
   }

   return tree.join("");
}
