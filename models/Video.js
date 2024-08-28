const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  sequence: { type: Number, required: true } 
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
