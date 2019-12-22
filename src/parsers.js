import yaml from 'js-yaml';
import ini from 'ini';


const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yaml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

const parse = (data, type) => parsers[type](data);
export default parse;
