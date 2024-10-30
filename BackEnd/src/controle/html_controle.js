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
    const { conteudo, nome } = req.body;

    console.log('Nome recebido:', req.body.nome);

    if (!conteudo) {
      return res.status(400).json({ mensagem: 'Nenhum conteúdo HTML enviado' });
    }

    // Decodificar o conteúdo HTML antes de salvar
    const conteudoDecodificado = he.decode(conteudo).replace(/<\/?p[^>]*>/g, '');

    const novoHtml = new Html({ nome, conteudo: conteudoDecodificado });
    await novoHtml.save();

    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadsDir, `${nome}.html`);

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
    res.status(200).json(htmls);
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

const remove = async (req, res) => {
  try {
    const html = await Html.findById(req.params.id);
    if (!html) {
      return res.status(404).json({ mensagem: 'Conteúdo HTML não encontrado' });
    }

    // Definindo o caminho do arquivo que será removido
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadsDir, `${html.nome}.html`); // Assume que o nome é o campo que você salvou

    // Remover o arquivo HTML da pasta uploads
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Erro ao deletar o arquivo HTML:', error);
        return res.status(500).json({ mensagem: 'Erro ao deletar o arquivo HTML', erro: error.message });
      }
      // Se o arquivo foi removido com sucesso, então removemos do banco de dados
      Html.findByIdAndDelete(req.params.id)
        .then(() => {
          res.json({ mensagem: 'Conteúdo HTML removido com sucesso' });
        })
        .catch((deleteError) => {
          res.status(500).json({ mensagem: 'Erro ao excluir conteúdo HTML do banco de dados', erro: deleteError.message });
        });
    });
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
