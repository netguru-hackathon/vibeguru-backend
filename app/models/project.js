const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  url: String,
  vibes: [{ type: Schema.Types.ObjectId, ref: 'Vibe' }],
});

module.exports = mongoose.model('Project', projectSchema);
