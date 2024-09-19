import React, { useState } from 'react';
import '../estilos/paginaupload.css';

import ModalImagem from './modais/modal-imagem.js';
import ModalVideo from './modais/modal-video.js';
import ModalTexto from './modais/modal-texto.js';

const PaginaUpload = () => {

  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [modalVideoAberto, setModalVideoAberto] = useState(false);
  const [modalTextoAberto, setModalTextoAberto] = useState(false);

  const abrirModalImagem = () => setModalImagemAberto(true);
  const fecharModalImagem = () => setModalImagemAberto(false);

  const abrirModalVideo = () => setModalVideoAberto(true);
  const fecharModalVideo = () => setModalVideoAberto(false);

  const abrirModalTexto = () => setModalTextoAberto(true);
  const fecharModalTexto = () => setModalTextoAberto(false);

  return (
    <div className="dashbord">
      <div className="cabecalho">cabeçalho</div>

      <div className='linha'>

        <div className='column1'>
          <div className='imagem'>
            <button className="botao-imagem" onClick={abrirModalImagem}>arquivo</button>

            {modalImagemAberto && <ModalImagem fecharModal={fecharModalImagem} />}
          </div>

          <div className='video'>
            <button className="botao-video" onClick={abrirModalVideo}>arquivo</button>

            {modalVideoAberto && <ModalVideo fecharModal={fecharModalVideo} />}
          </div>

          <div className='texto'>
            <button className="botao-texto" onClick={abrirModalTexto}>arquivo</button>

            {modalTextoAberto && <ModalTexto fecharModal={fecharModalTexto} />}
          </div>
        </div>

        <div className='column2'>
          <div className='previews'></div>
        </div>
      </div>

      <div className="rodape">rodapé</div>
    </div>
  );
};

export default PaginaUpload;
