/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get method */
  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur != null && count != idx) {
      count += 1;
      cur = cur.next;
    }
    return cur;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // If list is empty, throw empty error
    this.length -= 1;
    if (this.head === null) throw new Error("List empty.");
    ;

    // If only one value in linked list 
    if (this.head.next === null) {
      let last = this.head;
      this.tail = null;
      this.head = null;
      return last.val;
    }
    
    // Go through linked list to find second to last node
    let secondToLast = this.head;
    while(secondToLast.next.next != null) {
      secondToLast = secondToLast.next;
    }
    let last = secondToLast.next; // store the last node in a variable 
    this.tail = secondToLast; // set tail to the second to last node
    secondToLast.next = null; // remove reference to the last node
    return last.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    this.length -= 1;
    if (this.head === null) throw new Error("List is empty.");
    ;
    if (this.head.next === null) {
      this.tail = null;
    }
    let firstItem = this.head;
    this.head = this.head.next;
    
    return firstItem.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // Get the node before the new one
    let prev = this._get(idx - 1);
    let newNode = new Node(val);

    newNode.next = prev.next;
    prev.next = newNode;  
    
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    if (idx === 0) return this.shift();
    if (idx === this.length) return this.pop();

    let prev = this._get(idx - 1);
    let removedNode = prev.next;
    prev.next = prev.next.next;
    return removedNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    // If list is empty, return 0
    if (this.length === 0) return 0;

    let sum = 0;
    let cur = this.head;

    for (let i = 0; i < this.length; i++) {
      sum += cur.val;
      cur = cur.next;
    }
    let avg = sum / this.length;
    return avg;
  }
}

// module.exports = LinkedList;
