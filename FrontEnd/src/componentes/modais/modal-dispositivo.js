import React, { useState, useEffect } from 'react';
import '../../estilos/paginadispositivo.css';
import { salvarDispositivo } from '../rotas/dispositivo.js';
import { buscarPlaylists } from '../rotas/playlist.js';

const ModalDispositivo = ({ fecharModalDispositivo }) => {
  const [nome, setNome] = useState('');
  const [resolucao, setResolucao] = useState('');
  const [erro, setErro] = useState('');

  const [playlists, setPlaylists] = useState([]);
  const [playlistSelecionada, setPlaylistSelecionada] = useState(''); // Para uma única playlist
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    setErro('');
  };

  const handleResolucaoChange = (e) => {
    setResolucao(e.target.value);
    setErro('');
  };

  const handleSave = async () => {
    try {
      if (!resolucao) {
        setErro('A resolução não pode estar vazia.');
        return;
      }
      const tipo = isChecked ? 'sala-interna' : 'playlist';

      const response = await salvarDispositivo(nome, resolucao, tipo, playlistSelecionada);

      console.log('Dispositivo salvo com sucesso:', response);
      setErro('');
    } catch (error) {
      console.error('Erro ao salvar dispositivo:', error);
      setErro('Erro ao salvar dispositivo. Tente novamente.');
    }
  };

  const fetchPlaylists = async () => {
    setLoading(true);
    setError(null); 
    try {
      const data = await buscarPlaylists();
      setPlaylists(data);
    } catch (erro) {
      setError('Erro ao buscar playlists');
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handlePlaylistChange = (event) => {
    setPlaylistSelecionada(event.target.value); // Armazena apenas a playlist selecionada
  };

  const onSaveAndClose = async () => {
    await handleSave();
    fecharModalDispositivo();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-dispositivo">
          Criar dispositivo

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
            <label>Playlists Disponíveis</label>
            {loading ? (
              <p>Carregando playlists...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <div key={playlist._id} className="radio-group">
                    <input
                      type="radio" // Alterado para "radio"
                      id={`playlist-${playlist._id}`}
                      name="playlist"
                      value={playlist._id}
                      checked={playlistSelecionada === playlist._id} // Verifica se está selecionado
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

          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-dispositivo" onClick={onSaveAndClose}>Salvar</button>
            <button className="botao-modal-dispositivo" onClick={fecharModalDispositivo}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDispositivo;
