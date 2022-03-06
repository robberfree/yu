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
