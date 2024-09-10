import express from 'express';
import textoControle from '../controle/texto_simples_controle.js';

const router = express.Router();

router.post('/', textoControle.create);
router.get('/', textoControle.findAll);
router.get('/:id', textoControle.findOne);
router.delete('/:id', textoControle.remove);

export default router;
