import React from 'react';
import '../../estilos/paginaupload.css';

const ModalImagem = ({ fecharModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-imagem">
          <h2>Conteúdo do Modal Imagem</h2>
          <button className='botao-modal-imagem' onClick={fecharModal}>Fechar</button>
        </div>
      </div>
    </>
  );
};

export default ModalImagem;
