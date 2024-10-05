import React from 'react';
import '../estilos/paginadispositivo.css';

import { FaFileUpload, FaPlus, FaListUl, FaTv } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const PaginaDispositivo = () => {

    const navigate = useNavigate();

    return(
        <div className="dashbord-dispositivo">
            <div className="cabecalho-dispositivo">Dashboard</div>

            <div className='secao-dispositivo'>
                
            </div>

            <div className="rodape-dispositivo"></div>
        </div>
    );

};

export default PaginaDispositivo;