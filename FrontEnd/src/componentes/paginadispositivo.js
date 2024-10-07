import React, { useState, useEffect } from 'react';
import '../estilos/paginadispositivo.css';

import ModalDispositivo from './modais/modal-dispositivo.js';
import { FaTv } from 'react-icons/fa';
import { buscarDispositivos, deletarDispositivo } from './rotas/dispositivo.js'; // Funções para buscar e deletar dispositivos
import { useNavigate } from 'react-router-dom';

const PaginaDispositivo = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);

  const abrirModalDispositivo = () => setModalAberto(true);
  const fecharModalDispositivo = () => setModalAberto(false);

  const navigate = useNavigate();

  const irParaCentral = () => {
    navigate('/central');
  };

  // Função para carregar dispositivos
  const carregarDispositivos = async () => {
    try {
      const dispositivosCarregados = await buscarDispositivos();
      setDispositivos(dispositivosCarregados);
    } catch (error) {
      console.error("Erro ao carregar dispositivos", error);
    }
  };

  // Função para apagar dispositivo
  const apagarDispositivo = async (id) => {
    try {
      await deletarDispositivo(id);
      carregarDispositivos(); // Recarrega a lista após apagar
    } catch (error) {
      console.error("Erro ao apagar dispositivo", error);
    }
  };

  // Carregar dispositivos quando o componente for montado
  useEffect(() => {
    carregarDispositivos();
  }, []);

  return (
    <div className="dashbord-dispositivo">
      <div className="cabecalho-dispositivo">cabeçalho</div>

      <div className="linha-dispositivo">
        <div className="column1-dispositivo">
          <div className="div-dispositivo">
            <div className="icon-container-dispositivo">
              <FaTv />
            </div>
            <button className="botao-dispositivo" onClick={abrirModalDispositivo}>arquivo</button>
            {modalAberto && <ModalDispositivo fecharModalDispositivo={fecharModalDispositivo} />}
          </div>
        </div>

        <div className="column2-dispositivo">
          <div className="previews-dispositivo">
            {dispositivos.length > 0 ? (
              dispositivos.map((dispositivo, index) => (
                <div key={index} className="dispositivo-preview">
                  <FaTv className="icon-dispositivo" />
                  <div className="info-dispositivo">
                    <p>Nome: {dispositivo.nome}</p>
                    <p>Resolução: {dispositivo.resolucao}</p>
                  </div>
                  <button 
                    className="botao-apagar" 
                    onClick={() => apagarDispositivo(dispositivo.id)}>
                    ×
                  </button>
                  <button 
                    className="botao-editar" 
                    onClick={() => {/* Função para editar o dispositivo */}}>
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum dispositivo encontrado.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rodape-dispositivo">
        <button className="botao-anterior-central" onClick={irParaCentral}>cancelar</button>
        <button className="botao-anterior-central" onClick={irParaCentral}>salvar</button>
      </div>
    </div>
  );
};

export default PaginaDispositivo;
