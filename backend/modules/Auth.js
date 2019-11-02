module.exports = ($) => {
  let startSession = (socket) => {
    if($.data.clients[socket.id]) {
      return true;
    }

    // Get from cookie
    let cookies = $.Common.cookie(socket.handshake.headers.cookie);
    let user = cookies && cookies.ott && cookies.ott && cookies.ott.user;
    if(user) {
      user = $.data.sessions[cookies.ott.user.id];
      if(user) {
        user.sid = socket.id;
        $.data.clients[socket.id] = { id: user.id };
      }
    }

    if(!user) {
      const id = $.Common.unix();
      $.data.clients[socket.id] = { id: id };
      user = $.data.sessions[id] = {
        id: id,
        sid: socket.id,
        name: 'Cừu cuteeee',
        invite_list: {},
        status: 0
      };
    }
    socket.emit("$updateUser", user);
  };

  let auth = (socket, cookies) => {
    if(!cookies || !cookies.user) return false;
    var user = cookies.user;
    if($.data.clients[socket.id] && $.data.clients[socket.id].id == user.id) {
      return $.data.sessions[user.id];
    }
    return false
  };

  let updateUser = (socket, payload) => {
    let user = auth(socket, payload.cookies);
    if(!user) return false;
    let params = payload.params;
    let i;
    for(i in params){
      user[i] = params[i];
    }
    socket.emit("$updateUser", user);
  };

  return {
    startSession,
    updateUser,
  };
}