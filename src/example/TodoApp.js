import TodoFilter from "./TodoFilter.js";
import TodoAdder from "./TodoAdder.js";
import TodoLeft from "./TodoLeft.js";
import Todos from "./Todos.js";
import TodosCompleter from "./TodosCompleter.js";
import originalUseState from "../yu/state/useState.js";
import Button from "./Button.js";

/**
 * 待办应用
 */
function TodoApp() {
  const useState = originalUseState.bind({ instanceKey: "TodoApp0", index: 0 });

  //所有代办项
  const [todos, setTodos] = useState(
    Array.from({ length: 1000 }).map((_, index) => ({
      name: `买菜${index}`,
      completed: false,
    }))
  );
  //过滤字段。全部：0、已完成：1，未完成：2
  const [filter, setFilter] = useState(0);

  const addATodo = (name) => {
    const item = { name, completed: false };
    todos.unshift(item);

    setTodos(todos);
  };

  const removeATodo = (index) => {
    todos.splice(index, 1);

    setTodos(todos);
  };

  const changeATodo = (props, index) => {
    Object.assign(todos[index], props);

    setTodos(todos);
  };

  const changeTodosCompleted = (value) => {
    todos.forEach((todo) => {
      todo.completed = value;
    });

    setTodos(todos);
  };

  const changeFilter = (value) => {
    setFilter(value);
  };

  return div([
    Button(),
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
