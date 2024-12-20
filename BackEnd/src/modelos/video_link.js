import mongoose from 'mongoose';

const videoLinkSchema = new mongoose.Schema({
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

const VideoLink = mongoose.model('VideoLink', videoLinkSchema);

export default VideoLink;
