import { update } from "../dom/render.js";

const states = {};

function useState(componentName, key, initialValue) {
  key = `${componentName}.${key}`;

  if (states[key] === undefined) {
    if (initialValue !== undefined) {
      states[key] = initialValue;
    }
  }

  function setState(value) {
    states[key] = value;
    update();
  }

  return [states[key], setState];
}

export default useState;
