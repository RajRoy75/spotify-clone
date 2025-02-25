const mongoose = require('mongoose');

const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index:true
  },
  thumbnail: {
    type: String,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});
Song.index({name:'text'});
const SongModel = mongoose.model('song',Song);
module.exports = SongModel;
