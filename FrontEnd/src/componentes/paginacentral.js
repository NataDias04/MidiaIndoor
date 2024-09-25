import React from 'react';
import '../estilos/paginacentral.css';

import { useNavigate } from 'react-router-dom';

const PaginaCentral = () => {

    const navigate = useNavigate();
  
    const irParaUpload = () => {
      navigate('/upload'); 
    };

    const irParaLayout= () => {
        navigate('/layout'); 
    };

    const irParaVerPlaylist= () =>{
        navigate('/verplaylist')
    };

    return(
        <div className="dashbord-central">
            <div className="cabecalho-central">cabeçalho</div>

            <div className='secao-central'>
                <div className='layout1-central'>

                    <button className="botao-pagina-central" onClick= {irParaUpload} >avançar</button>

                </div>
                <div className='layout2-central'>

                 <button className="botao-pagina-central" onClick= {irParaLayout} >avançar</button>
 
                </div>
                <div className='layout3-central'>

                    <button className="botao-pagina-central" onClick= {irParaVerPlaylist} >avançar</button>

                </div>
                
            </div>

            <div className="rodape-central"></div>
        </div>
    );

};

export default PaginaCentral;