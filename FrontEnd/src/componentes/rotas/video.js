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
      const errorMessage = await response.text(); // Captura o texto da resposta
      throw new Error(`Erro ao fazer o upload do vídeo: ${errorMessage}`);
    }

    const result = await response.json();
    console.log('Vídeo salvo com sucesso:', result);
  } catch (error) {
    console.error('Erro ao salvar o vídeo:', error.message);
    throw error; // rethrow se necessário para tratamento posterior
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

// Define a função salvarVideoLink
export const salvarVideoLink = async (name, url) => {

  try {
    const response = await fetch('http://localhost:5000/video_link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({ name, url }), // Converte o objeto em JSON
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Captura o texto da resposta
      throw new Error(`Erro ao fazer o upload do link do vídeo: ${errorMessage}`);
    }

    const result = await response.json();
    console.log('Link do vídeo salvo com sucesso:', result);
  } catch (error) {
    console.error('Erro ao salvar o link do vídeo:', error.message);
    throw error; // rethrow se necessário para tratamento posterior
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



// Exporta todas as funções
export default {
  salvarVideo,
};