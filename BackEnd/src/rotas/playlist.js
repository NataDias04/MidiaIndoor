import express from 'express';
import PlaylistControle from '../controle/playlist_controle.js';

const router = express.Router();

// Rota para criar uma nova playlist
router.post('/', PlaylistControle.create);

// Rota para buscar todas as playlists
router.get('/', PlaylistControle.findAll);

// Rota para buscar uma playlist específica pelo ID
router.get('/:id', PlaylistControle.findOne);

// Rota para excluir uma playlist pelo ID
router.delete('/:id', PlaylistControle.remove);

export default router;
