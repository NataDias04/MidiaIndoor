import React from 'react';
import '../estilos/paginacentral.css';

import { useNavigate } from 'react-router-dom';

const PaginaCentral = () => {

    const navigate = useNavigate();
  
    const irParaUpload = () => {
      navigate('/upload'); 
    };

    const irParaPlaylist = () => {
        navigate('/playlist'); 
    };

    return(
        <div className="dashbord-central">
            <div className="cabecalho-central">cabeçalho</div>

            <div className='secao-central'>
                <div className='layout1-central'>

                <button className="botao-pagina-upload" onClick= {irParaUpload} >anterior</button>

                </div>
                <div className='layout2-layout'>

                <button className="botao-pagina-upload" onClick= {irParaPlaylist} >anterior</button>
 
                </div>
                <div className='layout3-layout'>

                {/* <button className="botao-pagina-upload" onClick= {irParaPlaylist} >anterior</button>*/}

                </div>
                
            </div>

            <div className="rodape-central"></div>
        </div>
    );

};

export default PaginaCentral;