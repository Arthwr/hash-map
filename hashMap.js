import linkedList from "./linkedList.js";

export default function hashMap() {
  let size = 16;
  const LOAD_FACTOR = 0.75;
  const MIN_LOAD_FACTOR = 0.25;

  let buckets = Array(size)
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

  const resize = (newSize) => {
    if (newSize < 16) newSize = 16;

    const newBuckets = Array(newSize)
      .fill(null)
      .map(() => linkedList());

    buckets.forEach((bucket) => {
      bucket.getEntries().forEach(([key, value]) => {
        const newIndex = hash(key);
        newBuckets[newIndex].append(key, value);
      });
    });

    size = newSize;
    buckets = newBuckets;
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

  const nodeManipulation = {
    set(key, value) {
      if (listProperties.length() >= LOAD_FACTOR * size) {
        resize(size * 2);
      }
      const { bucket } = getBucket(key);
      const existingNode = bucket.findNode((node) => node.key === key);
      if (existingNode) {
        existingNode.value = value;
      } else {
        bucket.append(key, value);
      }
    },

    get(key) {
      const { bucket } = getBucket(key);
      const node = bucket.findNode((node) => node.key === key);
      return node ? node.value : null;
    },

    has(key) {
      const { bucket } = getBucket(key);
      return bucket
        ? bucket.findNode((node) => node.key === key) !== null
        : false;
    },

    remove(key) {
      const { bucket } = getBucket(key);
      const index = bucket.findIndexByKey(key);
      if (index !== -1) {
        bucket.removeAt(index);
        if (listProperties.length() <= MIN_LOAD_FACTOR * size && size > 16) {
          resize(Math.floor(size / 2));
        }
        return true;
      }
      return false;
    },
  };

  const listProperties = {
    length() {
      let count = 0;
      buckets.forEach((item) => {
        count += item.getSize();
      });
      return count;
    },

    clear() {
      buckets.forEach((bucket) => bucket.clear());
    },
  };

  const retrievalMethods = {
    keys() {
      let allKeys = [];
      buckets.forEach((bucket) => {
        allKeys = allKeys.concat(bucket.getKeys());
      });
      return allKeys;
    },

    values() {
      let allValues = [];
      buckets.forEach((bucket) => {
        allValues = allValues.concat(bucket.getValues());
      });
      return allValues;
    },

    entries() {
      return buckets.reduce(
        (acc, bucket) => acc.concat(bucket.getEntries()),
        []
      );
    },
  };

  const otherMethods = {
    printBucketData() {
      return buckets.map((bucket) => bucket.print());
    },
  };

  return {
    ...nodeManipulation,
    ...listProperties,
    ...retrievalMethods,
    ...otherMethods,
  };
}
