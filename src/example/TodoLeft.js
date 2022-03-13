import h from "../yu/component/h.js";
/**
 * 剩余代办项
 */
function TodoLeft({ todos }) {
  const left = todos.filter(({ completed }) => !completed).length;

  return div({ textContent: `未完成代办项: ${left}` });
}

export default h(TodoLeft);
