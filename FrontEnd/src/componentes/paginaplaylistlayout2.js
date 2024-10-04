import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout2.css'

import {FaPlus} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout2 = () => {

  const navigate = useNavigate();

  const irParaLayout = () => {
    navigate('/layout'); 
  };

  const irParaCentral = () => {
    navigate('/central'); 
  };

  return (
    <div className="dashbord-playlist-layout2">

      <div className="cabecalho-playlist-layout2">cabeçalho</div>

      <div className='secao-layout2'>

      <div className='linha-layout2-layout2'>
        <div className='borda1-layout2-layout2'> 
            <FaPlus/>
        </div>
          <div className='borda2-layout2-layout2'> 
            <FaPlus/>
          </div>
        </div>
        <div className='linha-layout2-layout2'>
          <div className='borda3-layout2-layout2'> 
            <FaPlus/>
          </div>
        </div>
      </div>
      
      <div className="rodape-playlist-layout2">
        <button className='' onClick={irParaLayout}>cancelar</button>
        <button className='' onClick={irParaCentral}>salvar</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylistLayout2;
