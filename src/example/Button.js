import h from "../yu/component/h.js";

function Button() {
  const useState = this.useState;

  const [count, setCount] = useState(0);

  return button({
    textContent: count,
    onclick: () => {
      setCount(count + 1);
    },
  });
}

export default h(Button);
