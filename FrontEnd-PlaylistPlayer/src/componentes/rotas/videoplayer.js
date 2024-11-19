import API_URL from '../../config.js';

// Define a função salvarVideo
export const salvarVideo = async (file, nome) => {
    const formData = new FormData();
  
    formData.append('video' , file);
    formData.append('nome' , nome);
  
    try {
      const response = await fetch(`${API_URL}video`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao fazer o upload do vídeo: ${errorMessage}`);
      }
  
      const result = await response.json();
      console.log('Vídeo salvo com sucesso:', result);
    } catch (error) {
      console.error('Erro ao salvar o vídeo:', error.message);
      throw error;
    }
  };
  
  // Função para deletar texto simples
  export async function deletarVideo(videoId) {
    try {
      const response = await fetch(`${API_URL}video/${videoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar video');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  };
  
  // Função para buscar todos os vídeos
  export const buscarVideos = async () => {
    try {
      const response = await fetch(`${API_URL}video`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar vídeos');
      }
  
      const videos = await response.json();
      return videos;
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error.message);
      throw error;
    }
  };
  
  // Função para buscar um vídeo pelo ID
  export const buscarVideo = async (videoId) => {
    try {
      const response = await fetch(`${API_URL}video/${videoId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar vídeo');
      }
  
      const video = await response.json();
      return video;
    } catch (error) {
      console.error('Erro ao buscar vídeo:', error.message);
      throw error;
    }
  };
  
  // Define a função salvarVideoLink
  export const salvarVideoLink = async (nome, url) => {
  
    try {
      const response = await fetch(`${API_URL}video_link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, url }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao fazer o upload do link do vídeo: ${errorMessage}`);
      }
  
      const result = await response.json();
      console.log('Link do vídeo salvo com sucesso:', result);
    } catch (error) {
      console.error('Erro ao salvar o link do vídeo:', error.message);
      throw error;
    }
  };
  
  // Função para deletar texto simples
  export async function deletarVideoLink(videolinkId) {
    try {
      const response = await fetch(`${API_URL}video_link/${videolinkId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar video');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  };
  
  // Função para buscar todos os vídeos por link
  export const buscarVideosLink = async () => {
    try {
      const response = await fetch(`${API_URL}video_link`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar vídeos por link');
      }
  
      const videosLinks = await response.json();
      return videosLinks;
    } catch (error) {
      console.error('Erro ao buscar vídeos por link:', error.message);
      throw error;
    }
  };
  
  // Função para buscar um único vídeo por link
  export const buscarVideoLink = async (videolinkId) => {
    try {
      const response = await fetch(`${API_URL}video_link/${videolinkId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar o vídeo por link');
      }
  
      const videoLink = await response.json();
      return videoLink;
    } catch (error) {
      console.error('Erro ao buscar vídeo por link:', error.message);
      throw error;
    }
  };
  
  export default {
    salvarVideo,
    deletarVideo,
    buscarVideos,
    salvarVideoLink,
    deletarVideoLink,
    buscarVideosLink,
    buscarVideo,
    buscarVideoLink,
  };