import React, { useState } from 'react';
import '../estilos/paginaverplaylist.css';

import { useNavigate } from 'react-router-dom';

const PaginaUpload = () => {

  const navigate = useNavigate();

  const irParaCentral = () => {
    navigate('/central');
};

  return (
    <div className="dashbord-ver-playlist">

      <div className="cabecalho-ver-playlist">cabeçalho</div>

      <div className='secao-ver-playlist'>
        <div className='previews-ver-playlist'></div>
      </div>

      <div className="rodape-ver-playlist">
      <button className="botao-anterior-central-ver-playlist" onClick= {irParaCentral} >cancelar</button>
      <button className="botao-anterior-central-ver-playlist" onClick= {irParaCentral} >salvar</button>
      </div>
    </div>
  );
};

export default PaginaUpload;