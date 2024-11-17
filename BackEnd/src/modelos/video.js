import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  tipo:{
    type: String,
    default: "",
  },
  urlcache:{
    type: String,
    default: "",
  },
  data: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
