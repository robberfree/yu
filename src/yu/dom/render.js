import "../component/tag2Component.js";
import { isArray, isFunction, isObject } from "../is/index.js";
import originalUseState from "../state/useState.js";

let component;
let container;

/**
 * 将组件渲染到容器
 */
function render(_component, _container) {
  component = _component;
  container = _container;

  virtualizeNode(component);
  renderNode(component, container);

  console.log(component);
}

/**
 * 虚拟化元素，遇到组件主动调用获取子元素
 */
function virtualizeNode(node, keyPath = []) {
  if (!node) {
    return;
  }

  let { type, props, children } = node;
  if (isFunction(type)) {
    //注入useState
    const useState = originalUseState.bind({
      keyPath,
      hookIndex: 0,
    });
    type = type.bind({ useState });

    children = type(props);
    node.children = children;
  }

  keyPath = [...keyPath, "children"];
  if (isArray(children)) {
    children.forEach((child, index) => {
      virtualizeNode(child, [...keyPath, index]);
    });
  } else {
    virtualizeNode(children, keyPath);
  }
}

/**
 * 渲染元素
 */
function renderNode(node, container) {
  if (!node) {
    return;
  }

  let { type, props, children, dom } = node;
  let el = container;

  if (!isFunction(type)) {
    //差异检查没有做啊
    if (dom) {
      el = dom;
      setProps(dom, props);
    } else {
      el = createElement(type, props);
      container.appendChild(el);
      node.dom = el;
    }
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => renderNode(child, el));
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

/**
 * 更新真实元素的属性
 */
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
  virtualizeNode(component);
  renderNode(component, container);
}

export { render, update };
