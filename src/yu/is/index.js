function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isFunction(value) {
  return typeof value === "function";
}

function isString(value) {
  return typeof value === "string";
}

export { isArray, isObject, isFunction, isString };
