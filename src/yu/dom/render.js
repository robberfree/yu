import "../component/tag2Component.js";
import { expandNode, renderNode } from "./node.js";
import diff from "./diff.js";

let appNode;
let container;

/**
 * 将组件渲染到容器
 */
function render(_appNode, _container) {
  appNode = _appNode;
  container = _container;

  expandNode(appNode);
  renderNode(appNode, container);
}

/**
 * 更新
 */
function update(initKeyPath) {
  diff(appNode, initKeyPath, (_appNode) => {
    appNode = _appNode;
  });
}

export { render, update };
