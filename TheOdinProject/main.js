import { mergeSort } from "./merge-sort.js";
import { LinkedList } from "./linked-list.js";
import { HashMap } from "./hashmap.js";
import { Tree } from "./binary-search-tree.js";

/* Generate a BST of random values. */

// O(N) (well, technically O(1) since it has fixed parameters..)
const randomNumbers = ((size = 10, max = 100) => Array.from({ length: size }, () => Math.floor(Math.random() * max)))(); 

// O(N) (removing duplicates) + O(NlogN) (sorting) + O(N) (creating the tree) = O(NlogN).
const tree = new Tree(randomNumbers);
console.log("Generated a random tree with 10 elements");

tree.prettyPrint(); // O(N)

console.log("---------------");

/* Confirm balance. */
console.log("Tree balance: ", tree.isBalanced()); // O(N)

console.log("---------------");

/* Print all elements in level, pre, in, and post order. O(N) each. */
console.log("Printing elements...");

console.log("Level Order:");
tree.forEach(node => console.log(node.value));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.value));

console.log("In Order:");
tree.inOrder(node => console.log(node.value));

console.log("Post Order:");
tree.postOrder(node => console.log(node.value));

console.log("---------------");

/* Inserting some numbers > 100 to unbalance the tree. O(logN) each. */
tree.insert(105);
tree.insert(110);
tree.insert(115);

/* Confirm unbalance. */
const bal = tree.isBalanced(); // O(N)
console.log("Tree balance after inserting some large numbers to it:", bal);
tree.prettyPrint(); // O(N)

/* Rebalance the tree. */
if (!bal) {
    console.log("Rebalancing tree...");
    tree.rebalance(); // O(N + N) = O(N)

    // Confirm the tree is balanced again.
    console.log("Is the tree balanced after rebalancing?", tree.isBalanced()); // O(N)
}

console.log("---------------");

/* Print all elements again in level, pre, in, and post order after rebalancing. O(N) each. */
console.log("Printing elements again...");

console.log("Level Order:");
tree.forEach(node => console.log(node.value));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.value));

console.log("In Order:");
tree.inOrder(node => console.log(node.value));

console.log("Post Order:");
tree.postOrder(node => console.log(node.value));

console.log("---------------");

/* Visualize the tree */
console.log("Result:");
tree.prettyPrint(); // O(N)
