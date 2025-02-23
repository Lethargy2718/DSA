import { mergeSort } from "./merge-sort.js";
import { LinkedList } from "./linked-list.js";
import { HashMap } from "./hashmap.js";
import { Tree } from "./binary-search-tree.js";

const arr = [];
let n = Math.pow(2, 12) + 1;
while (n--) arr.push(n);
const tree = new Tree(arr);
tree.delete(4096);
tree.prettyPrint();
