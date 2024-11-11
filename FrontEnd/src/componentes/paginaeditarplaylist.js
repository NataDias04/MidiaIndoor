import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTabletAlt } from 'react-icons/fa'; // Ícone de tablet
import { buscarPlaylists, deletarPlaylist } from './rotas/playlist.js'; // Função para buscar playlists

import '../estilos/paginaeditarplaylist.css';

// Função para atualizar uma playlist pelo ID
export async function atualizarPlaylist(playlistID, nome, descricao, ordemMidias) {
    try {
      const response = await fetch(`http://localhost:5000/playlist/${playlistID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, descricao, ordemMidias }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao atualizar Playlist: ${response.statusText}`);
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error("Erro ao atualizar a playlist:", erro.message);
      throw erro;
    }
  }
  
