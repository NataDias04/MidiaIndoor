import express from 'express';
import upload from '../config/multer.js';
import ImagemLinkControle from '../controle/imagem_link_controle.js';

const router = express.Router();

router.post('/', upload.single('file'), ImagemLinkControle.create);

router.delete('/:id', ImagemLinkControle.remove);

router.get('/:id', ImagemLinkControle.findOne);

router.get('/', ImagemLinkControle.findAll);

export default router;
