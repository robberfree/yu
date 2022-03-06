/**
 * 全部、已完成、未完成筛选
 *
 * <div>
 *  <input type="radio" name="filter"/>
 *  <label>全部</label>
 *  ...
 * <div>
 */

function TodoFilter({ by }) {
  return div(
    ["全部", "已完成", "未完成"].map((_by) =>
      fragment(null, [
        input({ type: "radio", checked: by === _by }),
        label({ textContent: _by }),
      ])
    )
  );
}

export default TodoFilter;
