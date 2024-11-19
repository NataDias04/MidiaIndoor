import React, { useState, useEffect } from 'react';
import '../../estilos/paginadispositivo.css';
import { atualizarDispositivo } from '../rotas/dispositivo.js'; 
import { buscarPlaylists } from '../rotas/playlist.js';

const ModalEditarDispositivo = ({ fecharModal, dispositivo }) => {
  const [nome, setNome] = useState('');
  const [resolucao, setResolucao] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [playlistSelecionada, setPlaylistSelecionada] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (dispositivo) {
      setNome(dispositivo.nome);
      setResolucao(dispositivo.resolucao);
      setPlaylistSelecionada(dispositivo.playlist || null); 
      setIsChecked(dispositivo.tipo === 'sala-interna');
    }
  }, [dispositivo]);

  useEffect(() => {
    fetchPlaylists();
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

  const handlePlaylistChange = (e) => {
    const value = e.target.value;
    setPlaylistSelecionada(value || null); 
  };

  const handleSave = async () => {
    try {
      if (!resolucao) {
        setErro('A resolução não pode estar vazia.');
        return;
      }
      const tipo = isChecked ? 'sala-interna' : 'playlist';
      const dispositivoAtualizado = {
        nome,
        resolucao,
        playlist: playlistSelecionada || null,
        tipo,
      };

      await atualizarDispositivo(dispositivo._id, dispositivoAtualizado);
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

          <div className="linha-check-box">
            Playlist
            <input
              type="checkbox"
              id="checkboxInput"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            Sala-interna
          </div>

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
            <label htmlFor="playlist">Playlists Disponíveis</label>
            {loading ? (
              <p>Carregando playlists...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                id="playlist"
                value={playlistSelecionada || ''}
                onChange={handlePlaylistChange}
              >
                <option value="">Nenhuma</option>
                {playlists.map((playlist) => (
                  <option key={playlist._id} value={playlist._id}>
                    {playlist.nome}
                  </option>
                ))}
              </select>
            )}
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
