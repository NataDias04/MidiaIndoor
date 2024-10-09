import express from 'express';
import  VideoLinkControle from '../controle/video_link_controle.js';

const router = express.Router();

// Rota para adicionar um vídeo via link
router.post('/adicionar', VideoLinkControle);

// Rota para excluir um vídeo via ID
router.delete('/excluir/:id', VideoLinkControle);

export default router;
