import Playlist from '../modelos/playlist.js'; // Importa o modelo de Playlist

// Criar uma nova playlist
const create = async (req, res) => {
  try {
    const { nome, midias, layout, ordemMidias } = req.body;

    if (!midias || !layout) {
      return res.status(400).json({ mensagem: 'Dados incompletos' });
    }

    const novaPlaylist = new Playlist({
      nome,
      midias,
      layout,
      ordemMidias, // Recebe as mídias e posições já organizadas
    });

    await novaPlaylist.save();
    res.status(201).json({ mensagem: 'Playlist criada com sucesso!', playlist: novaPlaylist });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar playlist', erro: error.message });
  }
};

// Buscar todas as playlists
const findAll = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('ordemMidias.midia');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlists', erro: error.message });
  }
};

// Buscar uma playlist específica por ID
const findOne = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('ordemMidias.midia');
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlist', erro: error.message });
  }
};

// Deletar uma playlist por ID
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
  remove,
};
