import React from 'react';
import '../../estilos/paginaupload.css';

const ModalImagem = ({ fecharModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-imagem">
            <h2>Conteúdo do Modal Imagem</h2>

            <div className="botao-container">
            <button className='botao-exclui-imagem' >Excluir</button>
              <button className='botao-salvar-imagem'>Salvar</button>
              <button className='botao-modal-imagem' onClick={fecharModal}>Fechar</button>
            </div>
            
        </div>
      </div>
    </>
  );
};

export default ModalImagem;
