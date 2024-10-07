import React, { useState }  from 'react';
import '../estilos/paginadispositivo.css';

import ModalDispositivo from './modais/modal-dispositivo.js';

import { FaTv } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const PaginaDispositivo = () => {

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModalDispositivo = () => setModalAberto(true);
    const fecharModalDispositivo = () => setModalAberto(false);

    const navigate = useNavigate();

    const irParaCentral = () => {
        navigate('/central');
      };

    return(
        <div className="dashbord-dispositivo">
            <div className="cabecalho-dispositivo">cabeçalho</div>

            <div className='linha-dispositivo'>

                <div className='column1-dispositivo'>
                    <div className='div-dispositivo'>
                        <div className="icon-container-dispositivo">
                            <FaTv />
                        </div>
                        <button className="botao-dispositivo" onClick={abrirModalDispositivo}>arquivo</button>
                        {modalAberto && <ModalDispositivo fecharModalDispositivo={fecharModalDispositivo} />}
                    </div>
                </div>

                <div className='column2-dispositivo'>
                        <div className='previews-dispositivo'>
                        
                    </div>
                </div>
            </div>

            <div className="rodape-dispositivo">
                <button className="botao-anterior-central" onClick={irParaCentral}>cancelar</button>
                <button className="botao-anterior-central" onClick={irParaCentral}>salvar</button>
            </div>
        </div>
    );

};

export default PaginaDispositivo;