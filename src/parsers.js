import yaml from 'js-yaml';
import ini from 'ini';


const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, type) => parsers[type](data);
export default parse;
