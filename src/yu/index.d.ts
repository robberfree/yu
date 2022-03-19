/**
 * 概念: Node
 *
 * 节点。一种对象化的数据结构。可以用来描述Component和Element。
 *
 */
interface Node {
  /**
   *  节点的类型
   */
  type: Function | "string";
  /**
   * 节点的属性
   */
  props: Record<string, any>;
  /**
   * 节点的子元素
   */
  children: Node[];
  /**
   * 节点对应的元素
   */
  el: Element;
  /**
   * 节点的父元素
   */
  parent: Element;
}

/**
 * 概念: Component
 *
 * 组件, 在yu里有且仅有函数组件。
 */

/**
 * 概念: Element
 *
 * 元素，真实的渲染到页面里的原属
 */
