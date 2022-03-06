import "./html.js";

let component;
let container;

function render(_component, _container) {
  component = _component;
  container = _container;

  container.appendChild(component());
}

function update() {
  container.appendChild(component());
}

export { render, update };
