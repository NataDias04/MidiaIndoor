import express from 'express';
import ImagemControle from '../controle/imagem_controle.js';
import upload from '../config/multer.js';
import Imagem from '../modelos/imagem.js';

const router = express.Router();

router.post("/", upload.single("file"),ImagemControle.create)

router.delete("/:id", ImagemControle.remove)

router.get("/:id", ImagemControle.findOne);

router.get("/", ImagemControle.findAll)


export default router