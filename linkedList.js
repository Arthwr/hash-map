const node = (key = null, value = null, nextNode = null) => {
  return { key, value, nextNode };
};

export default function linkedList() {
  let head = null;
  let tail = null;

  const clear = () => {
    head = null;
    tail = null;
  };

  const prepend = (key, value) => {
    head = node(key, value, head);
    if (tail === null) tail = head;
  };

  const append = (key, value) => {
    if (head === null) return prepend(key, value);
    tail.nextNode = node(key, value, null);
    tail = tail.nextNode;
  };

  const getSize = () => {
    let count = 0;
    let currentNode = head;
    while (currentNode !== null) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  };

  const getHead = () => head;

  const getTail = () => tail;

  const atIndex = (index) => {
    if (index < 0) throw new Error("No negative index");

    let currentNode = head;
    let currentIndex = 0;
    while (currentNode !== null) {
      if (currentIndex === index) return currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    throw new Error("Index out of bounds");
  };

  const pop = () => {
    if (head === null) return null;
    if (head.nextNode === null) {
      const value = head.value;
      head = tail = null;
      return value;
    }

    let prevNode = null;
    let currentNode = head;

    while (currentNode.nextNode) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    prevNode.nextNode = null;
    tail = prevNode;
    return currentNode.value;
  };

  const containsValue = (value) => {
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  };

  const findNode = (callback) => {
    let currentNode = head;
    while (currentNode) {
      if (callback(currentNode)) return currentNode;
      currentNode = currentNode.nextNode;
    }
    return null;
  };

  const findIndexByKey = (key) => {
    let index = 0;
    let currentNode = head;

    while (currentNode) {
      if (currentNode.key === key) return index;
      currentNode = currentNode.nextNode;
      index++;
    }

    return -1;
  };

  const print = () => {
    let nodes = [];
    let currentNode = head;
    while (currentNode) {
      nodes.push(`{key : ${currentNode.key}, value: ${currentNode.value}}`);
      currentNode = currentNode.nextNode;
    }
    return nodes.join(" -> ") + " -> {null}";
  };

  const insertAt = (key, value, index) => {
    if (index < 0) throw new Error("Index cannot be negative");
    if (index === 0) return prepend(key, value);

    let currentIndex = 0;
    let prevNode = null;
    let currentNode = head;

    while (currentNode && currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    if (currentIndex === index) {
      prevNode.nextNode = node(key, value, currentNode);
    } else {
      throw new Error("Index out of bounds");
    }
  };

  const removeAt = (index) => {
    if (index < 0) throw new Error("Index cannot be negative");
    if (head === null) throw new Error("Cannot remove from an empty list");

    if (index === 0) {
      head = head.nextNode;
      if (head === null) {
        tail = null;
      }
      return;
    }

    let prevNode = null;
    let currentNode = head;
    let currentIndex = 0;

    while (currentNode && currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    if (currentIndex === index) {
      prevNode.nextNode = currentNode.nextNode;
      if (!currentNode.nextNode) {
        tail = prevNode;
      }
    } else {
      throw new Error("Index out of bounds");
    }
  };

  return {
    prepend,
    append,
    getSize,
    getHead,
    getTail,
    atIndex,
    pop,
    containsValue,
    findNode,
    print,
    insertAt,
    removeAt,
    findIndexByKey,
    clear,
  };
}
