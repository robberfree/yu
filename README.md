# yu

yu(鱼)是试验性前端框架。它大概有如下特点

- 依靠原生 js 能力。
- 不引入复杂的工程化。

## 函数组件

直觉上`函数`是很适合用于`组件定义`的。

函数:

```
输入 -> ... -> 输出
```

组件：

```
props -> ... -> 视图
```

```js
function (props)
{
    const state:any;

    const dom:HTMLElement;

    return dom;
}
```

```js
/**
 * 代办项
 * <div>
 *  <input type="checkbox"/>
 *  <label>name</label>
 *  <button>删除</button>
 * <div>
 */
function TodoItem(props) {
  const { name, completed } = props;

  const div = document.createElement("div");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = completed;

  const label = document.createElement("label");
  label.textContent = name;

  const button = document.createElement("button");
  button.textContent = "删除";

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);

  return div;
}

export default TodoItem;
```

但当你真的开始这样做的时候，你会发现如下问题:

1. 创建真实 dom 需要书写大量琐碎的代码。
2. 如何持久化一个`内部state`。
3. 如何侦听到`外部props`和 state 的变化，做最小 dom 更新。
4. 如何根据最小变化，持续返回最新的 dom，被整个框架捕获到。

## 创建 dom 优化

社区有两个方向：

1. 添加类似 jsx 支持。但这样做需要引入其他预处理器/编译器，将 jsx 代码转成标准的代码。因为浏览器本身是无法理解 jsx 语法的。jsx 的确让书写 dom 变得简单，但提前引入编译器，无疑让框架一开始就变得难懂。

https://github.com/facebook/jsx
https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

2. 使用 tagged template。

带标签的字符串，这种方式的确强大，原生支持类似 jsx 的效果。但是对于复杂结构的 dom，写起来很容易迷茫。为了不迷茫可能又需要和编译器结合起来用。

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

https://github.com/developit/htm

### 新做法

1. 从最终可执行的代码角度思考
2. 要在写起来很舒服=工程化多，写起来可能不舒服=工程少。
3. 将将原始的 html 标签也转成统一的函数定义。但这样也有危险，可能被其他人篡改。

```js
import { isArray, isObject } from "../is/index.js";

/**
 * 向window注入html标签函数
 */
["div", "input", "label", "button", "fragment"].forEach((tagName) => {
  /**
   * @param {object} props
   * @param {Component|[Component]} children
   * 为了方便传参，有如下4种传参情困过
   * 1. (props,children)
   * 2. (props)
   * 3. (children)
   * 4. ()
   */
  window[tagName] = function component(props, children) {
    if (props && !isObject(props)) {
      children = props;
    }

    const el = createElement(tagName, props);
    appendChild(el, children);
    return el;
  };
});

/**
 * 创建元素
 */
function createElement(tagName, props) {
  const el =
    tagName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(tagName);

  isObject(props) &&
    Object.keys(props).forEach((prop) => {
      el[prop] = props[prop];
    });
  return el;
}

/**
 * 附加子节点
 */
function appendChild(el, children) {
  children = isArray(children) ? children : [children];
  children.forEach((child) => {
    child && el.appendChild(child);
  });
}
```

```js
/**
 * 代办项
 * <div>
 *  <input type="checkbox"/>
 *  <label>name</label>
 *  <button>删除</button>
 * <div>
 */
function TodoItem(props) {
  const { name, completed } = props;

  return div([
    input({ type: "checkbox", checked: completed }),
    label({
      textContent: name,
    }),
    button({
      textContent: "删除",
    }),
  ]);
}

export default TodoItem;
```

## 整个系统捕获 state 更新

写到现在我们的待办程序，是一次性静态创建视图的。如何动态多次创建视图呢？
