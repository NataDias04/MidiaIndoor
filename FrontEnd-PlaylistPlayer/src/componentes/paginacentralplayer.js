import React, { useState, useEffect } from 'react'; 
import '../estilos/paginacentralplayer.css'; // Renomeado o CSS

import { useNavigate } from 'react-router-dom';
import { FaTv } from 'react-icons/fa'; // Ícone de tablet
import { buscarDispositivos } from './rotas/dispositivoplayer.js'; // Função para buscar dispositivo

const PaginaVerDispositivo = () => {
  const [dispositivos, setDispositivos] = useState([]); // Estado para armazenar dispositivos
  const navigate = useNavigate();

  // Função para buscar os dispositivos
  const carregarDispositivos = async () => {
    try {
      const listaDispositivos = await buscarDispositivos(); // Chamada à API
      setDispositivos(listaDispositivos);
    } catch (erro) {
      console.error('Erro ao carregar dispositivos:', erro);
    }
  };

  // Chama a função de busca ao carregar o componente
  useEffect(() => {
    carregarDispositivos();
  }, []);

  // Função para navegar para outra página
  /*const irParaCentral = () => {
    navigate('/central');
  };*/

  return (
    <div className="player-dashbord-ver-dispositivo">
      <div className="player-cabecalho-ver-dispositivo">cabeçalho</div>

      <div className="player-secao-ver-dispositivo">
        <div className="player-previews-ver-dispositivo">
          {dispositivos.length > 0 ? (
            dispositivos.map((dispositivo, index) => (
              <div key={index} className="player-dispositivo-item">
                <FaTv className="player-icone-tablet" /> {/* Ícone de tablet */}
                <p className="player-nome-dispositivo">{dispositivo.nome}</p>
              </div>
            ))
          ) : (
            <p>Nenhum dispositivo encontrado.</p>
          )}
        </div>
      </div>

      <div className="player-rodape-ver-dispositivo">
        <button
          className="player-botao-anterior-central-ver-dispositivo"
        >
          cancelar
        </button>
        <button
          className="player-botao-anterior-central-ver-dispositivo"
        >
          salvar
        </button>
      </div>
    </div>
  );
};

export default PaginaVerDispositivo;
