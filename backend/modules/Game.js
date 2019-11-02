module.exports = ($) => {
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
    user['status'] = inviter['status'] = 1;
    let gameData = createGame(user, inviter);
    socket.emit("$createGame", gameData);
    $.io.to(inviter.sid).emit("$createGame", gameData);
  };

  let createGame = (user, inviter) => {
    let gameId = $.data.games.length + 1;
    let gameData = {
      id: gameId,
      players: {

      },
      status: 0
    };

    gameData.players[user.id] = {
      id: user.id
    }

    gameData.players[inviter.id] = {
      id: inviter.id
    }

    $.data.games.push(gameData);
    return gameData;
  };

  return {
    inviteGame,
    acceptInvite
  };
}