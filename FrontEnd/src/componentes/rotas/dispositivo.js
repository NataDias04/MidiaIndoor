import API_URL from '../../config';

  // Função para criar um novo dispositivo
  export async function salvarDispositivo(nome, resolucao, tipo, playlist) {
    try {
      // Verificar se a URL da API está correta
      const url = `${API_URL}dispositivo/`; 
      console.log('URL de requisição:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, resolucao, tipo, playlist }),
      });

      // Verificar se a resposta da API foi ok
      if (!response.ok) {
        const erroDetalhado = await response.json();
        console.error('Erro ao criar dispositivo:', erroDetalhado);
        throw new Error(`Erro ao criar dispositivo: ${erroDetalhado.mensagem}`);
      }

      // Processar a resposta da API
      const resultado = await response.json();
      console.log('Dispositivo criado com sucesso:', resultado);
      return resultado;
    } catch (erro) {
      // Logar o erro para depuração
      console.error('Erro na requisição:', erro);
      throw erro;
    }
  }
    
  // Função para buscar todos os dispositivos
  export async function buscarDispositivos() {
    try {
      const response = await fetch(`${API_URL}dispositivo/`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar dispositivos');
      }
  
      const dispositivos = await response.json();
      console.log('Dispositivos buscados com sucesso:', dispositivos);
      return dispositivos;
    } catch (erro) {
      console.error('Erro ao buscar dispositivos:', erro);
      throw erro;
    }
  }
  
  // Função para buscar um dispositivo específico pelo ID
  export async function buscarDispositivoPorId(dispositivoId) {
    try {
      const response = await fetch(`${API_URL}dispositivo/${dispositivoId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar dispositivo');
      }
  
      const dispositivo = await response.json();
      return dispositivo;
    } catch (erro) {
      console.error('Erro ao buscar dispositivo:', erro);
      throw erro;
    }
  }
  
  // Função para atualizar um dispositivo pelo ID
  export async function atualizarDispositivo(dispositivoId, nome, resolucao, playlists) {
    try {
      const response = await fetch(`${API_URL}dispositivo/${dispositivoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, resolucao, playlists }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar dispositivo');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para deletar um dispositivo pelo ID
  export async function deletarDispositivo(id) {
    try {
      const response = await fetch(`${API_URL}dispositivo/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar dispositivo');
      }
  
      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error('Erro ao deletar dispositivo:', erro);
      throw erro;
    }
  }
  
  export default {
    salvarDispositivo,
    buscarDispositivos,
    buscarDispositivoPorId,
    atualizarDispositivo,
    deletarDispositivo,
  };
  