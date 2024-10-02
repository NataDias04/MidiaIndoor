// Função para salvar imagem com upload de arquivo
export async function salvarImagem(imagemData, imagemArquivo) {
  try {
    const formData = new FormData();
    formData.append('name', imagemData.name);
    formData.append('file', imagemArquivo);

    const response = await fetch('http://localhost:5000/imagem', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao fazer o upload da imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    console.log('Imagem salva com sucesso:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao salvar imagem:', erro);
    throw erro;
  }
}

// Função para deletar imagem
export async function deletarImagem(imagemId) {
  try {
    const response = await fetch(`http://localhost:5000/imagem/${imagemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao deletar a imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    return resultado;
  } catch (erro) {
    console.error('Erro ao deletar imagem:', erro);
    throw erro;
  }
}

// Função para buscar todas as imagens
export async function buscarImagens() {
  try {
    const response = await fetch('http://localhost:5000/imagem', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar imagens: ${errorMessage}`);
    }

    const imagens = await response.json();
    console.log('Imagens buscadas com sucesso:', imagens);
    return imagens;
  } catch (erro) {
    console.error('Erro ao buscar imagens:', erro);
    throw erro;
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
      body: JSON.stringify(imagemData),
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
    throw erro;
  }
}

// Função para deletar link de imagem
export async function deletarImagemLink(imagemId) {
  try {
    const response = await fetch(`http://localhost:5000/imagem_link/${imagemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao deletar o link da imagem: ${errorMessage}`);
    }

    const resultado = await response.json();
    console.log('Link da imagem deletado com sucesso:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao deletar o link da imagem:', erro);
    throw erro;
  }
}

// Função para buscar todos os links de imagens
export async function buscarImagensLink() {
  try {
    const response = await fetch('http://localhost:5000/imagem_link', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar links de imagens: ${errorMessage}`);
    }

    const imagensLinks = await response.json();
    console.log('Links de imagens buscados com sucesso:', imagensLinks);
    return imagensLinks;
  } catch (erro) {
    console.error('Erro ao buscar links de imagens:', erro);
    throw erro;
  }
}

export default {
  salvarImagem,
  salvarImagemLink,
  buscarImagens,
  buscarImagensLink,
  deletarImagem,
  deletarImagemLink,
};
