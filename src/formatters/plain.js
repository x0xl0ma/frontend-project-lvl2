const renderedValue = (value) => (value instanceof Object ? '[complex value]' : `${value}`);

const actions = {
  removed: (node, acc) => {
    const { key } = node;
    return `Property '${acc}${key}' was removed`;
  },
  added: (node, acc) => {
    const { key, value } = node;
    return `Property '${acc}${key}' was added with value: '${renderedValue(value)}'`;
  },
  changed: (node, acc) => {
    const { key, valueBefore, valueAfter } = node;
    return `Property '${acc}${key}' was updated. From '${renderedValue(valueBefore)}' to '${renderedValue(valueAfter)}'`;
  },
  unchanged: (node, acc) => {
    const { key } = node;
    return `Property '${acc}${key}' was not changed`;
  },
  nested: (node, acc, render) => {
    const { key, children } = node;
    const path = `${acc}${key}.`;
    return render(children, path);
  },
};

const render = (tree, acc) => tree.map((node) => actions[node.type](node, acc, render)).join('\n');

export default render;
