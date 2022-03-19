import "../component/tag2Component.js";
import { isArray, isString, isFunction, isObject } from "../is/index.js";
import { setProps } from "./element.js";
import { expandNode } from "./node.js";
import diff from "./diff.js";

let component;
let container;

/**
 * 将组件渲染到容器
 */
function render(_component, _container) {
  component = _component;
  container = _container;

  expandNode(component);
  renderNode(component, container);

  console.log(component);
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

  if (!isArray(children)) {
    children = [children];
  }
  children.forEach((child) => renderNode(child, parent));
}

/**
 * 创建元素
 */
function createElement(tagName, props) {
  const el =
    tagName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(tagName);

  return el;
}

/**
 * 更新
 */
function update(keyPath) {
  diff(component, keyPath);
}

export { render, update };
