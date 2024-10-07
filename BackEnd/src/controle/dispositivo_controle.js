import Dispositivo from '../modelos/dispositivo.js';

// Criar um novo dispositivo
const create = async (req, res) => {
  try {
    const { nome, resolucao, playlist } = req.body;

    // Criar novo dispositivo
    const novoDispositivo = new Dispositivo({
      nome,
      resolucao,
      playlist // Playlist opcional
    });

    // Salvar o dispositivo no banco de dados
    await novoDispositivo.save();
    res.status(201).json({ mensagem: 'Dispositivo criado com sucesso!', dispositivo: novoDispositivo });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar dispositivo', erro: error.message });
  }
};

// Buscar todos os dispositivos
const findAll = async (req, res) => {
  try {
    // Buscar todos os dispositivos e popular a playlist
    const dispositivos = await Dispositivo.find().populate('playlist');
    res.json(dispositivos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar dispositivos', erro: error.message });
  }
};

// Buscar um dispositivo específico pelo ID
const findOne = async (req, res) => {
  try {
    // Buscar dispositivo pelo ID e popular a playlist
    const dispositivo = await Dispositivo.findById(req.params.id).populate('playlist');
    
    if (!dispositivo) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado' });
    }

    res.json(dispositivo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar dispositivo', erro: error.message });
  }
};

// Atualizar um dispositivo pelo ID
const update = async (req, res) => {
  try {
    const { nome, resolucao, playlist } = req.body;

    // Atualizar os campos do dispositivo
    const dispositivoAtualizado = await Dispositivo.findByIdAndUpdate(
      req.params.id,
      { nome, resolucao, playlist },
      { new: true, runValidators: true }
    );

    if (!dispositivoAtualizado) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado' });
    }

    res.json({ mensagem: 'Dispositivo atualizado com sucesso!', dispositivo: dispositivoAtualizado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar dispositivo', erro: error.message });
  }
};

// Remover um dispositivo pelo ID
const remove = async (req, res) => {
  try {
    // Remover o dispositivo pelo ID
    const dispositivo = await Dispositivo.findByIdAndDelete(req.params.id);

    if (!dispositivo) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado' });
    }

    res.json({ mensagem: 'Dispositivo removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir dispositivo', erro: error.message });
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
