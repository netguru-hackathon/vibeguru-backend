const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vibeSchema = new Schema({
  content: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vibe', vibeSchema);
