import originalUseState from "./useState.js";

/**
 * 将hook绑定节点的、hook本身的数据。
 * @param {Function} component 组件
 * @param {string[]} keyPath 节点的路径
 */
function bind(component, keyPath) {
  const useState = originalUseState.bind({
    keyPath,
    hookIndex: 0,
  });

  return component.bind({ useState });
}

export default bind;
