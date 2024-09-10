import Html from '../modelos/html.js';

// Criar novo conteúdo HTML
const create = async (req, res) => {
  try {
    const { conteudoHtml } = req.body;

    if (!conteudoHtml) {
      return res.status(400).json({ mensagem: 'Nenhum conteúdo HTML enviado' });
    }

    const novoHtml = new Html({ conteudoHtml });
    await novoHtml.save();
    res.status(201).json({ mensagem: 'Conteúdo HTML salvo com sucesso!', novoHtml });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar conteúdo HTML', erro: error.message });
  }
};

// Buscar todos os conteúdos HTML
const findAll = async (req, res) => {
  try {
    const htmls = await Html.find();
    res.json(htmls);
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
