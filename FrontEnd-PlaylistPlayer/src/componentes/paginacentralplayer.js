import React, { useState, useEffect } from 'react'; 
import '../estilos/paginacentralplayer.css';

import { useNavigate } from 'react-router-dom';
import { FaTv } from 'react-icons/fa';
import { buscarDispositivos } from './rotas/dispositivoplayer.js';

const PaginaVerDispositivo = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const navigate = useNavigate();

  const carregarDispositivos = async () => {
    try {
      const listaDispositivos = await buscarDispositivos();
      setDispositivos(listaDispositivos);
    } catch (erro) {
      console.error('Erro ao carregar dispositivos:', erro);
    }
  };

  useEffect(() => {
    carregarDispositivos();
  }, []);

  const GuardarDispositivo = (dispositivo) => {
    navigate('/playlist', { state: { dispositivoSelecionado: dispositivo } });
  };

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
                <button className='player-botao-entrar-dispositivo' onClick={() => GuardarDispositivo(dispositivo)}>Escolher</button>
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
