import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { buscarPlaylist, atualizarPlaylist } from './rotas/playlist.js';
import '/estilos/PaginaEditarPlaylist.css'

const PaginaEditarPlaylist = () => {
  const { playlistId } = useParams(); // Obtém o ID da playlist da URL
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState({ nome: '', descricao: '', imagem: '', videos: [] });

  // Função para buscar a playlist no carregamento
  const carregarPlaylist = async () => {
    try {
      const dadosPlaylist = await buscarPlaylist(playlistId); // Função para buscar a playlist pelo ID
      setPlaylist(dadosPlaylist);
    } catch (error) {
      console.error('Erro ao carregar playlist:', error);
    }
  };

  useEffect(() => {
    carregarPlaylist();
  }, [playlistId]);

  // Manipula as mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value });
  };

  // Função para enviar a atualização da playlist
  const salvarAlteracoes = async () => {
    try {
      await atualizarPlaylist(playlistId, playlist); // Função para atualizar a playlist pelo ID
      navigate('/verplaylist'); // Redireciona após salvar
    } catch (error) {
      console.error('Erro ao salvar mudanças:', error);
    }
  };

  return (
    <div className="pagina-editar-playlist">
      <h1>Editar Playlist</h1>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" value={playlist.nome} onChange={handleChange} />
        </label>
        <label>
          Descrição:
          <textarea name="descricao" value={playlist.descricao} onChange={handleChange} />
        </label>
        <label>
          Imagem URL:
          <input type="text" name="imagem" value={playlist.imagem} onChange={handleChange} />
        </label>
        <label>
          Vídeos (URLs separadas por vírgula):
          <textarea
            name="videos"
            value={playlist.videos.join(', ')}
            onChange={(e) => setPlaylist({ ...playlist, videos: e.target.value.split(', ') })}
          />
        </label>
        <button type="button" onClick={salvarAlteracoes}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default PaginaEditarPlaylist;
