import { isObject } from "../is/index.js";
/**
 * 这是一个核心内置高阶函数
 *
 * 所有自定义组件必须调用该高阶函数
 */
function h(Component) {
  return function WrapperComponent(props, children) {
    if (props && !isObject(props)) {
      children = props;
      props = undefined;
    }

    return {
      type: Component,
      props,
      children,
    };
  };
}

export default h;
