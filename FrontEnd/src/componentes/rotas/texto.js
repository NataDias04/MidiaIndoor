// texto_simples.js

// Função para salvar texto simples
export async function salvarTextoSimples(conteudo) {
    try {
      const response = await fetch('http://localhost:5000/texto', {
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
      const response = await fetch(`http://localhost:5000/texto/${textoId}`, {
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
  
// html.js

// Função para salvar conteúdo HTML
export async function salvarHtml(conteudoHtml) {
    try {
      const response = await fetch('http://localhost:5000/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conteudoHtml }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao salvar conteúdo HTML');
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
      const response = await fetch(`http://localhost:5000/html/${htmlId}`, {
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

    // Exporta todas as funções
    export default {
        salvarTextoSimples,
        salvarHtml,
        deletarTextoSimples,
        deletarHtml,
      };