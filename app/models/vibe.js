const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vibeSchema = new Schema({
  image: String,
  created_at: { type: Date, default: Date.now },

  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Vibe', vibeSchema);
