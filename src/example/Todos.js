import h from "../yu/component/h.js";
import Todo from "./Todo.js";

/**
 * 所有代办项列表
 */
function Todos({ todos, filter, onChange, onRemove }) {
  const isShow = ({ completed }) => {
    if (filter === 1) {
      return completed === true;
    } else if (filter === 2) {
      return completed === false;
    } else {
      return true;
    }
  };

  return div(
    todos.map((item, index) => {
      return isShow(item)
        ? Todo({
            ...item,
            onChange: (props) => {
              onChange(props, index);
            },
            onRemove: () => {
              onRemove(index);
            },
          })
        : null;
    })
  );
}

export default h(Todos);
