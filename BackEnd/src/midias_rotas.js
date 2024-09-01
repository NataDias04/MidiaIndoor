import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do multer para uploads locais

const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: armazenamento });

// Rota para upload de mídias (imagens e vídeos) ou links externos

router.post('/upload', upload.single('media'), (req, res) => {
  const { tipoMidia, linkExterno } = req.body;

  if (linkExterno) {
    return res.json({
      mensagem: 'Link externo processado com sucesso',
      tipoMidia: tipoMidia, // 'imagem' ou 'video'
      linkMidia: linkExterno,
    });
  }

  if (!req.file) {
    return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
  }

  //para upload local

  res.json({
    mensagem: 'Upload realizado com sucesso',
    tipoMidia: tipoMidia, // 'imagem' ou 'video'
    caminhoArquivo: `/uploads/${req.file.filename}`,
  });
});

// Rota para salvar texto com HTML e opcional imagem de fundo

router.post('/texto', (req, res) => {
  const { textoSimples, conteudoHTML, imagemFundo } = req.body;

  res.json({
    mensagem: 'Texto salvo com sucesso',
    dados: {
      textoSimples,
      conteudoHTML,
      imagemFundo: imagemFundo ? `/uploads/${imagemFundo}` : null,
    },
  });
});

export default router;
