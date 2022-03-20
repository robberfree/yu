import propsChildren from "./propsChildren.js";
/**
 * 这是一个内置的核心高阶函数
 *
 * 所有自定义组件必须调用该高阶函数
 */
function h(Component) {
  return function WrapperComponent(_props, _children) {
    const { props, children } = propsChildren(_props, _children);

    return {
      type: Component,
      props,
      children,
      typeof: Symbol.for("yu.node"),
    };
  };
}

export default h;
