module.exports = ($) => {
  let getChatList = async function() {
    let userList = await $.models.User.find({is_online: 1}, {id: 1, name: 1, _id: 0 }).exec();
    $.io.emit('$getChatList', userList);
  };
  return {
    getChatList
  };
}