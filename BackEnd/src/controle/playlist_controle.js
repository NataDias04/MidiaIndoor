import Playlist from '../modelos/playlist.js';

// Criar uma nova playlist
const create = async (req, res) => {
  try {
    const { nome, ordemMidias } = req.body;

    // Validação simples para garantir que nome e ordemMidias estejam presentes
    if (!nome || !ordemMidias || ordemMidias.length === 0) {
      return res.status(400).json({ mensagem: 'Dados incompletos' });
    }

    // Criar uma nova instância da Playlist
    const novaPlaylist = new Playlist({
      nome,
      ordemMidias
    });

    // Salvar a playlist no banco de dados
    await novaPlaylist.save();
    res.status(201).json({ mensagem: 'Playlist criada com sucesso!', playlist: novaPlaylist });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar playlist', erro: error.message });
  }
};

// Buscar todas as playlists
const findAll = async (req, res) => {
  try {
    // Buscar todas as playlists e popular as mídias associadas
    const playlists = await Playlist.find().populate('ordemMidias.midia');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlists', erro: error.message });
  }
};

// Buscar uma playlist específica por ID
const findOne = async (req, res) => {
  try {
    // Buscar uma playlist específica pelo ID e popular as mídias associadas
    const playlist = await Playlist.findById(req.params.id).populate('ordemMidias.midia');
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlist', erro: error.message });
  }
};

// Editar (atualizar) uma playlist por ID
const update = async (req, res) => {
  try {
    const { nome, ordemMidias } = req.body;

    // Buscar a playlist pelo ID
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    // Atualizar os campos se eles existirem no corpo da requisição
    if (nome) playlist.nome = nome;
    if (ordemMidias) playlist.ordemMidias = ordemMidias;

    // Salvar as alterações
    await playlist.save();
    res.json({ mensagem: 'Playlist atualizada com sucesso!', playlist });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar playlist', erro: error.message });
  }
};

// Deletar uma playlist por ID
const remove = async (req, res) => {
  try {
    // Verificar se a playlist existe
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    // Remover a playlist
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Playlist removida com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir playlist', erro: error.message });
  }
};

// Exportar os métodos
export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
