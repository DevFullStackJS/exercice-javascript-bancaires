const express = require('express');
const todos = require("./todos");
const axios = require('axios');

const router = express.Router();

const urlData = 'https://agrcf.lib.id/exercice@dev/';

const getData = async () => {
  const result = await axios.get(urlData);
  if(result && result.data && result.data.statut === "OK") {
    return result.data.operations;
  }
}

router.get("/todos", function(req, res) {
  res.json(todos);
});

router.get("/test", async (req, res) => {
  const result = await getData();
  res.json(result);
});

router.post("/login", function(req, res) {
  res.json(todos);
});

module.exports = router;
