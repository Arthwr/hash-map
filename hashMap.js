import linkedList from "./linkedList.js";

export default function hashMap() {
  const LOAD_FACTOR = 0.75;
  const size = 16;
  const buckets = Array(size)
    .fill(null)
    .map(() => linkedList());

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const getBucket = (key) => {
    const index = hash(key);
    const bucket = buckets[index];
    if (!bucket) {
      throw new Error(
        `Bucket at index ${index} doesn't exist or is not initialized`
      );
    }
    return { index, bucket };
  };

  const set = (key, value) => {
    const { bucket } = getBucket(key);
    const existingNode = bucket.findNode((node) => node.key === key);
    if (existingNode) {
      existingNode.value = value;
    } else {
      bucket.append(key, value);
    }
  };

  const get = (key) => {
    const { bucket } = getBucket(key);
    const node = bucket.findNode((node) => node.key === key);
    return node ? node.value : null;
  };

  const has = (key) => {
    const { bucket } = getBucket(key);
    return bucket
      ? bucket.findNode((node) => node.key === key) !== null
      : false;
  };

  const remove = (key) => {
    const { bucket } = getBucket(key);
    const index = bucket.findIndexByKey(key);
    if (index !== -1) {
      bucket.removeAt(index);
      return true;
    }
    return false;
  };

  const length = () => {
    let count = 0;
    buckets.forEach((item) => {
      const size = item.getSize();
      count += size;
    });
    return count;
  };

  const clear = () => {
    buckets.forEach((bucket) => bucket.clear());
  };

  const keys = () => {
    let allKeys = [];
    buckets.forEach((bucket) => {
      const keys = bucket.getKeys();
      allKeys = allKeys.concat(keys);
    });
    return allKeys;
  };

  const values = () => {
    let allValues = [];
    buckets.forEach((bucket) => {
      const values = bucket.getValues();
      allValues = allValues.concat(values);
    });
    return allValues;
  };

  const entries = () => {};

  const printBucketData = () => {
    return buckets.map((bucket) => bucket.print());
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    printBucketData,
  };
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

// console.log(newList.printBucketData());
// console.log(newList.get("Arthur"));
// console.log(newList.get("Alice"));
// console.log(newList.get("Kek"));
// console.log(newList.has("Arthur"));
// console.log(newList.remove("Arthur"));
// console.log(newList.printBucketData());
// console.log(newList.length());
// console.log(newList.printBucketData());
