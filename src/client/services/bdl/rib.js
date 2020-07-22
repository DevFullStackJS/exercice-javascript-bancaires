import { get, post } from '../technique/api';

export default {
  operations: async (url) => await get(url),
  oneRibOperation: async (url, data) => await post(url, data),
};
