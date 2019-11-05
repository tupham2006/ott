module.exports = ($) => {
  const games = new $.db.Schema({
    id: Number,
    players: Object,
    status: Number,
    background: Number,
    player_maps: Object,
    user_id_maps: Object,
    is_ready: Number
  });

  return $.db.model('games', games);
}
