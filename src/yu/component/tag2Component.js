import { isObject } from "../is/index.js";

/**
 * 向window注入html标签函数
 */
["div", "input", "label", "button", "fragment"].forEach((type) => {
  /**
   * @param {object} props
   * @param {Component|[Component]} children
   * 为了方便传参，有如下4种传参情形
   * 1. (props,children)
   * 2. (props)
   * 3. (children)
   * 4. ()
   */
  window[type] = function TagComponent(props, children) {
    if (props && !isObject(props)) {
      children = props;
      props = undefined;
    }

    return {
      type,
      props,
      children,
    };
  };
});
