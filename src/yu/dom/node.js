import { isArray, isFunction, isObject } from "../is/index.js";
import bind from "../hook/bind.js";

/**
 * 展开节点。如果节点是组件，主动调用以获取子元素。
 */
function expandNode(node, keyPath = []) {
  if (!node) {
    return;
  }

  let { type, props, children } = node;

  //组件
  if (isFunction(type)) {
    type = bind(type, keyPath);

    children = type(props);
    node.children = children;
  }

  keyPath = [...keyPath, "children"];
  if (isArray(children)) {
    children.forEach((child, index) => {
      expandNode(child, [...keyPath, index]);
    });
  } else {
    expandNode(children, keyPath);
  }
}

/**
 * 复制旧节点返回新节点。遇到组件节点不复制它的子元素（没有意义）。
 */
function cloneNode(node) {
  // 对象
  if (isObject(node)) {
    return Object.keys(node).reduce((result, key) => {
      let value = node[key];
      if (!(key === "children" && isFunction(node.type))) {
        value = cloneNode(value);
      }
      result[key] = value;
      return result;
    }, {});
  }
  // 数组
  else if (isArray(node)) {
    return node.map((item) => cloneNode(item));
  }
  return node;
}

export { expandNode, cloneNode };
