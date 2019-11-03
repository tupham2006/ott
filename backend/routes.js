var express = require('express');
var router = express.Router();

module.exports = ($, Game) => {
  router.get('/select', function (req, res) {
    let data = {
      trollList: Game.getTrollList(),
      backgroundList: Game.getBackgroundList()
    };
    res.send(data);
  });

  return router;
}