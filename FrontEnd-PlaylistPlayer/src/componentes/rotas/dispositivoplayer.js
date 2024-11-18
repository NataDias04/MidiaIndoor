// Função para criar um novo dispositivo
export async function salvarDispositivo(nome, resolucao, playlists) {
    try {
      const response = await fetch('http://localhost:3000/dispositivo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, resolucao, playlists }),
      });

      if (!response.ok) {
        const erroDetalhado = await response.json();
        throw new Error(`Erro ao criar dispositivo: ${erroDetalhado.mensagem}`);
      }

      const resultado = await response.json();
      return resultado;
    } catch (erro) {
      console.error(erro);
      throw erro;
    }
  }
  
  // Função para buscar todos os dispositivos
  export async function buscarDispositivos() {
    try {
      const response = await fetch('http://localhost:3000/dispositivo/', {
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
      const response = await fetch(`http://localhost:3000/dispositivo/${dispositivoId}`, {
        method: 'GET',
      });

      console.log(response);
      
  
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
      const response = await fetch(`http://localhost:3000/dispositivo/${dispositivoId}`, {
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
      const response = await fetch(`http://localhost:3000/dispositivo/${id}`, {
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
  