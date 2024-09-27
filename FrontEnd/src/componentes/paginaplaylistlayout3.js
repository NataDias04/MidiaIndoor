import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout3.css'

import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout3 = () => {

  const navigate = useNavigate();

  const irParaLayout = () => {
    navigate('/layout'); 
  };

  const irParaCentral = () => {
    navigate('/central'); 
  };

  return (
    <div className="dashbord-playlist-layout3">

      <div className="cabecalho-playlist-layout3">cabeçalho</div>

      <div className='secao-layout3'>

        <div className='linha-layout3-layout3'>
            <div className='borda1-layout3-layout3'></div>
            <div className='column-layout3-layout3'>
                <div className='borda2-layout3-layout3'></div>
                <div className='borda3-layout3-layout3'></div>
            </div>
        </div>
        <div className='linha-layout3-layout3'>
            <div className='row-layout3-layout3'>
                <div className='borda4-layout3-layout3'></div>
                <div className='borda5-layout3-layout3'></div>
            </div>
        </div>

      </div>
      
      <div className="rodape-playlist-layout3">
        <button className='' onClick={irParaLayout}>cancelar</button>
        <button className='' onClick={irParaCentral}>salvar</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylistLayout3;
