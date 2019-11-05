module.exports = ($) => {
  const trollers = new $.db.Schema({
    troller_id: Number,
    troller_name: String,
    max_hp: Number,
    hp: Number,
    min_atk: Number,
    max_atk: Number,
    desc: String,
    unti_name: String,
    unti_desc: String,
    unti_time: Number,
  });

  return $.db.model('trollers', trollers);
}
