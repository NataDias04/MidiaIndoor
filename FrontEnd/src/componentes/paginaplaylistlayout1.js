import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout1.css'

import {FaPlus} from 'react-icons/fa';

import ModalPosicao1Layout1 from './modais/modal-posicao1-layout1.js';

import ModalPosicao2Layout1 from './modais/modal-posicao2-layout1.js';

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout1 = () => {

  const [ModalPosicao1Layout1Aberto, setModalPosicao1Layout1Aberto] = useState(false);
  const [ModalPosicao2Layout1Aberto, setModalPosicao2Layout1Aberto] = useState(false);

  const abrirModalPosicao1Layout1 = () => setModalPosicao1Layout1Aberto(true);
  const fecharModalPosicao1Layout1 = () => setModalPosicao1Layout1Aberto(false);

  const abrirModalPosicao2Layout1 = () => setModalPosicao2Layout1Aberto(true);
  const fecharModalPosicao2Layout1 = () => setModalPosicao2Layout1Aberto(false);

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
              <FaPlus onClick={abrirModalPosicao1Layout1} />

              {ModalPosicao1Layout1Aberto && <ModalPosicao1Layout1 fecharModalPosicao1Layout1={fecharModalPosicao1Layout1} />}
            </div>
            <div className='borda2-layout1-layout1'> 
              <FaPlus onClick={abrirModalPosicao2Layout1} />

            {ModalPosicao2Layout1Aberto && <ModalPosicao2Layout1 fecharModal={fecharModalPosicao2Layout1} />}

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
