import Texto from '../modelos/texto_simples.js';

const create = async (req, res) => {
  try {
    const { conteudo } = req.body;

    if (!conteudo) {
      return res.status(400).json({ mensagem: 'Nenhum conteúdo enviado' });
    }

    const novoTexto = new Texto({ conteudo });
    await novoTexto.save();
    res.status(201).json({ mensagem: 'Texto salvo com sucesso!', novoTexto });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar texto', erro: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const textos = await Texto.find();
    res.json(textos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar textos', erro: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const texto = await Texto.findById(req.params.id);
    if (!texto) {
      return res.status(404).json({ mensagem: 'Texto não encontrado' });
    }
    res.json(texto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar texto', erro: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const texto = await Texto.findById(req.params.id);
    if (!texto) {
      return res.status(404).json({ mensagem: 'Texto não encontrado' });
    }

    await Texto.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Texto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir texto', erro: error.message });
  }
};

export default {
  create,
  findAll,
  findOne,
  remove,
};
