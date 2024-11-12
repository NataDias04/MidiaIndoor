import React, { useState, useEffect } from 'react';
import '../estilos/paginadispositivo.css';

import ModalDispositivo from './modais/modal-dispositivo.js';
import ModalEditarDispositivo from './modais/modal-editar-dispositivo.js';
import { FaTv } from 'react-icons/fa';
import { buscarDispositivos, deletarDispositivo } from './rotas/dispositivo.js';
import { useNavigate } from 'react-router-dom';

const PaginaDispositivo = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState(null);

  const abrirModalDispositivo = () => setModalAberto(true);
  const fecharModalDispositivo = () => setModalAberto(false);

  const abrirModalEditar = (dispositivo) => {
    setDispositivoSelecionado(dispositivo);
    setModalEditarAberto(true);
  };

  const fecharModalEditar = () => {
    setDispositivoSelecionado(null);
    setModalEditarAberto(false);
    carregarDispositivos();
  };

  const navigate = useNavigate();

  const irParaCentral = () => {
    navigate('/central');
  };

  const carregarDispositivos = async () => {
    try {
      const dispositivosCarregados = await buscarDispositivos();
      setDispositivos(dispositivosCarregados);
    } catch (error) {
      console.error("Erro ao carregar dispositivos", error);
    }
  };

  const apagarDispositivo = async (dispositivo) =>{
    try {
      await deletarDispositivo(dispositivo._id);
      carregarDispositivos();
    } catch (error) {
      console.error("Erro ao deletar dispositivo", error);
    }
  };

  const carregarposmodalDispositivo = async () =>{
    try {
      fecharModalDispositivo();
      carregarDispositivos();
    } catch{

    }
  };

  useEffect(() => {
    carregarDispositivos();
  }, []);

  return (
    <div className="dashbord-dispositivo">
      <div className="cabecalho-dispositivo"></div>

      <div className="linha-dispositivo">
        <div className="column1-dispositivo">
          <div className="div-dispositivo">
            <div className="icon-container-dispositivo">
              <FaTv />
            </div>
            <button className="botao-dispositivo" onClick={abrirModalDispositivo}>arquivo</button>
            {modalAberto && <ModalDispositivo fecharModalDispositivo={carregarposmodalDispositivo} />}
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
                    <p>Playlists conectadas:</p>
                    <ul>
                      {dispositivo.playlists && dispositivo.playlists.length > 0 && (
                        dispositivo.playlists.map((playlist) => (
                          <li key={playlist._id}>{playlist.nome}</li>
                        ))
                      )}
                    </ul>
                  </div>
                  <button className="botao-apagar" onClick={() => apagarDispositivo(dispositivo)}>×</button>
                  <button className="botao-editar" onClick={() => abrirModalEditar(dispositivo)}> Editar </button>
                </div>
              ))
            ) : (
              <p>Nenhum dispositivo encontrado.</p>
            )}
          </div>
          {modalEditarAberto && (
            <ModalEditarDispositivo dispositivo={dispositivoSelecionado} fecharModal={fecharModalEditar} />
          )}
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
