function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export { isArray, isObject };
