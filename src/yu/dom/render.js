import "./html.js";

let component;
let container;

/**
 * 将组件渲染到容器
 */
function render(_component, _container) {
  component = _component;
  container = _container;

  container.appendChild(component());
}

/**
 * 更新
 */
function update() {
  //1. 移除container下面的元素。
  container.childNodes.forEach((node) => {
    container.removeChild(node);
  });

  //2. 重新渲染
  container.appendChild(component());
}

export { render, update };
