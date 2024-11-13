import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import ModalPosicao1Layout1 from './modais/modal-posicao1-layout1.js';
import ModalPosicao2Layout1 from './modais/modal-posicao2-layout1.js';
import '../estilos/paginaeditarplaylist.css';

const PaginaEditarPlaylist = () => {
  const { playlistId } = useParams(); // Obter o ID da playlist
  const navigate = useNavigate();
  
  const [ModalPosicao1Layout1Aberto, setModalPosicao1Layout1Aberto] = useState(false);
  const [ModalPosicao2Layout1Aberto, setModalPosicao2Layout1Aberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);
  const [PlaylistName, setPlaylistName] = useState('');
  const [erro, setErro] = useState(null);
  
  // Função para carregar a playlist
  const carregarPlaylist = async () => {
    try {
      const response = await fetch(`API_URL/playlists/${playlistId}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar a playlist');
      }
      const dadosPlaylist = await response.json();
      setPlaylistName(dadosPlaylist.nome); // Definir nome da playlist
      // Adicionar outros campos conforme necessário, como descrição e vídeos
    } catch (error) {
      console.error('Erro ao carregar playlist:', error);
    }
  };

  useEffect(() => {
    carregarPlaylist();
  }, [playlistId]);

  const atualizarPlaylist = async (playlistId, nome, uploads) => {
    try {
      const response = await fetch(`API_URL/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          uploads: uploads, 
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar a playlist');
      }

      const dadosAtualizados = await response.json();
      return dadosAtualizados; 
    } catch (error) {
      console.error('Erro ao atualizar playlist:', error);
      throw error;
    }
  };

  const handleSalvarPlaylist = async () => {
    try {
      await atualizarPlaylist(playlistId, PlaylistName, uploadsSelecionados);
      localStorage.clear();
      navigate('/central');
    } catch (error) {
      console.error('Erro ao salvar a playlist:', error);
      setErro('Ocorreu um erro ao salvar a playlist');
    }
  };

  const handlecancelar = () => {
    localStorage.clear();
    navigate('/layout');
  };

  return (
    <div className="dashbord-playlist-layout1">
      <div className="cabecalho-playlist-layout1">
        <input
          className='nome-playlist'
          type="text"
          placeholder="Insira o nome da playlist"
          value={PlaylistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>

      <div className='secao-layout1'>
        <div className='linha-layout1-layout1'>
          <div className='borda1-layout1-layout1'> 
            <FaPlus onClick={() => setModalPosicao1Layout1Aberto(true)} />
            {ModalPosicao1Layout1Aberto && (
              <ModalPosicao1Layout1 fecharModalPosicao1Layout1={() => setModalPosicao1Layout1Aberto(false)} atualizarUploadsSelecionados={setUploadsSelecionados} />
            )}
          </div>
          <div className='borda2-layout1-layout1'> 
            <FaPlus onClick={() => setModalPosicao2Layout1Aberto(true)} />
            {ModalPosicao2Layout1Aberto && (
              <ModalPosicao2Layout1 fecharModalPosicao2Layout1={() => setModalPosicao2Layout1Aberto(false)} atualizarUploadsSelecionados={setUploadsSelecionados} />
            )}
          </div>
        </div>
      </div>
      
      <div className="rodape-playlist-layout1">
        <button onClick={handlecancelar}>Cancelar</button>
        <button onClick={handleSalvarPlaylist}>Salvar</button>
      </div>
    </div>
  );
};

export default PaginaEditarPlaylist;
