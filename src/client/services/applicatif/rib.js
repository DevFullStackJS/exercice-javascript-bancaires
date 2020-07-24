import rib from '../bdl/rib';

export default {
  operations: async (url) => await rib.operations(url),
  oneRibOperation: async (url) => await rib.oneRibOperation(url),
};
