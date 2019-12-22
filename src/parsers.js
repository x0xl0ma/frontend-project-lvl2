import yaml from 'js-yaml';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yaml': (data) => yaml.safeLoad(data),
};

const parse = (data, type) => parsers[type](data);

export default parse;

