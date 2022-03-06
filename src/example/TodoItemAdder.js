/**
 * 代办项添加器
 * <div>
 *  <input/>
 *  <button>添加</button>
 * </div>
 */
function TodoItemAdder({ onAdd }) {
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

export default TodoItemAdder;
