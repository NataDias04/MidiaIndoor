import React, { useState, useEffect } from 'react';
import '../estilos/paginaverplaylist.css';

import { useNavigate, useParams } from 'react-router-dom';
import { FaTabletAlt } from 'react-icons/fa';
import { buscarPlaylists, deletarPlaylist } from './rotas/playlist.js';


const PaginaVerPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const carregarPlaylists = async () => {
    try {
      const listaPlaylists = await buscarPlaylists();
      setPlaylists(listaPlaylists);
    } catch (erro) {
      console.error('Erro ao carregar playlists:', erro);
    }
  };

  useEffect(() => {
    carregarPlaylists();
  }, []);

  const irParaCentral = () => {
    navigate('/central');
  };

  
  const irParaEditar = async (playlistId)=> {
    navigate ('/editarplaylist')
  }

  const apagarPlaylist = async (playlist) =>{
    try {
      await deletarPlaylist(playlist._id);
      carregarPlaylists();
    } catch (error) {
      console.error("Erro ao deletar playlist", error);
    }
  };

  return (
    <div className="dashbord-ver-playlist">

      <div className="cabecalho-ver-playlist"></div>

      <div className='secao-ver-playlist'>
        <div className='previews-ver-playlist'>
            {playlists.length > 0 ? (
                  playlists.map((playlist, index) => (
                    <div key={index} className="playlist-item">
                      <FaTabletAlt className="icone-tablet" />
                      <p className="nome-playlist">{playlist.nome}</p>
                      <button
                        className="botao-apagar-playlist"
                        onClick={() => apagarPlaylist(playlist)}
                      >
                        ×
                      </button>
                      <button
                      className="botao-editar-playlist"
                      onClick={() => irParaEditar(playlist._id)}
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
      <button className="botao-anterior-central-ver-playlist" onClick= {irParaCentral} >cancelar</button>
      <button className="botao-anterior-central-ver-playlist" onClick= {irParaCentral} >salvar</button>
      </div>
    </div>
  );
};

export default PaginaVerPlaylist;