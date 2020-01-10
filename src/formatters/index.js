import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const formats = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (ast, format) => formats[format](ast);
