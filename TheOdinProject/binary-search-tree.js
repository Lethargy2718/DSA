export { Tree };

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.arr = [...new Set(arr)].sort((a,b) => a - b);
        this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
    }

    buildTree(arr, left, right) {
        if (arr.length === 0) return null;
        if (left >= right) return new Node(arr[left]);
        const mid = Math.floor((left + right) / 2);
        const root = new Node(arr[mid]);
        if (left < mid) root.left = this.buildTree(arr, left, mid - 1);
        if (right > mid) root.right = this.buildTree(arr, mid + 1, right);
        return root;
    }

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    find(value, node = this.root) {
        if (node.value === value) return node;
        if (value > node.value && node.right) return this.find(value, node.right);
        if (value < node.value && node.left) return this.find(value, node.left);
        return null;
    }

    forEach(callback) {
        if (!callback) throw new Error("No callback provided");

        const queue = [this.root];
        while (queue.length !== 0) {
            const current = queue.shift();
            callback(current)
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
    
    delete(value) {
        this.root = this.#deleteNode(this.root, value);
    }
    
    #deleteNode(node, value) {
        if (!node) throw new Error("Value does not exist");
    
        if (value < node.value) node.left = this.#deleteNode(node.left, value);
        else if (value > node.value) node.right = this.#deleteNode(node.right, value);

        else {
            // Leaf
            if (!node.left) return node.right;
            if (!node.right) return node.left;
    
            // Two children
            let { node: successor, parent: parent } = this.#findMin(node.right, node);
            node.value = successor.value;
            if (successor === node.right) node.right = successor.right;
            else if (successor.right) parent.left = successor.right;
        }

        return node;
    }
    
    #findMin(node, parent) {
        return node.left ? this.#findMin(node.left, node) : { node, parent };
    }
}