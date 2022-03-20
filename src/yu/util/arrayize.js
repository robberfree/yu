import { isArray } from "../is/index.js";

/**
 * 数组化调用元素
 */
function arrayize(value, forEach) {
  let arr = value;
  if (!isArray(value)) {
    arr = [value];
  }

  arr.forEach(forEach);
}

export default arrayize;
