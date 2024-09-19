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
    <div className="dashbord-upload">
      <div className="cabecalho-upload">cabeçalho</div>

      <div className='linha-upload'>

        <div className='column1-upload'>
          <div className='imagem-upload'>
            <button className="botao-imagem-upload" onClick={abrirModalImagem}>arquivo</button>

            {modalImagemAberto && <ModalImagem fecharModal={fecharModalImagem} />}
          </div>

          <div className='video-upload'>
            <button className="botao-video-upload" onClick={abrirModalVideo}>arquivo</button>

            {modalVideoAberto && <ModalVideo fecharModal={fecharModalVideo} />}
          </div>

          <div className='texto-upload'>
            <button className="botao-texto-upload" onClick={abrirModalTexto}>arquivo</button>

            {modalTextoAberto && <ModalTexto fecharModal={fecharModalTexto} />}
          </div>
        </div>

        <div className='column2-upload'>
          <div className='previews-upload'></div>
        </div>
      </div>

      <div className="rodape-upload">rodapé</div>
    </div>
  );
};

export default PaginaUpload;
