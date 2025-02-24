export { HashMap }
import { LinkedList } from "./linked-list.js";

class HashMap {
    constructor(capacity = 16, loadfactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadfactor;
        this.load = 0;
        this.buckets = [];
    }

    set(key, value) {
        const code = this.hash(key);
        if (!this.buckets[code]) {
            this.buckets[code] = new LinkedList();
            this.buckets[code].append([key, value]);
            this.load++;
        }
        else {
            const former = this.get(key);
            if (former) former.value[1] = value;
            else this.buckets[code].prepend([key, value]);
        }
        this.checkLoad();        
    }

    get(key, index = false) {
        const code = this.hash(key);
        this.checkBounds(code);
        const got = this.buckets[code].find(index, key, (node, key) => node.value[0] === key);
        return got;
    }

    has(key) {
        const code = this.hash(key);
        this.checkBounds(code);
        const found = this.get(key);
        return found ? true : false;
    }

    remove(key) {
        const code = this.hash(key);
        this.checkBounds(code);
        if (this.buckets[code]) {
            const index = this.get(key, true);
            if (index !== null && this.buckets[code].removeAt(index)) {
                if (!this.buckets[code].head) { 
                    delete this.buckets[code];
                    this.load--;
                }
                return true;
            }
        }
        return false;
    }

    length() {
        return this.buckets.reduce((acc, bucket) => {
            if (bucket) {
                acc += bucket.size();
                return acc;
            }
        }, 0);
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }
    
    #keysOrValues(index) {
        let result = [];
        this.buckets.forEach(list => {
            result.push(...list.toArray().map(arr => arr[index]));
        });
        return result;
    }
    
    keys() {
        return this.#keysOrValues(0);
    }
    
    values() {
        return this.#keysOrValues(1);
    }

    entries() {
        let result = [];
        this.buckets.forEach(list => result = [...result, ...list.toArray()]); 
        return result;
    }

    checkBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (index === null || index === undefined) {
            throw new Error("Invalid key");
        }
    }

    checkLoad() {
        if (this.load > this.capacity * this.loadFactor) {
            this.resize();
        }
    }

    resize() {
        this.load = 0;
        this.capacity *= 2;
        const oldBuckets = this.buckets;
        this.buckets = [];
        oldBuckets.forEach(list => {
            list?.forEach(node => this.set(node.value[0], node.value[1]));
        });
    }
}
