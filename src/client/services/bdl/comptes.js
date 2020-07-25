import { get } from '../technique/api';

export default {
  getComptes: async (url) => await get(url),
  createCompte: async (url) => await get(url),
  getCompte: async (url) => await get(url),
};
