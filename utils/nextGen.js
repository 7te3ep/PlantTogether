import config from "../config.js";
import pool from "../pool.js";

export function nextGen(tree) {
   function getRandomRule(array) {
      let rules = [];
      array.forEach((rule) => {
         for (let i = 0; i < rule.prob * 100; i++) {
            rules.push(rule);
         }
      });
      return array[Math.floor(Math.random() * array.length)].value;
   }

   tree = tree.split("");

   for (let i = 0; i < tree.length; i++) {
      if (pool.rules[tree[i]]) tree[i] = getRandomRule(pool.rules[tree[i]]);
      if (tree[i] == "(" || tree[i] == ")") tree[i] = "";
   }

   return tree.join("");
}
