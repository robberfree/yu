import propsChildren from "./propsChildren.js";

/**
 * 向window注入html标签组件
 */
["div", "input", "label", "button", "fragment"].forEach((type) => {
  window[type] = function TagComponent(_props, _children) {
    const { props, children } = propsChildren(_props, _children);

    return {
      type,
      props,
      children,
      typeof: "yu.node",
    };
  };
});
