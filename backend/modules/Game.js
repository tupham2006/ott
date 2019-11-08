module.exports = ($) => {
  let inviteGame = async (socket, payload) => {
    user = await $.models.User.findOne({ id: payload.params.id}).exec();
    if(!user) return false;
    inviter = await $.models.User.findOne({ sid: socket.id}).exec();
    if(!inviter) return false;
    user['invite_list'].push(inviter.id);
    await $.models.User.updateOne({ _id: user._id }, { invite_list: user['invite_list'] }).exec();
    $.io.to(user.sid).emit('$confirmInvite', {id: inviter.id, name: inviter.name});
  };

  let acceptInvite = async (socket, payload) => {
    user = await $.models.User.findOne({ sid: socket.id}).exec();
    inviter = await $.models.User.findOne({ id: payload.params.id}).exec();
    if(!user || !inviter || user['invite_list'].indexOf(inviter.id) == -1) {
      return false;
    }
    user['invite_list'] = user['invite_list'].filter(item => {
      return item != inviter.id;
    });

    let gameData = await createGame(user, inviter);
    await new $.models.Game(gameData).save();
    await $.models.User.updateOne({ _id: user._id }, {game_id: gameData.id, invite_list: user['invite_list'] }).exec();
    await $.models.User.updateOne({ _id: inviter._id }, {game_id: gameData.id}).exec();
    socket.emit("$createGame");
    $.io.to(inviter.sid).emit("$createGame");
  };

  let createGame = async (user, inviter) => {
    let id = await $.Common.newId($.models.Game);
    let gameData = {
      id: id,
      players: {

      },
      status: 1,
      background: 1,
      player_maps: {
        1: inviter.id,
        2: user.id
      },
      user_id_maps: {

      }
    };

    gameData.user_id_maps[inviter.id] = user.id;
    gameData.user_id_maps[user.id] = inviter.id;
    let troller = await $.models.Troller.findOne({ troller_id: 1 }, {_id: 0, __v: 0}).exec();
    troller = troller.toJSON();

    gameData.players[user.id] = $.Common.mergeObject({
      id: user.id,
      name:user.name,
      is_ready: 0,
    }, troller);

    gameData.players[inviter.id] = $.Common.mergeObject({
      id: inviter.id,
      name: inviter.name,
      is_ready: 0
    }, troller);

    return gameData;
  };

  let getTrollList = async () => {
    let trollers = await $.models.Troller.find().exec();
    return trollers;
  };

  let getBackgroundList = async () => {
    let backgrounds = await $.models.Background.find().exec();
    return backgrounds;
  };

  let selectTroller = async (socket, payload) => {
    let user = await $.models.User.findOne({ sid: socket.id }).exec();
    let gameData = await $.models.Game.findOne({ id: user.game_id}).exec();
    let troller = await $.models.Troller.findOne({ troller_id: payload.params.troller_id }, {_id: 0, __v: 0}).exec();
    troller = troller.toJSON();
    if(!gameData) {
      return false;
    }
    $.Common.mergeObject(gameData.players[user.id], troller);

    await $.models.Game.updateOne({ _id: gameData._id}, {players: gameData.players }).exec();
    let userId2 = await $.models.User.findOne({ id: gameData['user_id_maps'][user.id] }).exec();
    $.io.to(userId2.sid).emit("$selectTroller", gameData);
  }

  let selectBackground = async (socket, payload) => {
    let user = await $.models.User.findOne({ sid: socket.id }).exec();
    let gameData = await $.models.Game.findOne({ id: user.game_id}).exec();
    gameData.background = payload.params.background;
    await $.models.Game.updateOne({ _id: gameData._id}, {background: gameData.background}).exec();
    let userId2 = await $.models.User.findOne({ id: gameData['user_id_maps'][user.id] }).exec();
    $.io.to(userId2.sid).emit("$selectBackground", gameData);
  }

  let setReadyGame = async (socket, payload) => {
    let user = await $.models.User.findOne({ sid: socket.id }).exec();
    if(!user) return false;
    let gameData = await $.models.Game.findOne({ id: user.game_id}).exec();
    if(!gameData) return false;
    gameData.players[user.id].is_ready = payload.params.is_ready;
    await $.models.Game.updateOne({ _id: gameData._id }, { players: gameData.players }).exec();
    let userId2 = await $.models.User.findOne({ id: gameData['user_id_maps'][user.id] }).exec();
    if(gameData.players[gameData['user_id_maps'][user.id]].is_ready) {
      $.io.to(user.sid).emit("$startGame", gameData);
      $.io.to(userId2.sid).emit("$startGame", gameData);
      return true;
    }
    $.io.to(userId2.sid).emit("$setReadyGame", gameData);
  }

  let attack = async (socket, payload) => {
    let user = await $.models.User.findOne({ sid: socket.id }).exec();
    let gameData = await $.models.Game.findOne({ id: user.game_id}).exec();
    gameData.players[user.id].cur_atk_id = payload.params.cur_atk_id;
    await $.models.Game.updateOne({ id: user.game_id}, { players: gameData.players }).exec();

    if(!$.data.atk_waitings[user.game_id]) {
      $.data.atk_waitings[user.game_id] = true;
      setTimeout(async function(){
        let gameData = await $.models.Game.findOne({ id: user.game_id}).exec();
        gameData.players[user.id].cur_atk_id = payload.params.cur_atk_id;
        let player1 = gameData.players[user.id];
        let player2 = gameData.players[gameData.user_id_maps[user.id]];
        compareAttack(player1, player2);
        // Auto reset attack after 2 seconds
        let userId2 = await $.models.User.findOne({ id: gameData['user_id_maps'][user.id] }).exec();
        if(player1.hp == 0 || player2.hp == 0) {
          gameData.status = 0;
          if(player1.hp == player2.hp) {
            gameData.result = 3;
          }
          gameData.result = player1.hp > player2.hp ? player1.id : player2.id;
        }
        $.io.to(user.sid).emit("$attack", gameData);
        $.io.to(userId2.sid).emit("$attack", gameData);
        player1.cur_atk_id = null;
        player2.cur_atk_id = null;
        await $.models.Game.updateOne({ id: user.game_id },  gameData).exec();
        delete $.data.atk_waitings[user.game_id];
      }, 500);
    }
  };

  let compareAttack = (player1, player2) => {
    normalAttack(player1, player2);
  };

  let normalAttack = (player1, player2) => {
    if(player1.cur_atk_id == player2.cur_atk_id) {
      return true;
    }

    player1Win = (player1.cur_atk_id == 1 && player2.cur_atk_id == 2) ||
                (player1.cur_atk_id == 2 && player2.cur_atk_id == 3) ||
                (player1.cur_atk_id == 3 && player2.cur_atk_id == 1) ||
                (player1.cur_atk_id && !player2.cur_atk_id);
    if(player1Win) {
      player1.last_atk = $.Common.random(player1.min_atk, player1.max_atk);
      player2.hp -= player1.last_atk;
      player2.hp = player2.hp > 0 ? player2.hp : 0
    } else {
      player2.last_atk = $.Common.random(player2.min_atk, player2.max_atk);
      player1.hp -= player2.last_atk;
      player1.hp = player1.hp > 0 ? player1.hp : 0
    }
  }

  return {
    inviteGame,
    acceptInvite,
    getTrollList,
    getBackgroundList,
    selectTroller,
    selectBackground,
    setReadyGame,
    attack
  };
}