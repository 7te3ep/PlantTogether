import config from "../config.js";
const rules = config.rules[config.preset].rule;

export function nextGen(tree) {
   function getRandomRule(array) {
      let rules = [];
      array.forEach((rule) => {
         for (let i = 0; i < rule.prob * 100; i++) {
            rules.push(rule);
         }
      });
      return rules[Math.floor(Math.random() * rules.length)].value;
   }

   tree = tree.split("");

   for (let i = 0; i < tree.length; i++) {
      if (rules[tree[i]]) tree[i] = getRandomRule(rules[tree[i]]);
      if (tree[i] == "(" || tree[i] == ")") tree[i] = "";
   }

   return tree.join("");
}
