export { LinkedList }

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    head = null;
    tail = null;
     
    prepend(value) {
        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        }
        else {
            this.head = new Node(value, this.head)
        }
    }

    append(value) {
        // No items in the list.
        if (!this.head) {
            this.prepend(value);
            return;
        }
        
        // One item in the list.
        if (!this.head.next) {
            this.head.next = new Node(value);
            this.tail = this.head.next;
            return;
        }

        this.tail.next = new Node(value);
        this.tail = this.tail.next;
    }

    size() {
        let currentNode = this.head, index = 0;
        while(currentNode) {
            index++;
            currentNode = currentNode.next;
        }
        return index;
    }

    // 0 indexed
    at(index) {
        let currentIndex = 0, currentNode = this.head;
        while (currentNode) {
            if (currentIndex === index) return currentNode;
            currentIndex++;
            currentNode = currentNode.next;
        }
        return null;
    }
    
    pop() {
        if (!this.head) return;

        if (!this.head.next) {
            const popped = this.head;
            this.head = null;
            this.tail = null;
            return popped;
        }

        let currentNode = this.head.next, prevNode = this.head;
        while (currentNode) {
            if (!currentNode.next) {
                prevNode.next = null;
                this.tail = prevNode;
                return currentNode;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
    }

    contains(value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) return true;
            currentNode = currentNode.next;
        }
        return false;
    }

    find(index = false, value, callback = (node, value) => node.value === value) {
        let currentIndex = 0, currentNode = this.head;
        while (currentNode) {
            if (callback(currentNode, value)) return index?currentIndex:currentNode;
            currentIndex++;
            currentNode = currentNode.next;
        }
        return null
    }

    toString() {
        let currentNode = this.head;
        let output = "";
        while (currentNode) {
            output += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }
        output += "null";
        return output;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        let currentNode = this.head?.next, prevNode = this.head, currentIndex = 1;
        while (currentNode) {
            if (currentIndex === index) {                
                prevNode.next = new Node(value, currentNode);
                return;
            }

            currentIndex++;
            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        if (currentIndex === index && prevNode) {
            prevNode.next = new Node(value);
            this.tail = prevNode.next;
        }
    }

    removeAt(index) {
        if (index === 0) {
            const oldHead = this.head;
            this.head = this.head?.next;
            if (!this.head) this.tail = null;
            return oldHead;
        }

        let currentIndex = 1, currentNode = this.head?.next, prevNode = this.head;

        while (currentNode) {
            if (currentIndex === index) {
                // If this is the tail
                if (!currentNode.next) {
                    this.tail = prevNode;
                    prevNode.next = null;
                }
                else prevNode.next = currentNode.next;

                return currentNode;
            }

            currentIndex++;
            prevNode = currentNode;
            currentNode = currentNode.next;

        }

        return null;
    }

    toArray() {
        let arr = []
        let currentNode = this.head;
        while(currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
}
