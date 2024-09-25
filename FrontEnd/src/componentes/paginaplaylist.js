import React, { useState } from 'react';
import '../estilos/paginaplaylist.css'

import { useNavigate } from 'react-router-dom';

const PaginaPlaylist = () => {

  const navigate = useNavigate();

  const irParaLayout = () => {
    navigate('/layout'); 
  };

  const irParaCentral = () => {
    navigate('/central'); 
  };

  return (
    <div className="dashbord-playlist">

      <div className="cabecalho-playlist">cabeçalho</div>
      
      <div className="rodape-playlist">
        <button className='' onClick={irParaLayout}>cancelar</button>
        <button className='' onClick={irParaCentral}>salvar</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylist;
