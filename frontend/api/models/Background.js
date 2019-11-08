module.exports = ($) => {
  const backgrounds = new $.db.Schema({
    id: Number,
    name: String,
  });

  return $.db.model('backgrounds', backgrounds);
}
