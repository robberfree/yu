/**
 * 全部、已完成、未完成筛选
 */

function TodoFilter({ filter, onChange }) {
  const filters = [
    { label: "全部", value: 0 },
    { label: "已完成", value: 1 },
    { label: "未完成", value: 2 },
  ];
  return div(
    {
      className: "todo-filter",
    },
    filters.map(({ label: textContent, value }) =>
      div(
        {
          onclick: () => {
            onChange(value);
          },
        },
        [
          input({
            type: "radio",
            checked: filter === value,
          }),
          label({ textContent }),
        ]
      )
    )
  );
}

export default TodoFilter;
