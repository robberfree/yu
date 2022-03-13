import h from "../yu/component/h.js";
import originalUseState from "../yu/state/useState.js";

function Button() {
  const useState = originalUseState.bind({ instanceKey: "Button0", index: 0 });

  const [count, setCount] = useState(0);

  return button({
    textContent: count,
    onclick: () => {
      setCount(count + 1);
    },
  });
}

export default h(Button);
