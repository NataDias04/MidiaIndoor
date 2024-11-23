import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout3.css';

import { FaPlus } from 'react-icons/fa';

import ModalPosicao1Layout3 from './modais/modal-posicao1-layout3.js';
import ModalPosicao2Layout3 from './modais/modal-posicao2-layout3.js';
import ModalPosicao3Layout3 from './modais/modal-posicao3-layout3.js';
import ModalPosicao4Layout3 from './modais/modal-posicao4-layout3.js';

import { criarPlaylist } from './rotas/playlist.js';
import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout3 = () => {
  
  const [ModalPosicao1Layout3Aberto, setModalPosicao1Layout3Aberto] = useState(false);
  const [ModalPosicao2Layout3Aberto, setModalPosicao2Layout3Aberto] = useState(false);
  const [ModalPosicao3Layout3Aberto, setModalPosicao3Layout3Aberto] = useState(false);
  const [ModalPosicao4Layout3Aberto, setModalPosicao4Layout3Aberto] = useState(false);

  const abrirModalPosicao1Layout3 = () => setModalPosicao1Layout3Aberto(true);
  const fecharModalPosicao1Layout3 = () => setModalPosicao1Layout3Aberto(false);

  const abrirModalPosicao2Layout3 = () => setModalPosicao2Layout3Aberto(true);
  const fecharModalPosicao2Layout3 = () => setModalPosicao2Layout3Aberto(false);

  const abrirModalPosicao3Layout3 = () => setModalPosicao3Layout3Aberto(true);
  const fecharModalPosicao3Layout3 = () => setModalPosicao3Layout3Aberto(false);

  const abrirModalPosicao4Layout3 = () => setModalPosicao4Layout3Aberto(true);
  const fecharModalPosicao4Layout3 = () => setModalPosicao4Layout3Aberto(false);

  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);
  const [PlaylistName, setPlaylistName] = useState('');
  const [erro, setErro] = useState(null);

  const atualizarUploadsSelecionados = (novosUploads) => {
    setUploadsSelecionados(prevUploads => [...prevUploads, ...novosUploads]);
  };

  const navigate = useNavigate();

  const irParaLayout = () => {
    navigate('/layout'); 
  };

  const irParaCentral = () => {
    navigate('/central'); 
  };

  const handlePlaylistChange = (e) => {
    setPlaylistName(e.target.value);
    setErro('');
  };

  const handleSalvarPlaylist = () => {
    criarPlaylist(PlaylistName, uploadsSelecionados);
    irParaCentral();
  };

  const handleCancelar = () => {
    localStorage.clear();
    irParaLayout();
  };

  return (
    <div className="dashbord-playlist-layout3">
      <div className="cabecalho-playlist-layout3">
        <input
          className="nome-playlist"
          type="text"
          placeholder="Insira o nome da playlist"
          value={PlaylistName}
          onChange={handlePlaylistChange}
        />
      </div>

      <div className="secao-layout3">
        <div className="linha-layout3-layout3">
          <div className="borda1-layout3-layout3">
            <FaPlus onClick={abrirModalPosicao1Layout3} />
            {ModalPosicao1Layout3Aberto && (
              <ModalPosicao1Layout3 
                fecharModalPosicao1Layout3={fecharModalPosicao1Layout3} 
                atualizarUploadsSelecionados={atualizarUploadsSelecionados} 
              />
            )}
          </div>
          <div className="column-layout3-layout3">
            <div className="borda2-layout3-layout3">
              <FaPlus onClick={abrirModalPosicao2Layout3} />
              {ModalPosicao2Layout3Aberto && (
                <ModalPosicao2Layout3 
                  fecharModalPosicao2Layout3={fecharModalPosicao2Layout3} 
                  atualizarUploadsSelecionados={atualizarUploadsSelecionados} 
                />
              )}
            </div>
            <div className="borda3-layout3-layout3">
              <FaPlus onClick={abrirModalPosicao3Layout3} />
              {ModalPosicao3Layout3Aberto && (
                <ModalPosicao3Layout3 
                  fecharModalPosicao3Layout3={fecharModalPosicao3Layout3} 
                  atualizarUploadsSelecionados={atualizarUploadsSelecionados} 
                />
              )}
            </div>
          </div>
        </div>
        <div className="linha-layout3-layout3">
          <div className="row-layout3-layout3">
            <div className="borda4-layout3-layout3">
              <FaPlus onClick={abrirModalPosicao4Layout3} />
              {ModalPosicao4Layout3Aberto && (
                <ModalPosicao4Layout3 
                  fecharModalPosicao4Layout3={fecharModalPosicao4Layout3} 
                  atualizarUploadsSelecionados={atualizarUploadsSelecionados} 
                />
              )}
            </div>
            <div className="borda5-layout3-layout3">
              {/* <FaPlus /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="rodape-playlist-layout3">
        <button className='botao-cancel-layout1' onClick={handleCancelar}>Cancelar</button>
        <button className='botao-salvar-layout1' onClick={handleSalvarPlaylist}>Salvar</button>
      </div>
    </div>
  );
};

export default PaginaPlaylistLayout3;
