import { h } from "../yu/index.js";
/**
 * 全部待办项完成状态变更器
 */
function TodosCompleter({ todos, onChange }) {
  let checked =
    todos.length === 0 ? false : todos.every(({ completed }) => completed);

  let indeterminate =
    todos.some(({ completed }) => completed) &&
    todos.some(({ completed }) => !completed);

  return input({
    type: "checkbox",
    checked,
    indeterminate,
    onchange: (e) => {
      onChange(e.target.checked);
    },
  });
}

export default h(TodosCompleter);
