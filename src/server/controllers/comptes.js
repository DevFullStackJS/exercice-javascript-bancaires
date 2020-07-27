const Comptes = require('../models/comptes');
// const User = require('../models/users');

module.exports = {
  create: async (req, res) => {

    const id = req.user.id;
    const { rib } = req.body;
    const compte = await Comptes.create({
      rib,
      onwer: id,
    });
    const newCompte = await compte.save();

    // const userById = await User.findById(id);
    // userById.comptes.push(compte);
    // await userById.save();

    return res.send(newCompte);
  },
  remove: async (req, res) => {
    const comptes = await Comptes.findByIdAndRemove(req.params.id);
    res.json({ sucsess: comptes && comptes._id, _id: req.params.id });
  },
  view: async (req, res) => {
    const compte = await Comptes.findById(req.params.id);
    res.json(compte);
  },
  userByComptes: async (req, res) => {
    const { id } = req.params;
    const userByComptes = await Comptes.findById(id).populate('user');
    res.send(userByComptes);
  },
  list: async (_, res) => {
    const comptes = await Comptes.find();
    res.json(comptes);
  },
};
