export { Tree };

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const arr = [...new Set(array)].sort((a,b) => a - b);
        this.root = this.buildTree(arr);
    }

    buildTree(arr, left = 0, right = arr.length - 1) {
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
    
    insert(value, root = this.root) {
        if (!this.root) {
            this.root = new Node(value);
        }
        
        else if (value < root.value) {
            if (root.left) this.insert(value, root.left);
            else root.left = new Node(value);
        }
        
        else if (value > root.value) {
            if (root.right) this.insert(value, root.right);
            else root.right = new Node(value);
        }
        
        else {
            throw new Error("Value already exists");
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
            else parent.left = successor.right;
        }
        
        return node;
    }
    
    #findMin(node, parent) {
        return node.left ? this.#findMin(node.left, node) : { node, parent };
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
    
    // left => root => right
    inOrder(callback, root = this.root) {
        if (!root) return;
        if (root.left) this.inOrder(callback, root.left);
        callback(root);
        if (root.right) this.inOrder(callback, root.right);
    }
    
    // root => left => right
    preOrder(callback, root = this.root) {
        callback(root);
        if (root.left) this.preOrder(callback, root.left);
        if (root.right) this.preOrder(callback, root.right);
    }
    
    // left => right => root
    postOrder(callback, root = this.root) {
        if (!root) return;
        if (root.left) this.postOrder(callback, root.left);
        if (root.right) this.postOrder(callback, root.right);
        callback(root);
    }

    height(node) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node, root = this.root) {
        if (!root) return -1;
        if (node.value === root.value) return 0;
        if (node.value < root.value) return 1 + this.depth(node, root.left);
        if (node.value > root.value) return 1 + this.depth(node, root.right);
    }

    isBalanced() {
        return this.#checkBal().bal;
    }

    #checkBal(root = this.root) {
        if (!root) return { height: -1, bal: true };

        const { height: leftHeight, bal: leftBalance } = this.#checkBal(root.left);
        const { height: rightHeight, bal: rightBalance } = this.#checkBal(root.right);

        const rootHeight = 1 + Math.max(leftHeight, rightHeight);

        // DEBUG
        // console.log("The current node: ", root.value);
        // console.log("Its height: ", rootHeight);
        // console.log("LEFT NODE: height: ", leftHeight, " Bal: ", leftBalance);
        // console.log("RIGHT NODE: height: ", rightHeight, " Bal: ", rightBalance);
        // console.log("--------");
        
        return {
            height: rootHeight,    
            bal: leftBalance && rightBalance && Math.abs(leftHeight - rightHeight) <= 1
        }
    }

    rebalance() {
        const arr = [];
        this.inOrder(node => arr.push(node.value));
        this.root = this.buildTree(arr);
    }
}