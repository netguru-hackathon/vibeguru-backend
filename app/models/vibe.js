const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vibeSchema = new Schema({
  image: String,
  created_at: { type: Date, default: Date.now },
  emotions: {
    smile: { type: Number },
    surprise: { type: Number },
    negative: { type: Number },
    attetion: { type: Number }
  }
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Vibe', vibeSchema);
