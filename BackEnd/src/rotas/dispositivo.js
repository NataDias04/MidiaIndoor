import express from 'express';
import DispositivoControle from '../controle/dispositivo_controle.js';

const router = express.Router();

// Rota para adicionar um novo dispositivo
router.post('/adicionar', DispositivoControle.create);

// Rota para buscar todos os dispositivos
router.get('/', DispositivoControle.findAll);

// Rota para buscar um dispositivo específico pelo ID
router.get('/:id', DispositivoControle.findOne);

// Rota para atualizar as informações de um dispositivo pelo ID
router.put('/atualizar/:id', DispositivoControle.update);

// Rota para excluir um dispositivo pelo ID
router.delete('/excluir/:id', DispositivoControle.remove);

export default router;
