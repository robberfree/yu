import { update } from "../yu/dom/render.js";
import TodoFilter from "./TodoFilter.js";
import TodoAdder from "./TodoAdder.js";
import TodoLeft from "./TodoLeft.js";
import Todos from "./Todos.js";
import TodosCompleter from "./TodosCompleter.js";

/**
 * state：所有代办项
 */
const todos = Array.from({ length: 1000 }).map((_, index) => ({
  name: `买菜${index}`,
  completed: false,
}));

/**
 * state：过滤字段
 * 全部：0
 * 已完成：1
 * 未完成：2
 */
let filter = 0;

/**
 * 待办应用
 */
function TodoApp() {
  const addATodo = (name) => {
    const item = { name, completed: false };
    todos.unshift(item);

    update();
  };

  const removeATodo = (index) => {
    todos.splice(index, 1);

    update();
  };

  const changeATodo = (props, index) => {
    Object.assign(todos[index], props);

    update();
  };

  const changeTodosCompleted = (value) => {
    todos.forEach((todo) => {
      todo.completed = value;
    });

    update();
  };

  const changeFilter = (value) => {
    filter = value;

    update();
  };

  return div([
    //1
    TodoAdder({ onAdd: addATodo }),
    //2
    div({ className: "completer-filter" }, [
      TodosCompleter({ todos, onChange: changeTodosCompleted }),
      TodoFilter({ filter, onChange: changeFilter }),
    ]),
    //3
    Todos({ todos, filter, onChange: changeATodo, onRemove: removeATodo }),
    //4
    TodoLeft({ todos }),
  ]);
}

export default TodoApp;
