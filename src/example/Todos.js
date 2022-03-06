import TodoItem from "./ToDoItem.js";

/**
 * 代办项列表
 */
function Todos({ todos }) {
  return fragment(todos.map((item) => TodoItem(item)));
}

export default Todos;
