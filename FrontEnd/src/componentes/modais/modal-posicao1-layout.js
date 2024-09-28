import React , { useState } from 'react';
import '../../estilos/paginaplaylistlayout1.css';

const ModalPosicao1Layout = ({ fecharModal }) => {

    const [editorData, setEditorData] = useState('');

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
            <h2>Conteúdo do Modal Imagem</h2>

            <div className="botao-container">
              {/*<button className='botao-salvar-imagem'>Salvar</button>*/}
              <button className='botao-modal-imagem' onClick={fecharModal}>Fechar</button>
            </div>
            
        </div>
      </div>
    </>
  );
};

export default ModalPosicao1Layout;
