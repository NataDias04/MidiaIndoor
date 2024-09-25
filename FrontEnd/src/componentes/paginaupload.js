import React, { useState } from 'react';
import '../estilos/paginaupload.css';

import { useNavigate } from 'react-router-dom';

import { FaRegImage , FaRegFileAlt, FaRegPlayCircle} from 'react-icons/fa';

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

  const navigate = useNavigate(); // useNavigate é usado para redirecionar o usuário

  const irParaCentral = () => {
    navigate('/central'); // Redireciona para a página de playlist
};

  return (
    <div className="dashbord-upload">
      <div className="cabecalho-upload">cabeçalho</div>

      <div className='linha-upload'>

        <div className='column1-upload'>
          <div className='imagem-upload'>

            <div className="icon-container-upload">
              <FaRegImage />
            </div>

            <button className="botao-imagem-upload" onClick={abrirModalImagem}>arquivo</button>

            {modalImagemAberto && <ModalImagem fecharModal={fecharModalImagem} />}
          </div>

          <div className='video-upload'>

            <div className="icon-container-upload">
              <FaRegPlayCircle />
            </div>

            <button className="botao-video-upload" onClick={abrirModalVideo}>arquivo</button>

            {modalVideoAberto && <ModalVideo fecharModal={fecharModalVideo} />}
          </div>

          <div className='texto-upload'>
            <div className="icon-container-upload">
              <FaRegFileAlt />
            </div>

            <button className="botao-texto-upload" onClick={abrirModalTexto}>arquivo</button>

            {modalTextoAberto && <ModalTexto fecharModal={fecharModalTexto} />}
          </div>
        </div>

        <div className='column2-upload'>
          <div className='previews-upload'></div>
        </div>
      </div>

      <div className="rodape-upload">
      <button className="botao-anterior-central" onClick= {irParaCentral} >cancelar</button>
      <button className="botao-anterior-central" onClick= {irParaCentral} >salvar</button>
      </div>
    </div>
  );
};

export default PaginaUpload;
