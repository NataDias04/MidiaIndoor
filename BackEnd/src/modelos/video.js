import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
