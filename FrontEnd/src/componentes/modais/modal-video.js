import React from 'react';
import '../../estilos/paginaupload.css';

const ModalVideo = ({ fecharModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-video">
          <h2>Conteúdo do Modal Vídeo</h2>
          <button className='botao-modal-video' onClick={fecharModal}>Fechar</button>
        </div>
      </div>
    </>
  );
};

export default ModalVideo;
