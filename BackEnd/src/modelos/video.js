import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  tipo:{
    type: String,
  },
  urlcache:{
    type: String,
  },
  data: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
