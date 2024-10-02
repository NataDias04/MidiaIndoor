import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Html from '../modelos/html.js';
import he from 'he'; // Importando a biblioteca he

// Definir __dirname em módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar novo conteúdo HTML
const create = async (req, res) => {
  try {
    const { conteudoHtml, titulo } = req.body;

    if (!conteudoHtml) {
      return res.status(400).json({ mensagem: 'Nenhum conteúdo HTML enviado' });
    }

    // Decodificar o conteúdo HTML antes de salvar
    const conteudoDecodificado = he.decode(conteudoHtml);

    // Criar o novo documento no MongoDB
    const novoHtml = new Html({ conteudoHtml: conteudoDecodificado, titulo });
    await novoHtml.save();

    // Definir o caminho para salvar o arquivo HTML
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadsDir, `${titulo || 'conteudo'}.html`);

    // Verificar se o diretório existe, se não, criar
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Escrever o conteúdo HTML decodificado no arquivo
    fs.writeFile(filePath, conteudoDecodificado, (error) => {
      if (error) {
        console.error('Erro ao criar arquivo HTML:', error);
        return res.status(500).json({ mensagem: 'Erro ao criar arquivo HTML', erro: error.message });
      }
      res.status(201).json({ mensagem: 'Conteúdo HTML salvo com sucesso!', novoHtml });
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar conteúdo HTML', erro: error.message });
  }
};

// Buscar todos os conteúdos HTML
const findAll = async (req, res) => {
  try {
    const htmls = await Html.find();
    res.status(200).json(htmls);  // Envia a resposta com status 200 e os dados
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar conteúdos HTML', erro: error.message });
  }
};

// Buscar um conteúdo HTML específico
const findOne = async (req, res) => {
  try {
    const html = await Html.findById(req.params.id);
    if (!html) {
      return res.status(404).json({ mensagem: 'Conteúdo HTML não encontrado' });
    }
    res.json(html);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar conteúdo HTML', erro: error.message });
  }
};

// Remover um conteúdo HTML
const remove = async (req, res) => {
  try {
    const html = await Html.findById(req.params.id);
    if (!html) {
      return res.status(404).json({ mensagem: 'Conteúdo HTML não encontrado' });
    }

    await Html.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Conteúdo HTML removido com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir conteúdo HTML', erro: error.message });
  }
};

export default {
  create,
  findAll,
  findOne,
  remove,
};
