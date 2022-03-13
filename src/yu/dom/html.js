import { isArray, isObject } from "../is/index.js";

/**
 * 向window注入html标签函数
 */
["div", "input", "label", "button", "fragment"].forEach((tagName) => {
  /**
   * @param {object} props
   * @param {Component|[Component]} children
   * 为了方便传参，有如下4种传参情形
   * 1. (props,children)
   * 2. (props)
   * 3. (children)
   * 4. ()
   */
  window[tagName] = function component(props, children) {
    if (props && !isObject(props)) {
      children = props;
    }

    const el = createElement(tagName, props);
    appendChild(el, children);
    return el;
  };
});

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
 * 附加子节点
 */
function appendChild(el, children) {
  children = isArray(children) ? children : [children];
  children.forEach((child) => {
    child && el.appendChild(child);
  });
}
