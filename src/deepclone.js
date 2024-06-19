// 深度拷贝
function deep_clone(obj, hash = new WeakMap()) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);
  if (obj instanceof Map) {
    const map = new Map();
    hash.set(obj, map);
    obj.forEach((value, key) => {
      map.set(deep_clone(key, hash), deep_clone(value.hash));
    });
    return map;
  }
  if (obj instanceof Set) {
    const set = new Set();
    hash.set(obj, set);
    obj.forEach((value) => {
      set.add(deep_clone(value, hash));
    });
    return set;
  }

  //   if (Array.isArray(obj)) {
  //     const arr = [];
  //     hash.set(obj, arr);
  //     arr.forEach((v, i) => {
  //       arr[i] = deep_clone(v, hash);
  //     });
  //     return arr;
  //   }
  // 处理 Array
  if (Array.isArray(obj)) {
    const arr = [];
    hash.set(obj, arr);
    obj.forEach((item, index) => {
      arr[index] = deep_clone(item, hash);
    });
    return arr;
  }
  const newObj = {};
  hash.set(obj, newObj);
  Object.keys(obj).forEach((key) => {
    newObj[key] = deep_clone(obj[key], hash);
  });
  return newObj;
}

// 示例
const original = {
  a: 1,
  b: { c: 2 },
  d: new Date(),
  e: /abc/g,
  f: new Map([["key1", "value1"]]),
  g: new Set([1, 2, 3]),
  h: [1, 2, { i: 3 }],
  j: function () {
    console.log("hello");
  },
  k: undefined,
  l: Symbol("sym"),
};

original.self = original; // 循环引用

const copy = deep_clone(original);

console.log(copy);

function deepCopy(obj, hash = new WeakMap()) {
  // 处理 null 或 undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // 处理原始类型
  if (typeof obj !== "object") {
    return obj;
  }

  // 处理 Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理 RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理 Map
  if (obj instanceof Map) {
    const map = new Map();
    hash.set(obj, map);
    obj.forEach((value, key) => {
      map.set(deepCopy(key, hash), deepCopy(value, hash));
    });
    return map;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const set = new Set();
    hash.set(obj, set);
    obj.forEach((value) => {
      set.add(deepCopy(value, hash));
    });
    return set;
  }

  // 处理 Array
  if (Array.isArray(obj)) {
    const arr = [];
    hash.set(obj, arr);
    obj.forEach((item, index) => {
      arr[index] = deepCopy(item, hash);
    });
    return arr;
  }

  // 处理普通对象
  const result = {};
  hash.set(obj, result);
  Object.keys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key], hash);
  });
  return result;
}
