// Função para salvar imagem com upload de arquivo
export async function salvarImagem(imagemData, imagemArquivo) {
  try {
    const formData = new FormData();
    formData.append('name', imagemData.name);  // Adiciona o nome
    formData.append('file', imagemArquivo);    // Adiciona o arquivo da imagem

    const response = await fetch('http://localhost:5000/imagem', {
      method: 'POST',
      body: formData,  // O corpo da requisição agora é o formData
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Captura o texto da resposta
      throw new Error(`Erro ao fazer o upload da imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    console.log('Imagem salva com sucesso:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao salvar imagem:', erro);
    throw erro;  // Rejoga o erro para tratamento posterior
  }
}

// Função para deletar imagem
export async function deletarImagem(imagemId) {
  try {
    const response = await fetch(`http://localhost:5000/imagem/${imagemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Captura o texto da resposta
      throw new Error(`Erro ao deletar a imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    return resultado;
  } catch (erro) {
    console.error('Erro ao deletar imagem:', erro);
    throw erro; // Rejoga o erro para tratamento posterior
  }
}

// Função para salvar link de imagem
export async function salvarImagemLink(imagemData) {
  try {
    const response = await fetch('http://localhost:5000/imagem_link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imagemData), // Envia os dados como JSON
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao salvar o link da imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    console.log('Link da imagem salvo com sucesso:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao salvar o link da imagem:', erro);
    throw erro;  // Rejoga o erro para tratamento posterior
  }
}

// Função para deletar link de imagem
export async function deletarImagemLink(imagemId) {
  try {
    const response = await fetch(`http://localhost:5000/imagem_link/${imagemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Captura o texto da resposta
      throw new Error(`Erro ao deletar o link da imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    console.log('Link da imagem deletado com sucesso:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao deletar o link da imagem:', erro);
    throw erro; // Rejoga o erro para tratamento posterior
  }
}

// Exporta todas as funções
export default {
  salvarImagem,
  salvarImagemLink,
  deletarImagem,
  deletarImagemLink,
};
