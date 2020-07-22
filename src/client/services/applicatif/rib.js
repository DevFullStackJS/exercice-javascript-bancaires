import rib from '../bdl/rib';

export default {
  operations: async (url, data) => await rib.operations(url, data),
  oneRibOperation: async (url, data) => await rib.oneRibOperation(url, data),
};
