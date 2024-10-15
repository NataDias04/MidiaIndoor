import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout1.css'

import {FaPlus} from 'react-icons/fa';

import ModalPosicao1Layout1 from './modais/modal-posicao1-layout1.js';

import ModalPosicao2Layout1 from './modais/modal-posicao2-layout1.js';

import ModalPosicao3Layout1 from './modais/modal-posicao3-layout1.js';

import {criarPlaylist} from './rotas/playlist.js';

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout1 = () => {

  const [ModalPosicao1Layout1Aberto, setModalPosicao1Layout1Aberto] = useState(false);
  const [ModalPosicao2Layout1Aberto, setModalPosicao2Layout1Aberto] = useState(false);
  const [ModalPosicao3Layout1Aberto, setModalPosicao3Layout1Aberto] = useState(false);

  const abrirModalPosicao1Layout1 = () => setModalPosicao1Layout1Aberto(true);
  const fecharModalPosicao1Layout1 = () => setModalPosicao1Layout1Aberto(false) ;

  const abrirModalPosicao2Layout1 = () => setModalPosicao2Layout1Aberto(true);
  const fecharModalPosicao2Layout1 = () => setModalPosicao2Layout1Aberto(false);

  const abrirModalPosicao3Layout1 = () => setModalPosicao3Layout1Aberto(true);
  const fecharModalPosicao3Layout1 = () => setModalPosicao3Layout1Aberto(false);

  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);

  const [PlaylistName, setPlaylistName] = useState('');

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

  const [erro, setErro] = useState(null);

  const handlePlaylistChange = (e) => {
    setPlaylistName(e.target.value);
    setErro('');
  };

  const handleSalvarPlaylist = () => {
    criarPlaylist(PlaylistName,uploadsSelecionados);
    irParaCentral();
  };

  return (
    <div className="dashbord-playlist-layout1">

      <div className="cabecalho-playlist-layout1">
        <input
        className='nome-playlist'
        type="text"
        placeholder="Insira o nome da playlist"
        value={PlaylistName}
        onChange={handlePlaylistChange}
        />
      </div>

      <div className='secao-layout1'>

        <div className='linha-layout1-layout1'>
            <div className='borda1-layout1-layout1'> 
              <FaPlus onClick={abrirModalPosicao1Layout1} />

              {ModalPosicao1Layout1Aberto && <ModalPosicao1Layout1 fecharModalPosicao1Layout1={fecharModalPosicao1Layout1} 
              atualizarUploadsSelecionados={atualizarUploadsSelecionados}
              />}
              {console.log("lista",uploadsSelecionados)}
            </div>
            <div className='borda2-layout1-layout1'> 
              <FaPlus onClick={abrirModalPosicao2Layout1} />

            {ModalPosicao2Layout1Aberto && <ModalPosicao2Layout1 fecharModalPosicao2Layout1={fecharModalPosicao2Layout1} 
            atualizarUploadsSelecionados={atualizarUploadsSelecionados}/>}

            </div>
        </div>
        <div className='linha-layout1-layout1'>
            <div className='borda3-layout1-layout1'> 
              <FaPlus onClick={abrirModalPosicao3Layout1} />

            {ModalPosicao3Layout1Aberto && <ModalPosicao3Layout1 fecharModalPosicao3Layout1={fecharModalPosicao3Layout1} 
            atualizarUploadsSelecionados={atualizarUploadsSelecionados}/>}
            </div>
        </div>

      </div>
      
      <div className="rodape-playlist-layout1">
        <button className='' onClick={irParaLayout}>cancelar</button>
        <button className='' onClick={handleSalvarPlaylist}>salvar</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylistLayout1;
