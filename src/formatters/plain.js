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
  nested: (node, acc, rendering) => {
    const { key, children } = node;
    const path = `${acc}${key}.`;
    return rendering(children, path);
  },
};

const rendering = (tree, acc = '') => tree.map((node) => actions[node.type](node, acc, rendering)).join('\n');

export default rendering;
