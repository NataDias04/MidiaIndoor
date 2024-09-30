import mongoose from 'mongoose';

const videoLinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const VideoLink = mongoose.model('VideoLink', videoLinkSchema);

export default VideoLink;
