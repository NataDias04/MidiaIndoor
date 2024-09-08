import React, { useState } from 'react';
import '../estilos/paginaupload.css';
import { Icon } from '@iconify/react';
import IconeImagem from '@iconify-icons/ph/image-light';
import IconeVideo from '@iconify/icons-mdi/video-outline';
import IconeTexto from '@iconify/icons-fluent/text-t-12-filled';

const PaginaUpload = () => {
  // Estados para controlar a visibilidade dos modais
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [modalVideoAberto, setModalVideoAberto] = useState(false);
  const [modalTextoAberto, setModalTextoAberto] = useState(false);

  // Funções para abrir e fechar os modais
  const abrirModalImagem = () => setModalImagemAberto(true);
  const fecharModalImagem = () => setModalImagemAberto(false);

  const abrirModalVideo = () => setModalVideoAberto(true);
  const fecharModalVideo = () => setModalVideoAberto(false);

  const abrirModalTexto = () => setModalTextoAberto(true);
  const fecharModalTexto = () => setModalTextoAberto(false);

  return (
    <div className="dashbord">
      <div className="cabecalho">cabeçalho</div>

      {/* Seção para Imagem */}
      <div className='secao'>
        <div className='imagem'>
          <Icon icon={IconeImagem} className="imagem-icone" />
          <button className="botao-imagem" onClick={abrirModalImagem}>arquivo</button>
        </div>

        {modalImagemAberto && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <div className="modal-conteudo">
                <h2>Conteúdo do Modal Imagem</h2>
                <button onClick={fecharModalImagem}>Fechar</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Seção para Vídeo */}
      <div className='secao'>
        <div className='video'>
          <Icon icon={IconeVideo} className="video-icone" />
          <button className="botao-video" onClick={abrirModalVideo}>arquivo</button>
        </div>

        {modalVideoAberto && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <div className="modal-conteudo">
                <h2>Conteúdo do Modal Vídeo</h2>
                <button onClick={fecharModalVideo}>Fechar</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Seção para Texto */}
      <div className='secao'>
        <div className='texto'>
          <Icon icon={IconeTexto} className="texto-icone" />
          <button className="botao-texto" onClick={abrirModalTexto}>arquivo</button>
        </div>

        {modalTextoAberto && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <div className="modal-conteudo">
                <h2>Conteúdo do Modal Texto</h2>
                <button onClick={fecharModalTexto}>Fechar</button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="rodape">rodapé</div>
    </div>
  );
};

export default PaginaUpload;
