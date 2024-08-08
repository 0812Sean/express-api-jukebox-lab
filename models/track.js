const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  coverArtUrl: { type: String, required: false },
  soundClipUrl: { type: String, required: false }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
