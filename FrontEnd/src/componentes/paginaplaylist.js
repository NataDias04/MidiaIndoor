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
        <button className='' onClick={irParaCentral}>anterior</button>
        <button className='' onClick={irParaLayout}>proximo</button>
      </div>
      
    </div>
  );
};

export default PaginaPlaylist;
