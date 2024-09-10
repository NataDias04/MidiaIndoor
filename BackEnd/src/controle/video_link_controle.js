import VideoLink from '../modelos/video_link.js';

const create = async (req, res) => {
  try {
    const { name, link } = req.body;

    if (!link) {
      return res.status(400).json({ mensagem: 'Nenhum link enviado' });
    }

    const videoLink = new VideoLink({
      name,
      link,
    });

    await videoLink.save();
    res.status(201).json({ mensagem: 'Link de vídeo salvo com sucesso!', videoLink });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar link de vídeo', erro: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const videoLinks = await VideoLink.find();
    res.json(videoLinks);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar links de vídeos', erro: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const videoLink = await VideoLink.findById(req.params.id);
    if (!videoLink) {
      return res.status(404).json({ mensagem: 'Link de vídeo não encontrado' });
    }
    res.json(videoLink);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar link de vídeo', erro: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const videoLink = await VideoLink.findById(req.params.id);
    if (!videoLink) {
      return res.status(404).json({ mensagem: 'Link de vídeo não encontrado' });
    }

    await VideoLink.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Link de vídeo removido com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir link de vídeo', erro: error.message });
  }
};

export default {
  create,
  remove,
  findOne,
  findAll,
};
