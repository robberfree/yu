import { isArray, isString } from "../is/index.js";
import arrayize from "../util/arrayize.js";
import { setProps } from "./element.js";
import { cloneNode, expandNode, renderNode } from "./node.js";
/**
 *
 * @param {Node} appNode 整个应用程序节点
 * @param {string[]} initKeyPath 从旧的节点哪个位置发起的更新
 */
function diff(appNode, initKeyPath, callback) {
  //旧的节点
  const prevNode = initKeyPath.reduce((node, key) => node[key], appNode);

  //新的节点
  let nextNode = cloneNode(prevNode);
  expandNode(nextNode, initKeyPath);

  console.log(prevNode, nextNode, initKeyPath);
  //比较节点差异
  diffNode(prevNode, nextNode, prevNode.parent);

  //用新的节点替换旧的
  replace(appNode, initKeyPath, nextNode, callback);
}

/**
 * 比较两个节点的差异
 */
function diffNode(prevNode, nextNode, parent) {
  if (!prevNode && !nextNode) {
    return;
  }

  //console.log(prevNode, nextNode);

  //1. 增
  if (!prevNode && nextNode) {
    console.log("增", prevNode, nextNode);
    arrayize(nextNode, () => {
      renderNode(nextNode, parent);
    });
    return;
  }
  //2. 删
  if (prevNode && !nextNode) {
    console.log("删", prevNode, nextNode);
    removeNodeFromDocument(prevNode);
    return;
  }
  //3. 改
  if (prevNode.type === nextNode.type) {
    console.log("改", prevNode, nextNode);
    //将旧节点的el、parent复制到新节点
    const { el, parent } = prevNode;
    Object.assign(nextNode, { el, parent });

    setProps(el, nextNode.props);
  }

  //子元素
  const prevChildren = prevNode.children;
  const nextChildren = nextNode.children;
  if (isArray(prevChildren) && isArray(nextChildren)) {
    console.log(prevChildren, nextChildren);
    diffChildren(prevChildren, nextChildren, parent);
  } else {
    diffNode(prevChildren, nextChildren, prevChildren?.el || parent);
  }
}

/**
 * 比较节点子数组
 */
function diffChildren(prevChildren, nextChildren, parent) {
  const len = Math.max(prevChildren.length, nextChildren.length);
  let i = 0;
  while (i < len) {
    const prevChild = prevChildren[i];
    const nextChild = nextChildren[i];
    diffNode(prevChild, nextChild, prevChild?.el || parent);
    i++;
  }
}

/**
 * 将节点从文档中移除
 */
function removeNodeFromDocument(node) {
  const { type, parent, el, children } = node;
  if (isString(type)) {
    parent.removeChild(el);
  } else {
    arrayize(children, (child) => removeNodeFromDocument(child));
  }
}

/**
 * 将新的节点移替换到旧的
 */
function replace(appNode, keyPath, nextNode, callback) {
  let _appNode;

  const lastIndex = keyPath.length - 1;
  if (lastIndex === -1) {
    _appNode = nextNode;
  } else {
    keyPath.reduce((node, key, index) => {
      if (index !== lastIndex) {
        return node[key];
      } else {
        node[key] = nextNode;
      }
    }, appNode);

    _appNode = appNode;
  }

  callback(_appNode);
}

export default diff;
