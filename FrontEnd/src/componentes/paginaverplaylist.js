import React, { useState, useEffect } from 'react';
import '../estilos/paginaverplaylist.css';

import { useNavigate } from 'react-router-dom';
import { FaTabletAlt } from 'react-icons/fa'; // Ícone de tablet
import { buscarPlaylists, deletarPlaylist } from './rotas/playlist.js'; // Função para buscar playlists

const PaginaVerPlaylist = () => {
  const [playlists, setPlaylists] = useState([]); // Estado para armazenar playlists
  const navigate = useNavigate();


  // Função para buscar as playlists
  const carregarPlaylists = async () => {
    try {
      const listaPlaylists = await buscarPlaylists(); // Chamada à API
      setPlaylists(listaPlaylists);
    } catch (erro) {
      console.error('Erro ao carregar playlists:', erro);
    }
  };

  // Chama a função de busca ao carregar o componente
  useEffect(() => {
    carregarPlaylists();
  }, []);

  // Função para navegar para outra página
  const irParaCentral = () => {
    navigate('/central');
  };

  const apagarPlaylist = async (playlist) => {
    try {
      await deletarPlaylist(playlist._id);
      carregarPlaylists();
    } catch (error) {
      console.error("Erro ao deletar playlist", error);
    }
  };

  const EditarPlaylist = (playlistId) => {
    navigate(`/paginaeditarplaylist/${playlistId}`);
  };


  return (
    <div className="dashbord-ver-playlist">
      <div className="cabecalho-ver-playlist">cabeçalho</div>

      <div className='secao-ver-playlist'>
        <div className='previews-ver-playlist'>
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <div key={index} className="playlist-item">
                <FaTabletAlt className="icone-tablet" /> {/* Ícone de tablet */}
                <p className="nome-playlist">{playlist.nome}</p>
                <button
                  className="botao-apagar-playlist"
                  onClick={() => apagarPlaylist(playlist)}
                >
                  ×
                </button>
                <button
                  className="botao-editar-playlist"
                  onClick={() =>  EditarPlaylist(playlist._id)}
                >
                  Editar
                </button>
              </div>
            ))
          ) : (
            <p>Nenhuma playlist encontrada.</p>
          )}
        </div>
      </div>

      <div className="rodape-ver-playlist">
        <button className="botao-anterior-central-ver-playlist" onClick={irParaCentral}>cancelar</button>
        <button className="botao-anterior-central-ver-playlist" onClick={irParaCentral}>salvar</button>
      </div>
    </div>
  );
};

export default PaginaVerPlaylist;
