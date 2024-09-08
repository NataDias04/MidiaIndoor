import React, { useState } from 'react';
import '../estilos/paginaupload.css';

import { Icon } from '@iconify/react';

import IconeImagem from '@iconify-icons/ph/image-light';
import IconeVideo from '@iconify/icons-mdi/video-outline';
import IconeTexto from '@iconify/icons-fluent/text-t-12-filled';

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

      <div className='secao'>
        <div className='imagem'>
          <Icon icon={IconeImagem} className="imagem-icone" />
          <button className="botao-imagem" onClick={abrirModalImagem}>arquivo</button>
        </div>

        {modalImagemAberto && <ModalImagem fecharModal={fecharModalImagem} />}
      </div>

      <div className='secao'>
        <div className='video'>
          <Icon icon={IconeVideo} className="video-icone" />
          <button className="botao-video" onClick={abrirModalVideo}>arquivo</button>
        </div>

        {modalVideoAberto && <ModalVideo fecharModal={fecharModalVideo} />}
      </div>

      <div className='secao'>
        <div className='texto'>
          <Icon icon={IconeTexto} className="texto-icone" />
          <button className="botao-texto" onClick={abrirModalTexto}>arquivo</button>
        </div>

        {modalTextoAberto && <ModalTexto fecharModal={fecharModalTexto} />}
      </div>

      <div className="rodape">rodapé</div>
    </div>
  );
};

export default PaginaUpload;
