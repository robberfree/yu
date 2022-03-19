import { isObject } from "../is/index.js";
/**
 * 设置element的属性
 */
function setProps(el, props) {
  el &&
    isObject(props) &&
    Object.keys(props).forEach((prop) => {
      let value = props[prop];

      if (prop === "contenteditable") {
        el.setAttribute(prop, value);
      } else {
        el[prop] = value;
      }
    });
}

export { setProps };
