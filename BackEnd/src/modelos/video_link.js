import mongoose from 'mongoose';

const videoLinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const VideoLink = mongoose.model('VideoLink', videoLinkSchema);

export default VideoLink;
