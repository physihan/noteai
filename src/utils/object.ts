export const pick = (obj, keys) => {
  const result = {};
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
};
export const shallowEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};
