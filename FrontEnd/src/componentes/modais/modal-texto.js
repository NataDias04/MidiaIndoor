import React from 'react';
import '../../estilos/paginaupload.css';

const ModalTexto = ({ fecharModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-texto">
          <h2>Conteúdo do Modal Texto</h2>
          <button className='botao-modal-texto' onClick={fecharModal}>Fechar</button>
        </div>
      </div>
    </>
  );
};

export default ModalTexto;
