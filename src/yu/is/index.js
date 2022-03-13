function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isFunction(value) {
  return typeof value === "function";
}

export { isArray, isObject, isFunction };
