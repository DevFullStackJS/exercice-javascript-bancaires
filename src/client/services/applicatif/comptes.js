import comptes from '../bdl/comptes';

export default {
  getComptes: async (url) => await comptes.getComptes(url),
  createCompte: async (url) => await comptes.createCompte(url),
  getCompte: async (url) => await comptes.getCompte(url),
};
