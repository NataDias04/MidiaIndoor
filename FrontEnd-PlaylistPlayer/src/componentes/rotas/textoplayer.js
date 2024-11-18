// Função para salvar texto simples
export async function salvarTextoSimples(conteudo) {
    try {
      const response = await fetch('http://localhost:3000/texto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conteudo }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao salvar texto simples');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para deletar texto simples
  export async function deletarTextoSimples(textoId) {
    try {
      const response = await fetch(`http://localhost:3000/texto/${textoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar texto simples');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }

  // Função para buscar todos os textos simples
export async function buscarTextosSimples() {
  try {
    const response = await fetch('http://localhost:3000/texto', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar textos simples: ${errorMessage}`);
    }

    const textosSimples = await response.json();
    console.log('Textos simples buscados com sucesso:', textosSimples);
    return textosSimples;
  } catch (erro) {
    console.error('Erro ao buscar textos simples:', erro);
    throw erro;
  }
}

// Função para buscar um texto simples pelo ID
export const buscarTextoSimples = async (textoId) => {
  try {
    const response = await fetch(`http://localhost:3000/texto/${textoId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar texto simples: ${errorMessage}`);
    }

    const textoSimples = await response.json();
    console.log('Texto simples buscado com sucesso:', textoSimples);
    return textoSimples; 
  } catch (erro) {
    console.error('Erro ao buscar texto simples:', erro);
    throw erro;
  }
};



// Função para salvar conteúdo HTML
export async function salvarHtml(conteudo, nome) {
    try {
      const response = await fetch('http://localhost:3000/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conteudo: conteudo, nome })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${errorData.error}`);
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para deletar conteúdo HTML
  export async function deletarHtml(htmlId) {
    try {
      const response = await fetch(`http://localhost:3000/html/${htmlId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar conteúdo HTML');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }

  // Função para buscar todos os conteúdos HTML
export async function buscarHtmls() {
  try {
    const response = await fetch('http://localhost:3000/html', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar conteúdos HTML: ${errorMessage}`);
    }

    const htmls = await response.json();
    console.log('Conteúdos HTML buscados com sucesso:', htmls);
    return htmls;
  } catch (erro) {
    console.error('Erro ao buscar conteúdos HTML:', erro);
    throw erro;
  }
}

// Função para buscar um conteúdo HTML pelo ID
export const buscarHtml = async (htmlId) => {
  try {
    const response = await fetch(`http://localhost:3000/html/${htmlId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar conteúdo HTML: ${errorMessage}`);
    }

    const html = await response.json();
    console.log('Conteúdo HTML buscado com sucesso:', html);
    return html;
  } catch (erro) {
    console.error('Erro ao buscar conteúdo HTML:', erro);
    throw erro;
  }
};

    export default {
        salvarTextoSimples,
        salvarHtml,
        deletarTextoSimples,
        buscarTextosSimples,
        deletarHtml,
        buscarHtmls,
        buscarHtml,
        buscarTextoSimples,
      };