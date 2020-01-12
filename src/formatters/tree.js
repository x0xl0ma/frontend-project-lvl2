const makeSpace = (level) => '  '.repeat(level);

const stringify = (data, depth) => {
  if (!(data instanceof Object)) {
    return data;
  }
  const entries = Object.entries(data);
  return `{\n  ${entries.map(([key, value]) => `${makeSpace(depth + 2)}${key}: ${value}`).join('\n')}\n${makeSpace(depth + 1)}}`;
};

const actions = {
  removed: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}- ${key}: ${stringify(value, depth)}`;
  },
  added: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}+ ${key}: ${stringify(value, depth)}`;
  },
  changed: (node, depth) => {
    const { key, valueBefore, valueAfter } = node;
    return `${makeSpace(depth)}- ${key}: ${stringify(valueBefore, depth)}\n${makeSpace(depth)}+ ${key}: ${stringify(valueAfter, depth)}`;
  },
  unchanged: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}  ${key}: ${stringify(value, depth)}`;
  },
  nested: (node, depth, rendering) => {
    const { key, children } = node;
    return `${makeSpace(depth)}  ${key}: {\n${rendering(children, depth + 2)}\n${makeSpace(depth + 1)}}`;
  },
};

const rendering = (tree, depth = 1) => tree.map((node) => actions[node.type](node, depth, rendering)).join('\n');

export default (tree) => `{\n${rendering(tree)}\n}`;
