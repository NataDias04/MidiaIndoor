import Video from '../modelos/video.js';
import fs from 'fs';
import path from 'path';

const create = async (req, res) => {
  try {
    const { nome } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
    }

    const video = new Video({
      nome,
      url: file.path,
    });

    await video.save();
    res.status(201).json({ mensagem: 'Vídeo salvo com sucesso!', video });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao salvar vídeo', erro: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar vídeos', erro: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ mensagem: 'Vídeo não encontrado' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar vídeo', erro: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ mensagem: 'Vídeo não encontrado' });
    }

    if (video.url && fs.existsSync(video.url)) {
      fs.unlinkSync(video.url);
    }

    await Video.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Vídeo removido com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir vídeo', erro: error.message });
  }
};

export default {
  create,
  remove,
  findOne,
  findAll,
};
