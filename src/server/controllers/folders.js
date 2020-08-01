const Folders = require('../models/folders');

module.exports = {
  create: async (req, res) => {

    const id = req.user.id;
    const folder = await Folders.create({ ...req.body, onwer: id });
    const newFolders = await folder.save();

    return res.send(newFolders);
  },
  remove: async (req, res) => {
    const folders = await Folders.findByIdAndRemove(req.params.id);
    res.json({ sucsess: folders && folders._id, _id: req.params.id });
  },
  view: async (req, res) => {
    const folder = await Folders.findById(req.params.id);
    res.json(folder);
  },
  foldersByCompte: async (req, res) => {
    const { id } = req.params;
    const foldersByCompte = await Folders.findById(id).populate('onwer');
    res.send(foldersByCompte);
  },
  list: async (_, res) => {
    const folders = await Folders.find();
    res.json(folders);
  },
};
