const node = (key = null, value = null, nextNode = null) => {
  return { key, value, nextNode };
};

export default function linkedList() {
  let head = null;
  let tail = null;

  const traverseList = (callback) => {
    const results = [];
    for (
      let currentNode = head;
      currentNode;
      currentNode = currentNode.nextNode
    ) {
      results.push(callback(currentNode));
    }
    return results;
  };

  const nodeManipulation = {
    prepend: (key, value) => {
      head = node(key, value, head);
      if (tail === null) tail = head;
    },

    append: (key, value) => {
      if (head === null) return nodeManipulation.prepend(key, value);
      tail.nextNode = node(key, value, null);
      tail = tail.nextNode;
    },

    insertAt: (key, value, index) => {
      if (index < 0) throw new Error("Index cannot be negative");
      if (index === 0) return nodeManipulation.prepend(key, value);

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
    },

    removeAt: (index) => {
      if (index < 0) throw new Error("Index cannot be negative");
      if (head === null) throw new Error("Cannot remove from an empty list");
      if (index === 0) {
        head = head.nextNode;
        if (head === null) tail = null;
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
        if (!currentNode.nextNode) tail = prevNode;
      } else {
        throw new Error("Index out of bounds");
      }
    },
  };

  const listProperties = {
    getSize: () => {
      let count = 0;
      for (
        let currentNode = head;
        currentNode;
        currentNode = currentNode.nextNode
      ) {
        count++;
      }
      return count;
    },

    getHead: () => head,

    getTail: () => tail,

    getKeys: () => traverseList((node) => node.key),

    getValues: () => traverseList((node) => node.value),

    getEntries: () => traverseList((node) => [node.key, node.value]),
  };

  const findMethods = {
    findNode: (callback) => {
      for (
        let currentNode = head;
        currentNode;
        currentNode = currentNode.nextNode
      ) {
        if (callback(currentNode)) return currentNode;
      }
      return null;
    },

    findIndexByKey: (key) => {
      let index = 0;
      for (
        let currentNode = head;
        currentNode;
        currentNode = currentNode.nextNode
      ) {
        if (currentNode.key === key) return index;
        index++;
      }
      return -1;
    },
  };

  const otherMethods = {
    containsValue: (value) => {
      for (
        let currentNode = head;
        currentNode;
        currentNode = currentNode.nextNode
      ) {
        if (currentNode.value === value) return true;
      }
      return false;
    },

    print: () => {
      const nodes = [];
      for (
        let currentNode = head;
        currentNode;
        currentNode = currentNode.nextNode
      ) {
        nodes.push(`{key: ${currentNode.key}, value: ${currentNode.value}}`);
      }
      return nodes.join(" -> ") + " -> null";
    },

    clear: () => {
      head = null;
      tail = null;
    },

    pop: () => {
      if (!head) return null;
      if (!head.nextNode) {
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
    },

    atIndex: (index) => {
      if (index < 0) throw new Error("No negative index");

      let currentNode = head;
      let currentIndex = 0;
      while (currentNode !== null) {
        if (currentIndex === index) return currentNode;
        currentNode = currentNode.nextNode;
        currentIndex++;
      }

      throw new Error("Index out of bounds");
    },
  };

  return {
    ...nodeManipulation,
    ...listProperties,
    ...findMethods,
    ...otherMethods,
  };
}
