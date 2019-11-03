module.exports = ($) => {
  let getChatList = function(socket) {
    let data = $.data, userList = [], i, user;
    for(i in data.clients) {
      user = data.sessions[data.clients[i].id];
      if(user && user.is_online) {
        userList.push({
          id: user.id,
          name: user.name,
        });
      }
    }
    socket.emit('$getChatList', userList);
  };
  return {
    getChatList
  };
}