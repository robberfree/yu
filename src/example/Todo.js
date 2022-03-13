/**
 * 代办项
 */
function Todo({ name, completed, onChange, onRemove }) {
  return div([
    input({
      type: "checkbox",
      checked: completed,
      onchange: (e) => {
        onChange({ completed: e.target.checked });
      },
    }),
    label({
      textContent: name,
      contenteditable: true,
      onkeydown: (e) => {
        if (e.key === "Enter") {
          let value = e.target.textContent;
          //名字修改到没有名字了
          if (!value) {
            value = name;
          }
          onChange({ name: value });
        }
      },
    }),
    button({
      textContent: "删除",
      onclick: onRemove,
    }),
  ]);
}

export default Todo;
