import h from "../yu/component/h.js";
import originalUseState from "../yu/state/useState.js";

/**
 * 代办项添加器
 */
function TodoAdder({ onAdd }) {
  const useState = originalUseState.bind({
    instanceKey: "TodoAdder0",
    index: 0,
  });

  const [value, setValue] = useState("");

  return div([
    input({
      value: value,
      oninput: (e) => {
        setValue(e.target.value);
      },
    }),
    button({
      textContent: "添加",
      onclick: () => {
        if (value) {
          onAdd(value);
        }
      },
    }),
  ]);
}

export default h(TodoAdder);
