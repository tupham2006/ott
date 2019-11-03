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
  };

  let createGame = (user, inviter) => {
    let gameId = $.data.games.length + 1;
    let gameData = {
      id: gameId,
      players: {

      },
      status: 0,
      background: 1
    };

    gameData.players[user.id] = {
      id: user.id,
      name:user.name
    }

    gameData.players[inviter.id] = {
      id: inviter.id,
      name: inviter.name,
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

  return {
    inviteGame,
    acceptInvite,
    getTrollList,
    getBackgroundList
  };
}