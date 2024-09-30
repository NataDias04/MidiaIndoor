import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout1.css'

import {FaPlus} from 'react-icons/fa';

import ModalPosicao1Layout from './modais/modal-posicao1-layout.js';

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout1 = () => {

  const [modalPosicao1LayoutAberto, setModalPosicao1LayoutAberto] = useState(false);

  const abrirModalPosicao1Layout = () => setModalPosicao1LayoutAberto(true);
  const fecharModalPosicao1Layout = () => setModalPosicao1LayoutAberto(false);

  const navigate = useNavigate();

  const irParaLayout = () => {
    navigate('/layout'); 
  };

  const irParaCentral = () => {
    navigate('/central'); 
  };

  return (
    <div className="dashbord-playlist-layout1">

      <div className="cabecalho-playlist-layout1">cabeçalho</div>

      <div className='secao-layout1'>

        <div className='linha-layout1-layout1'>
            <div className='borda1-layout1-layout1'> 
              <FaPlus onClick={abrirModalPosicao1Layout} />

              {modalPosicao1LayoutAberto && <ModalPosicao1Layout fecharModal={fecharModalPosicao1Layout} />}
            </div>
            <div className='borda2-layout1-layout1'> 
              <FaPlus/>
            </div>
        </div>
        <div className='linha-layout1-layout1'>
            <div className='borda3-layout1-layout1'> 
              <FaPlus/>
            </div>
        </div>

      </div>
      
      <div className="rodape-playlist-layout1">
        <button className='' onClick={irParaLayout}>cancelar</button>
        <button className='' onClick={irParaCentral}>salvar</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylistLayout1;
