export async function criarPlaylist(nome, ordemMidias) {
  try {
    const response = await fetch('http://localhost:5000/playlist', {
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
      const response = await fetch('http://localhost:5000/playlist', {
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
  

  export default {
    criarPlaylist,
    buscarPlaylists,
  };