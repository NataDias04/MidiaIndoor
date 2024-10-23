import React, { useState, useEffect } from 'react'; 
import '../estilos/paginaplaylistplayer.css'; // Renomeado o CSS

import { useNavigate,useLocation  } from 'react-router-dom';
import { FaTv } from 'react-icons/fa'; // Ícone de playlist
import { buscarPlaylist } from './rotas/playlistplayer.js'; // Função para buscar playlists

const PaginaPlaylist = () => {

  const location = useLocation();
  const { dispositivoSelecionado } = location.state || {};

  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  // Função para buscar as playlists
  const carregarPlaylists = async () => {
    try {
      if (dispositivoSelecionado && dispositivoSelecionado.playlists) {
        const playlistIds = dispositivoSelecionado.playlists.map(playlist => playlist._id);
  
        const todasPlaylists = await Promise.all(
          playlistIds.map(async (id) => {
            return await buscarPlaylist(id);
          })
        );
  
        setPlaylists(todasPlaylists);
      } else {
        console.warn('Nenhum dispositivo selecionado ou playlists não encontradas.');
      }
    } catch (erro) {
      console.error('Erro ao carregar playlists:', erro);
    }
  };

  const PlaylistPlayer1 = (playlist) => {
    navigate('/player1', { state: {PlaylistSelecionada:{playlist}}});
  }

  const PlaylistPlayer2 = (playlist) => {
    navigate('/player2', { state: { playlist } });
  }

  const PlaylistPlayer3 = (playlist) => {
    navigate('/player3', { state: { playlist } });
  }

  useEffect(() => {
    carregarPlaylists();
  }, []);

  return (
    <div className="player-dashbord-ver-playlist">
      <div className="player-cabecalho-ver-playlist">Cabeçalho</div>

      <div className="player-secao-ver-playlist">
        <div className="player-previews-ver-playlist">
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <div key={index} className="player-playlist-item">
                <FaTv className="player-icone-playlist" /> {/* Ícone de playlist */}
                <p className="player-nome-playlist">{playlist.nome}</p>
                <button className='player-botao-playlist' onClick={() => PlaylistPlayer1(playlist)}>Player</button>
                {console.log(playlist)}
              </div>
            ))
          ) : (
            <p>Nenhuma playlist encontrada.</p>
          )}
        </div>
      </div>

      <div className="player-rodape-ver-playlist">
        <button className="player-botao-anterior-central-ver-playlist">
          Cancelar
        </button>
        <button className="player-botao-anterior-central-ver-playlist">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default PaginaPlaylist;
