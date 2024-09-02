import express from 'express';
import ImagemControle from '../controle/imagem_controle.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post("/", upload.single("file"),ImagemControle.create)

export default router