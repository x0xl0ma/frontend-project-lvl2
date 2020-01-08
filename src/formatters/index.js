import renderTree from './tree';
import renderPlain from './plain';

const formats = {
  tree: renderTree,
  plain: renderPlain,
};

export default (ast, format) => formats[format](ast);
