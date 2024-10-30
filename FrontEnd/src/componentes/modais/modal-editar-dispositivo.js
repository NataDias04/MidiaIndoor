import React, { useState, useEffect } from 'react';
import '../../estilos/paginadispositivo.css';
import { atualizarDispositivo } from '../rotas/dispositivo.js'; 
import { buscarPlaylists } from '../rotas/playlist.js'; // Importa função para buscar playlists

const ModalEditarDispositivo = ({ fecharModal, dispositivo }) => {
  const [nome, setNome] = useState('');
  const [resolucao, setResolucao] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [playlistsSelecionadas, setPlaylistsSelecionadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (dispositivo) {
      setNome(dispositivo.nome);
      setResolucao(dispositivo.resolucao);
      setPlaylistsSelecionadas(dispositivo.playlists || []); // Inicializa playlists já atribuídas
    }
  }, [dispositivo]);

  useEffect(() => {
    fetchPlaylists(); // Carrega playlists disponíveis ao abrir o modal
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const data = await buscarPlaylists();
      setPlaylists(data);
    } catch (erro) {
      console.error('Erro ao buscar playlists:', erro);
      setError('Erro ao buscar playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    setErro('');
  };

  const handleResolucaoChange = (e) => {
    setResolucao(e.target.value);
    setErro('');
  };

  const handlePlaylistChange = (event) => {
    const { value, checked } = event.target;

    if (checked && !playlistsSelecionadas.includes(value)) {
      setPlaylistsSelecionadas([...playlistsSelecionadas, value]);
    } else if (!checked) {
      setPlaylistsSelecionadas(playlistsSelecionadas.filter(id => id !== value));
    }
  };

  const handleRemovePlaylist = (id) => {
    setPlaylistsSelecionadas(playlistsSelecionadas.filter(item => item !== id));
  };

  const handleSave = async () => {
    try {
      if (!resolucao) {
        setErro('A resolução não pode estar vazia.');
        return;
      }

      const response = await atualizarDispositivo(dispositivo._id, nome, resolucao, playlistsSelecionadas);
      console.log('Dispositivo atualizado com sucesso:', response);
      setErro('');
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error);
      setErro('Erro ao atualizar dispositivo. Tente novamente.');
    }
  };

  const onSaveAndClose = async () => {
    await handleSave();
    fecharModal();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-dispositivo">
          <h2>Editar Dispositivo</h2>

          <div className="input-group">
            <label htmlFor="nome">Nome do Dispositivo</label>
            <input
              type="text"
              id="nome"
              placeholder="Insira o nome do dispositivo"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="resolucao">Resolução</label>
            <select
              id="resolucao"
              value={resolucao}
              onChange={handleResolucaoChange}
            >
              <option value="">Selecione uma resolução</option>
              <option value="1920x1080">1920x1080 (Full HD)</option>
              <option value="1280x720">1280x720 (HD)</option>
              <option value="3840x2160">3840x2160 (4K UHD)</option>
              <option value="2560x1440">2560x1440 (QHD)</option>
              <option value="1366x768">1366x768 (HD Ready)</option>
            </select>
          </div>

          <div className="input-group">
            <label>Playlists Disponíveis</label>
            {loading ? (
              <p>Carregando playlists...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <div key={playlist._id} className="checkbox-group">
                    <input
                      type="checkbox"
                      id={`playlist-${playlist._id}`}
                      value={playlist._id}
                      checked={playlistsSelecionadas.includes(playlist._id)}
                      onChange={handlePlaylistChange}
                    />
                    <label htmlFor={`playlist-${playlist._id}`}>{playlist.nome}</label>
                  </div>
                ))
              ) : (
                <p>Nenhuma playlist encontrada.</p>
              )
            )}
          </div>

          <div className="playlists-selecionadas">
            <h3>Playlists Selecionadas</h3>
            {playlistsSelecionadas.map((id) => {
              const playlist = playlists.find((p) => p._id === id);
              return (
                <div key={id} className="dispositivo-item">
                  <span>{playlist?.nome || 'Playlist desconhecida'}</span>
                  <button onClick={() => handleRemovePlaylist(id)}>Remover</button>
                </div>
              );
            })}
          </div>

          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-dispositivo" onClick={onSaveAndClose}>
              Salvar
            </button>
            <button className="botao-modal-dispositivo" onClick={fecharModal}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditarDispositivo;
