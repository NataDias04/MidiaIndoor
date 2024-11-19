import API_URL from '../../config.js';

export async function criarPlaylist(nome, ordemMidias) {
  try {
    const response = await fetch(`${API_URL}playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, ordemMidias }),
    });

    if (!response.ok) {
      const erroDetails = await response.json();
      throw new Error(`Erro ao criar playlist: ${erroDetails.mensagem}`);
    }

    const novaPlaylist = await response.json();
    return novaPlaylist;
  } catch (erro) {
    console.error('Erro ao criar playlist:', erro);
    throw erro;
  }
}

export async function buscarPlaylists() {
    try {
      const response = await fetch(`${API_URL}playlist`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const erroDetails = await response.json();
        throw new Error(`Erro ao buscar playlists: ${erroDetails.mensagem}`);
      }
  
      const playlists = await response.json();
      return playlists;
    } catch (erro) {
      console.error('Erro ao buscar playlists:', erro);
      throw erro;
    }
  }

  export async function buscarPlaylist(playlistId) {
    try {
      const response = await fetch(`${API_URL}playlist/${playlistId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const erroDetails = await response.json();
        throw new Error(`Erro ao buscar a playlist: ${erroDetails.mensagem}`);
      }
  
      const playlist = await response.json();
      return playlist;
    } catch (erro) {
      console.error('Erro ao buscar a playlist:', erro);
      throw erro;
    }
  }

// Função para deletar uma playlist
export async function deletarPlaylist(playlistId) {
  try {
    const response = await fetch(`${API_URL}playlist/${playlistId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar a playlist');
    }

    const resultado = await response.json();
    return resultado;
  } catch (erro) {
    console.error(erro);
    throw erro;
  }
}

export async function atualizarPlaylist(playlistId, nome, ordemMidias) {
  try {
    const response = await fetch(`${API_URL}playlist/${playlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, ordemMidias }),
    });

    if (!response.ok) {
      const erroDetails = await response.json();
      throw new Error(`Erro ao atualizar playlist: ${erroDetails.mensagem}`);
    }

    const playlistAtualizada = await response.json();
    return playlistAtualizada;
  } catch (erro) {
    console.error('Erro ao atualizar playlist:', erro);
    throw erro;
  }
}
  

  export default {
    criarPlaylist,
    buscarPlaylists,
    buscarPlaylist,
    deletarPlaylist,
    atualizarPlaylist,
  };