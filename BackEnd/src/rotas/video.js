import express from 'express';
import upload from '../config/multer.js';
import VideoControle from '../controle/video_controle.js';

const router = express.Router();

router.post('/', upload.single('video'), VideoControle.create);

router.delete('/:id', VideoControle.remove);

router.get('/:id', VideoControle.findOne);

router.get('/', VideoControle.findAll);

export default router;
