import React from 'react';
import '../../estilos/paginaupload.css';

const ModalVideo = ({ fecharModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-video">
            <h2>Conteúdo do Modal Vídeo</h2>

            <div className="botao-container">
              <button className='botao-salvar-video'>Salvar</button>
              <button className='botao-modal-video' onClick={fecharModal}>Fechar</button>
            </div>

        </div>
      </div>
    </>
  );
};

export default ModalVideo;
