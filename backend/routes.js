var express = require('express');
var router = express.Router();

module.exports = ($, Game) => {
  router.get('/select', async (req, res) => {
    let data = {};
    data.trollList = await Game.getTrollList();
    data.backgroundList = await Game.getBackgroundList();
    res.send(data);
  });

  return router;
}