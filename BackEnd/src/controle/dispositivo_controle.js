import Dispositivo from '../modelos/dispositivo.js';

const create = async (req, res) => {
  try {
    const { nome, tipo, resolucao, playlist } = req.body;

    // Se a playlist estiver vazia ou não fornecida, defina como null
    const playlistValue = playlist && playlist !== "" ? playlist : null;

    const novoDispositivo = new Dispositivo({
      nome,
      tipo,
      resolucao,
      playlist: playlistValue,
    });

    await novoDispositivo.save();
    res.status(201).json({ mensagem: 'Dispositivo criado com sucesso!', dispositivo: novoDispositivo });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar dispositivo', erro: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find().populate('playlist');
    res.json(dispositivos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar dispositivos', erro: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findById(req.params.id).populate('playlist');
    
    if (!dispositivo) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado' });
    }

    res.json(dispositivo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar dispositivo', erro: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { nome, tipo,resolucao, playlist } = req.body;

    // Se a playlist estiver vazia ou não fornecida, defina como null
    const playlistValue = playlist && playlist !== "" ? playlist : null;

    const dispositivoAtualizado = await Dispositivo.findByIdAndUpdate(
      req.params.id,
      { nome, tipo,resolucao, playlist: playlistValue },
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

const remove = async (req, res) => {
  try {
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
