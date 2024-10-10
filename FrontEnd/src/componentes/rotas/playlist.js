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
  