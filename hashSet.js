export default function hashSet() {
  let size = 16;
  let buckets = Array(size)
    .fill()
    .map(() => []);
  const LOAD_FACTOR = 0.75;
  const MIN_LOAD_FACTOR = 0.25;
  const PRIME_NUMBER = 31;
  const MIN_SIZE = 16;

  const hash = (key) => {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * PRIME_NUMBER + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const resize = (newSize) => {
    if (newSize < MIN_SIZE) newSize = MIN_SIZE;

    const allKeys = keys();
    buckets = Array(newSize)
      .fill()
      .map(() => []);

    size = newSize;
    allKeys.forEach((key) => {
      const index = hash(key);
      buckets[index].push(key);
    });
  };

  const has = (key) => {
    const index = hash(key);
    const bucket = buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i] === key) return true;
      }
    }

    return false;
  };

  const set = (key) => {
    const index = hash(key);

    if (!has(key)) {
      buckets[index].push(key);

      if (length() > size * LOAD_FACTOR) {
        resize(size * 2);
      }
    }
  };

  const remove = (key) => {
    const index = hash(key);
    const bucket = buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i] === key) {
          bucket.splice(i, 1);
          if (length() < MIN_LOAD_FACTOR * size && size < 16) {
            resize(Math.floor(size / 2));
          }
          return true;
        }
      }
    }

    return false;
  };

  const length = () => {
    return buckets.reduce((acc, bucket) => {
      if (bucket) return acc + bucket.length;
      return acc;
    }, 0);
  };

  const keys = () => {
    return buckets.reduce((acc, bucket) => {
      if (bucket) {
        acc.push(...bucket);
      }
      return acc;
    }, []);
  };

  const printBuckets = () => {
    let result = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] && buckets[i].length > 0) {
        result.push([...buckets[i]]);
      }
    }
    return result;
  };

  return { printBuckets, set, has, remove, length, keys, size };
}
