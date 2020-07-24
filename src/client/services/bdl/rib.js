import { get } from '../technique/api';

export default {
  operations: async (url) => await get(url),
  oneRibOperation: async (url) => await get(url),
};
