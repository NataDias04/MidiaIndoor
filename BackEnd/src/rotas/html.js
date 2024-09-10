import express from 'express';
import htmlControle from '../controle/html_controle.js';

const router = express.Router();

router.post('/', htmlControle.create);       // Rota para criar novo conteúdo HTML
router.get('/', htmlControle.findAll);       // Rota para buscar todos os conteúdos HTML
router.get('/:id', htmlControle.findOne);    // Rota para buscar um conteúdo HTML específico
router.delete('/:id', htmlControle.remove);  // Rota para excluir um conteúdo HTML

export default router;
