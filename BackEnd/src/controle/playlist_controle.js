import Playlist from '../modelos/playlist.js';

const create = async (req, res) => {
  try {
    const { nome, ordemMidias } = req.body;

    if (!nome || !ordemMidias || ordemMidias.length === 0) {
      return res.status(400).json({ mensagem: 'Dados incompletos' });
    }

    const novaPlaylist = new Playlist({
      nome,
      ordemMidias
    });

    await novaPlaylist.save();
    res.status(201).json({ mensagem: 'Playlist criada com sucesso!', playlist: novaPlaylist });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar playlist', erro: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlists', erro: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlist', erro: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { nome, ordemMidias } = req.body;

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    if (nome) playlist.nome = nome;
    if (ordemMidias) playlist.ordemMidias = ordemMidias;

    await playlist.save();
    res.json({ mensagem: 'Playlist atualizada com sucesso!', playlist });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar playlist', erro: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Playlist removida com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir playlist', erro: error.message });
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
