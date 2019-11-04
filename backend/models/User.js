module.exports = ($) => {
  const users = new $.db.Schema({
    id: Number,
    sid: String,
    name: String,
    is_online: Number,
    game_id: Number,
    invite_list: Array
  });

  return $.db.model('users', users);
}
