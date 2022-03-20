import { isArray, isObject } from "../is/index.js";

/**
 * 组件的props和children参数，为了方便传递，有如下4种传参形式:
 *
 * 1. (props,children)
 * 2. (props)
 * 3. (children)
 * 4. ()
 */

function propsChildren(props, children) {
  //第1个参数有值，第2个参数无值
  if (props && !children) {
    if (isChildren(props)) {
      children = props;
      props = null;
    }
  }

  return {
    props,
    children,
  };
}

function isChildren(children) {
  return (
    isArray(children) ||
    (isObject(children) && children.typeof === Symbol.for("yu.node"))
  );
}

export default propsChildren;
