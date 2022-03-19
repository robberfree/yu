import bind from "../hook/bind.js";
import { isArray, isFunction, isObject } from "../is/index.js";
import arrayize from "./arrayize.js";
import { setProps } from "./element.js";
import { cloneNode, expandNode } from "./node.js";
/**
 *
 * @param {Node} appNode 整个应用程序节点
 * @param {string[]} initKeyPath 从旧的节点哪个位置发起的更新
 */
function diff(appNode, initKeyPath) {
  const prevNode = initKeyPath.reduce((node, key) => node[key], appNode);

  let nextNode = cloneNode(prevNode);
  expandNode(nextNode, initKeyPath);

  diffNode(prevNode, nextNode);
}

/**
 * 比较两个节点的差异
 */
function diffNode(prevNode, nextNode) {
  if (!prevNode && !nextNode) {
    return;
  }

  console.log("差别", prevNode, nextNode);

  //改
  if (prevNode.type === nextNode.type) {
    setProps(prevNode.el, nextNode.props);
  }
  //增
  else {
  }

  const prevChildren = prevNode.children;
  const nextChildren = nextNode.children;
  //children都是Node[]
  if (isArray(prevChildren) && isArray(nextChildren)) {
    //暂时未考虑删除情况
    nextChildren.forEach((nexChild, index) => {
      const prevChild = prevChildren[index];
      diffNode(prevChild, nexChild);
    });
  } else {
    diffNode(prevChildren, nextChildren);
  }
}

export default diff;
