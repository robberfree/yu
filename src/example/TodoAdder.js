/**
 * 代办项添加器
 */
function TodoAdder({ onAdd }) {
  const _input = input();

  return div([
    _input,
    button({
      textContent: "添加",
      onclick: () => {
        const value = _input.value;
        if (value) {
          onAdd(value);
        }
      },
    }),
  ]);
}

export default TodoAdder;
