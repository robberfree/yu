import "../component/tag2Component.js";
import { isArray, isFunction, isObject } from "../is/index.js";
import originalUseState from "../state/useState.js";

let component;
let container;

/**
 * Element: Component + HTML Element
 * {
 *  type
 *  children
 *  props
 * }
 * Component: 函数组件
 * HTML Element: html元素
 */

/**
 * 将组件渲染到容器
 */
function render(_component, _container) {
  component = _component;
  container = _container;

  virtualizeElement(component);
  renderElement(component, container);

  console.log(component);
}

/**
 * 虚拟化元素，遇到组件主动调用获取子元素
 */
function virtualizeElement(element, keyPath = []) {
  if (!element) {
    return;
  }

  let { type, props, children } = element;
  if (isFunction(type)) {
    //注入useState
    const useState = originalUseState.bind({
      keyPath,
      hookIndex: 0,
    });
    type = type.bind({ useState });

    children = type(props);
    element.children = children;
  }

  keyPath = [...keyPath, "children"];
  if (isArray(children)) {
    children.forEach((child, index) => {
      virtualizeElement(child, [...keyPath, index]);
    });
  } else {
    virtualizeElement(children, keyPath);
  }
}

/**
 * 渲染元素
 */
function renderElement(element, container) {
  if (!element) {
    return;
  }

  let { type, props, children, dom } = element;
  let el = container;

  if (!isFunction(type)) {
    //差异检查没有做啊
    if (dom) {
      el = dom;
      setProps(dom, props);
    } else {
      el = createElement(type, props);
      container.appendChild(el);
      element.dom = el;
    }
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => renderElement(child, el));
}

/**
 * 创建元素
 */
function createElement(tagName, props) {
  const el =
    tagName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(tagName);

  setProps(el, props);
  return el;
}

function setProps(el, props) {
  isObject(props) &&
    Object.keys(props).forEach((prop) => {
      const value = props[prop];

      if (prop === "contenteditable") {
        el.setAttribute(prop, value);
      } else {
        el[prop] = value;
      }
    });
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
  virtualizeElement(component);
  renderElement(component, container);
}

export { render, update };
