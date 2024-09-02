import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Midia from './midias_modelo.js'; // Importar o modelo

const router = Router();import { Router } from 'express';

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
router.post('/upload', upload.single('media'), async (req, res) => {
  const { tipoMidia, linkExterno, textoSimples, conteudoHTML } = req.body;

  const dadosMidia = {
    tipoMidia,
    linkExterno,
    textoSimples,
    conteudoHTML,
  };

  if (linkExterno) {
    dadosMidia.linkExterno = linkExterno;
  } else if (req.file) {
    dadosMidia.caminhoArquivo = `/uploads/${req.file.filename}`;
  } else {
    return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
  }

  try {
    const novaMidia = new Midia(dadosMidia);
    await novaMidia.save();

    res.json({
      mensagem: 'Upload realizado com sucesso',
      dados: novaMidia,
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar mídia', erro: error.message });
  }
});

// Rota para salvar texto com HTML e opcional imagem de fundo
router.post('/texto', upload.single('imagemFundo'), async (req, res) => {
  const { textoSimples, conteudoHTML } = req.body;
  const imagemFundo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const novaMidia = new Midia({
      textoSimples,
      conteudoHTML,
      imagemFundo,
    });

    await novaMidia.save();

    res.json({
      mensagem: 'Texto salvo com sucesso',
      dados: novaMidia,
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar texto', erro: error.message });
  }
});

export default router;
