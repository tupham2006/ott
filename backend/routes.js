var express = require('express');
var router = express.Router();

module.exports = ($, Game) => {
  router.get('/select', async (req, res) => {
    let data = {};
    data.trollList = await Game.getTrollList();
    data.backgroundList = await Game.getBackgroundList();

    if(req.cookies && req.cookies.ott) {
      let ott = {};
      try {
        ott = JSON.parse(req.cookies.ott);
      } catch(e) {
        console.error(e);
      }
      if(ott.user && ott.user.id) {
        let user = await $.models.User.findOne({ id: ott.user.id, _id: ott.user._id }).exec();
        if(user && user.game_id) {
          data.game = await $.models.Game.findOne({ id: user.game_id }).exec();
        }
      }
    }
    res.send(data);
  });

  router.post('/exitGame', async (req, res) => {
    if(req.cookies && req.cookies.ott) {
      let ott = {};
      try {
        ott = JSON.parse(req.cookies.ott);
      } catch(e) {
        console.error(e);
      }
      if(ott.user && ott.user.id) {
        let user = await $.models.User.findOne({ id: ott.user.id, _id: ott.user._id }).exec();
        if(user.game_id) {
          await $.models.User.updateOne({ _id: ott.user._id }, { game_id: 0 }).exec();
          let game = await $.models.Game.findOne({ id: user.game_id }).exec();
          let user2 = await $.models.User.findOne({ id: game['user_id_maps'][user.id] }).exec();
          $.io.to(user2.sid).emit("$gameIsCancel");
          await $.models.User.updateOne({ id: game['user_id_maps'][user.id] }, { game_id: 0 }).exec();
          await $.models.Game.deleteOne({ id: user.game_id }).exec();
        }
      }
    }
    res.send({});
  });

  return router;
}