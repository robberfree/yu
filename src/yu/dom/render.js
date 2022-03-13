import "../component/tag2Component.js";
import { isArray, isFunction, isObject } from "../is/index.js";

let component;
let container;

/**
 * 将组件渲染到容器
 */
function render(_component, _container) {
  component = _component;
  container = _container;

  buildVdom(component);
  renderVdom(component, container);
}

function buildVdom(component) {
  if (!component) {
    return;
  }

  let { type, props, children } = component;
  if (isFunction(type)) {
    children = type(props);
    component.children = children;
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => buildVdom(child));
}

function renderVdom(component, container) {
  if (!component) {
    return;
  }

  let { type, props, children } = component;
  let el = container;

  if (!isFunction(type)) {
    el = createElement(type, props);
    container.appendChild(el);
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => renderVdom(child, el));
}

/**
 * 创建元素
 */
function createElement(tagName, props) {
  const el =
    tagName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(tagName);

  isObject(props) &&
    Object.keys(props).forEach((prop) => {
      const value = props[prop];

      if (prop === "contenteditable") {
        el.setAttribute(prop, value);
      } else {
        el[prop] = value;
      }
    });
  return el;
}

/**
 * 更新
 */
function update() {
  //1. 移除container下面的元素。
  container.childNodes.forEach((node) => {
    container.removeChild(node);
  });

  //2. 重新渲染
  buildVdom(component);
  renderVdom(component, container);
}

export { render, update };
