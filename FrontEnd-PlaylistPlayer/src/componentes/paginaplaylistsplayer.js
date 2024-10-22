import React, { useState, useEffect } from 'react'; 
import '../estilos/paginaplaylistplayer.css'; // Renomeado o CSS

import { useLocation  } from 'react-router-dom'; //useNavigate,
import { FaTv } from 'react-icons/fa'; // Ícone de playlist
import { buscarPlaylist } from './rotas/playlistplayer.js'; // Função para buscar playlists

const PaginaVerPlaylist = () => {

  const location = useLocation();
  const { dispositivoSelecionado } = location.state || {};

  const [playlists, setPlaylists] = useState([]); // Estado para armazenar playlists
  //const navigate = useNavigate();

  // Função para buscar as playlists
  const carregarPlaylists = async () => {
    try {
      if (dispositivoSelecionado && dispositivoSelecionado.playlists) {
        const playlistIds = dispositivoSelecionado.playlists.map(playlist => playlist._id);
        console.log('IDs das Playlists:', playlistIds); // Adicione este log
  
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
  // Chama a função de busca ao carregar o componente
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

export default PaginaVerPlaylist;
