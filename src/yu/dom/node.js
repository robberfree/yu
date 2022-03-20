import { isArray, isFunction, isObject, isString } from "../is/index.js";
import bind from "../hook/bind.js";
import { createElement, setProps } from "./element.js";
import arrayize from "../util/arrayize.js";

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

/**
 * 渲染节点
 */
function renderNode(node, parent) {
  if (!node) {
    return;
  }

  node.parent = parent;

  let { type, props, children } = node;

  if (isString(type)) {
    const el = createElement(type, props);
    setProps(el, props);
    node.el = el;

    parent.appendChild(el);

    parent = el;
  }

  arrayize(children, (child) => renderNode(child, parent));
}

export { expandNode, cloneNode, renderNode };
