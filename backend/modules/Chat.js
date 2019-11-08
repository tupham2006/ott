module.exports = ($) => {
  let getChatList = async function() {
    var clientList = $.io.sockets.clients(async (err, clients) => {
      let userList = await $.models.User.find({sid: {'$in': clients}}, {id: 1, name: 1, _id: 0 }).exec();
      $.io.emit('$getChatList', userList);
    });
  };
  return {
    getChatList
  };
}