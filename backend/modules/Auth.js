module.exports = ($) => {
  let startSession = async (socket) => {
    if($.data.clients[socket.id]) {
      return true;
    }

    // Get from cookie
    let cookies = $.Common.cookie(socket.handshake.headers.cookie);
    let user = cookies && cookies.ott && cookies.ott && cookies.ott.user;
    if(user) {
      user = await $.models.User.findOne({ id: user.id }).exec();
      if(user) {
        user.sid = socket.id;
        user.is_online = 1;
        $.data.clients[socket.id] = { id: user.id };
        await $.models.User.updateOne({
          '_id': user._id
        }, user).exec();
      }
    }

    if(!user) {
      const id = await $.Common.newId($.models.User);
      $.data.clients[socket.id] = { id: id };
      user = {
        id: id,
        sid: socket.id,
        name: `Cừu cuteeee ${id}`,
        invite_list: {},
        game_id: 0,
        is_online: 1
      };
      await new $.models.User(user).save();
    }
    socket.emit("$updateUser", user);
    $.modules.Chat.getChatList();
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