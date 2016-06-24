const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  url: String,
  emotions: {
    smile: { type: Number },
    surprise: { type: Number },
    negative: { type: Number },
    attention: { type: Number }
  },
  vibes: [{ type: Schema.Types.ObjectId, ref: 'Vibe' }]
});

module.exports = mongoose.model('Project', projectSchema);
