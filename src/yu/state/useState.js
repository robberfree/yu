import { update } from "../dom/render.js";

const states = {};

function useState(initialValue) {
  /**
   * useState绑定this，这样既可以保证useState的简洁，也可以把组件的实例key：instanceKey和useState的索引
   */
  const key = `${this.keyPath.join(".")}.${this.hookIndex}`;
  this.hookIndex += 1;

  if (states[key] === undefined) {
    if (initialValue !== undefined) {
      states[key] = initialValue;
    }
  }

  const setState = (value) => {
    states[key] = value;

    update(this.keyPath);
  };

  return [states[key], setState];
}

export default useState;
