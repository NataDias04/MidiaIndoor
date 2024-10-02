import React, { useState, useEffect } from 'react'; 
import '../estilos/paginaupload.css';

import { useNavigate } from 'react-router-dom';
import { FaRegImage, FaRegFileAlt, FaRegPlayCircle } from 'react-icons/fa';

import ModalImagem from './modais/modal-imagem.js';
import ModalVideo from './modais/modal-video.js';
import ModalTexto from './modais/modal-texto.js';

import { buscarImagens, buscarImagensLink, deletarImagem, deletarImagemLink } from './rotas/imagem.js';
import { buscarTextosSimples, buscarHtmls, deletarTextoSimples, deletarHtml } from './rotas/texto.js';
import { buscarVideos, buscarVideosLink, deletarVideo, deletarVideoLink } from './rotas/video.js';

const PaginaUpload = () => {
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [modalVideoAberto, setModalVideoAberto] = useState(false);
  const [modalTextoAberto, setModalTextoAberto] = useState(false);
  const [uploads, setUploads] = useState([]); // Estado para armazenar os uploads

  const abrirModalImagem = () => setModalImagemAberto(true);
  const fecharModalImagem = () => setModalImagemAberto(false);

  const abrirModalVideo = () => setModalVideoAberto(true);
  const fecharModalVideo = () => setModalVideoAberto(false);

  const abrirModalTexto = () => setModalTextoAberto(true);
  const fecharModalTexto = () => setModalTextoAberto(false);

  const navigate = useNavigate();
  
  const irParaCentral = () => {
    navigate('/central');
  };

  // Função para buscar os uploads
  const carregarUploads = async () => {
    try {
      const imagens = await buscarImagens();
      const imagensLink = await buscarImagensLink();
      const videos = await buscarVideos();
      const videosLink = await buscarVideosLink();
      const textos = await buscarTextosSimples();
      const htmls = await buscarHtmls();
      
      // Armazenar todos os uploads juntos
      setUploads([...imagens, ...imagensLink, ...videos, ...videosLink, ...textos, ...htmls]);
    } catch (error) {
      console.error("Erro ao carregar uploads", error);
    }
  };

  // Chamar a função de busca quando o componente carregar
  useEffect(() => {
    carregarUploads();
  }, []);

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
          <div className='previews-upload'>
            {/* Renderizar os previews dos uploads */}
            {uploads.length > 0 ? (
              uploads.map((upload, index) => (
                <div key={index} className="upload-preview">
                  {/* Exibir previews diferentes dependendo do tipo de upload */}
                  {upload.url && <img src={upload.url} alt={`upload-${index}`} className="preview-imagem" />}
                  {upload.conteudo && <p className="preview-texto">{upload.conteudo}</p>}
                  {upload.conteudoHtml && <div dangerouslySetInnerHTML={{ __html: upload.conteudoHtml }} className="preview-html"></div>}
                </div>
              ))
            ) : (
              <p>Nenhum upload encontrado.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rodape-upload">
        <button className="botao-anterior-central" onClick={irParaCentral}>cancelar</button>
        <button className="botao-anterior-central" onClick={irParaCentral}>salvar</button>
      </div>
    </div>
  );
};

export default PaginaUpload;
