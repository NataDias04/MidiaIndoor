// Define a função salvarVideo
export const salvarVideo = async (file, name) => {
  const formData = new FormData();

  formData.append('video' , file);
  formData.append('name' , name);

  try {
    const response = await fetch('http://localhost:5000/video', {
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
    const response = await fetch(`http://localhost:5000/video/${videoId}`, {
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
    const response = await fetch('http://localhost:5000/video', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar vídeos');
    }

    const videos = await response.json();
    return videos; // Retorna a lista de vídeos
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error.message);
    throw error;
  }
};

// Define a função salvarVideoLink
export const salvarVideoLink = async (name, url) => {

  try {
    const response = await fetch('http://localhost:5000/video_link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, url }),
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
    const response = await fetch(`http://localhost:5000/video_link/${videolinkId}`, {
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
    const response = await fetch('http://localhost:5000/video_link', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar vídeos por link');
    }

    const videosLinks = await response.json();
    return videosLinks; // Retorna a lista de links de vídeos
  } catch (error) {
    console.error('Erro ao buscar vídeos por link:', error.message);
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
};