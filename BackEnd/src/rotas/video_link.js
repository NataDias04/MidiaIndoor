import express from 'express';
import VideoLinkControle from '../controle/video_link_controle.js';

const router = express.Router();

// Rota para adicionar um link de vídeo (JSON)
router.post('/', VideoLinkControle.create);

// Rota para excluir um link de vídeo por ID
router.delete('/:id', VideoLinkControle.remove);

// Rota para encontrar um link de vídeo por ID
router.get('/:id', VideoLinkControle.findOne);

// Rota para encontrar todos os links de vídeo
router.get('/', VideoLinkControle.findAll); 

export default router;
