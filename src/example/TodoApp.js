import { update } from "../yu/dom/render.js";
import TodoFilter from "./TodoFilter.js";
import TodoItemAdder from "./TodoItemAdder.js";
import TodoLeft from "./TodoLeft.js";
import Todos from "./Todos.js";

/**
 * 待办应用
 * <div>
 *  <TodoItemAdder/>
 *  <div>
 *    <input type="checkbox">
 *    <Filter/>
 *  </div>
 *  [<TodoItem/>]
 * </div>
 *
 */
function TodoApp() {
  const data = [
    {
      name: "买菜",
      completed: false,
    },
    {
      name: "种花",
      completed: true,
    },
  ];

  const addTodoItem = (name) => {
    const item = { name, completed: false };
    data.push(item);

    update();
  };

  return div([
    //1
    TodoItemAdder({ onAdd: addTodoItem }),
    //2
    div({ className: "checkbox-todo-filter" }, [
      input({ type: "checkbox" }),
      TodoFilter({ by: "全部" }),
    ]),
    //3
    Todos({ todos: data }),
    //4
    TodoLeft({ todos: data }),
  ]);
}

export default TodoApp;
