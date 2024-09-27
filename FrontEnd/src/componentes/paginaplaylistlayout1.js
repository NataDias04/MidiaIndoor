import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout1.css'

import {FaPlus} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout1 = () => {

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
              <FaPlus/>
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
