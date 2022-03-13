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
}

/**
 * 虚拟化element，遇到component主动调用获取children
 */
function virtualizeElement(component) {
  if (!component) {
    return;
  }

  let { type, props, children } = component;
  if (isFunction(type)) {
    //注入useState
    const useState = originalUseState.bind({
      instanceKey: type.name,
      hookIndex: 0,
    });
    type = type.bind({ useState });

    children = type(props);
    component.children = children;
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => virtualizeElement(child));
}

/**
 * 渲染一个元素
 */
function renderElement(element, container) {
  if (!element) {
    return;
  }

  let { type, props, children } = element;
  let el = container;

  if (!isFunction(type)) {
    el = createElement(type, props);
    container.appendChild(el);
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
  virtualizeElement(component);
  renderElement(component, container);
}

export { render, update };
