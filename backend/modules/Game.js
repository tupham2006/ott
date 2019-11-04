module.exports = ($) => {
  const trollers = require($.basePath + '/data/trollers.json');
  const backgrounds = require($.basePath + '/data/backgrounds.json');
  let inviteGame = (socket, payload) => {
    let user = $.data.sessions[payload.params.id];
    if(!user) return false;
    let inviter = $.data.sessions[$.data.clients[socket.id].id];

    user['invite_list'][inviter.id] = inviter;

    $.io.to(user.sid).emit('$confirmInvite', {id: inviter.id, name: inviter.name});
  };

  let acceptInvite = (socket, payload) => {
    let user = $.data.sessions[$.data.clients[socket.id].id];
    let inviter = $.data.sessions[payload.params.id];
    if(!user['invite_list'][inviter.id]) return false;
    delete user['invite_list'][inviter.id];
    let gameData = createGame(user, inviter);
    user['game_id'] = inviter['game_id'] = gameData.id;
    socket.emit("$createGame", gameData);
    $.io.to(inviter.sid).emit("$createGame", gameData);
    $.io.to(user.sid).emit("$updateUser", user);
    $.io.to(inviter.sid).emit("$updateUser", inviter);
  };

  let createGame = (user, inviter) => {
    let gameId = $.data.games.length;
    let gameData = {
      id: gameId,
      players: {

      },
      status: 0,
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

    gameData.players[user.id] = {
      id: user.id,
      name:user.name,
      troller_id: 1,
      troller_name: trollers[1].name
    }

    gameData.players[inviter.id] = {
      id: inviter.id,
      name: inviter.name,
      troller_id: 1,
      troller_name: trollers[1].name
    }

    $.data.games.push(gameData);
    return gameData;
  };

  let getTrollList = () => {
    return trollers;
  };

  let getBackgroundList = () => {
    return backgrounds;
  };

  let selectTroller = (socket, payload) => {
    let games = $.data.games;
    let user = $.Common.userBySocket(socket);
    let gameData = games[user.game_id];
    gameData.players[user.id].troller_id = payload.params.troller_id;
    gameData.players[user.id].troller_name = trollers[payload.params.troller_id].name;
    let userId2 = gameData['user_id_maps'][user.id];
    $.io.to($.data.sessions[userId2].sid).emit("$selectTroller", gameData);
  }

  let selectBackground = (socket, payload) => {
    let games = $.data.games;
    let user = $.Common.userBySocket(socket);
    let gameData = games[user.game_id];
    gameData.background = payload.params.background;
    let userId2 = gameData['user_id_maps'][user.id];
    $.io.to($.data.sessions[userId2].sid).emit("$selectBackground", gameData);
  }

  return {
    inviteGame,
    acceptInvite,
    getTrollList,
    getBackgroundList,
    selectTroller,
    selectBackground
  };
}