import React from 'react';
import '../estilos/paginacentral.css';

import { FaFileUpload, FaPlus, FaListUl, FaTv } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const PaginaCentral = () => {

    const navigate = useNavigate();
  
    const irParaUpload = () => {
      navigate('/upload'); 
    };

    const irParaDispositivo= () => {
        navigate('/dispositivo'); 
    };

    const irParaLayout= () => {
        navigate('/layout'); 
    };

    const irParaVerPlaylist= () =>{
        navigate('/verplaylist')
    };

    return(
        <div className="dashbord-central">
            <div className="cabecalho-central"></div>

            <div className='secao-central'>
                <div className='layout1-central'>
                    Upload de arquivos
                    <div className="icon-container-central">
                        <FaFileUpload/>
                    </div>

                    <button className="botao-pagina-central" onClick= {irParaUpload} >avançar</button>

                </div>

                <div className='layout2-central'>
                    Dispositivos
                    <div className="icon-container-central">
                        <FaTv/>
                    </div>

                 <button className="botao-pagina-central" onClick= {irParaDispositivo} >avançar</button>
 
                </div>

                <div className='layout3-central'>
                    Criação de playlists
                    <div className="icon-container-central">
                        <FaPlus/>
                    </div>

                 <button className="botao-pagina-central" onClick= {irParaLayout} >avançar</button>
 
                </div>
                <div className='layout4-central'>
                    Playlist criadas
                    <div className="icon-container-central">
                        <FaListUl/>
                    </div>

                    <button className="botao-pagina-central" onClick= {irParaVerPlaylist} >avançar</button>

                </div>
                
            </div>

            <div className="rodape-central"></div>
        </div>
    );

};

export default PaginaCentral;