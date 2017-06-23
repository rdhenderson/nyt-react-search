const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const findOrCreate = require('mongoose-find-or-create');

const ArticleSchema = new Schema({
  title: { type: String, trim: true, required: true },
  snippet: {type: String, trim: true},
  author: {type: String, trim: true},
  date: { type: Date, required: true},
  link: { type: String },
});

// ArticleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Article', ArticleSchema);
// ServerSchema.index({serverIp: 1}, {unique: true});
