// Função para salvar imagem com upload de arquivo
export async function salvarImagem(imagemData, imagemArquivo) {
    try {
      const formData = new FormData();
      formData.append('name', imagemData.name);  // Adiciona o nome
      formData.append('file', imagemArquivo);    // Adiciona o arquivo da imagem
  
      const response = await fetch('/api/imagem', {
        method: 'POST',
        body: formData,  // O corpo da requisição agora é o formData
      });
  
      if (!response.ok) {
        throw new Error('Erro ao fazer o upload');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para salvar imagem a partir de uma URL externa
  export async function salvarImagemLink(nomeImagem, externalUrl) {
    try {
      const response = await fetch('/api/imagem_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nomeImagem,
          externalUrl: externalUrl,  // Envia a URL externa da imagem
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao salvar o link da imagem');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para deletar imagem
  export async function deletarImagem(imagemId) {
    try {
      const response = await fetch(`/api/imagem/${imagemId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar a imagem');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  export async function deletarImagemLink(imagemLinkId) {
    try {
      const response = await fetch(`/api/imagem_link/${imagemLinkId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar o link da imagem');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }

  
  // Exporta todas as funções
  export default {
    salvarImagem,
    salvarImagemLink,
    deletarImagem,
    deletarImagemLink,
  };
  