import linkedList from "./linkedList.js";

export default function hashMap() {
  const size = 16;
  const buckets = Array(size)
    .fill(null)
    .map(() => linkedList());

  const getHash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  const getIndex = (key) => {
    return getHash(key) % size;
  };

  const set = (key, value) => {
    const hash = getHash(key);
    const index = getIndex(key);
    const bucket = buckets[index];

    const existingNode = bucket.findNode((node) => node.key === key);
    if (existingNode) {
      existingNode.value = value;
    } else {
      bucket.append(hash, value);
    }
  };

  const getBucketData = () => {
    return buckets.map((bucket) => bucket.print());
  };

  return { set, getHash, getBucketData };
}

const newList = hashMap();
newList.set("Arthur", "Great");
newList.set("Rutha", "Wise");
newList.set("George", "Bad");
newList.set("Phillip", "Smart");
newList.set("John", "Brave");
newList.set("Michael", "Wise");
newList.set("Elizabeth", "Clever");
newList.set("Alice", "Kind");

console.log(newList.getBucketData());
