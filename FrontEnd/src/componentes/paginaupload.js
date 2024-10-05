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

  // Função para carregar as imagens
  const RenderizarImagem = (upload, index) => {
    console.log(upload);

    const extensao = upload.url ? upload.url.split('.').pop() : '';
    const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

    if (tiposDeImagem.includes(extensao.toLowerCase())) {
        if (upload.url.startsWith('http://') || upload.url.startsWith('https://')) {
            return (
                <img src={upload.url} alt={`upload-${index}`} className="preview-imagem" />
            );
        } else {
            return (
                <img src={`http://localhost:5000/${upload.url}`} alt={`upload-${index}`} className="preview-imagem" />
            );
        }
    }

    return null;
  };


   // Função para carregar os videos
   const RenderizarVideo = (upload, index) => {
    console.log(upload);

    const extensao = upload.url ? upload.url.split('.').pop() : '';
    const tiposDeVideo = ['mp4', 'webm', 'ogg'];

    if (tiposDeVideo.includes(extensao)) {

        if (upload.url.startsWith('http://') || upload.url.startsWith('https://')) {
            return (
                <video controls key={index} className="preview-video">
                    <source src={upload.url} type={`video/${extensao}`} />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            );
        } 

        else {
            return (
                <video controls key={index} className="preview-video">
                    <source src={`http://localhost:5000/${upload.url}`} type={`video/${extensao}`} />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            );
        }
    }
    return null;
  };



  // Função para carregar textos
  const RenderizarTexto = (upload) => {
    if (upload.conteudo) {
      return <p className="preview-texto">{upload.conteudo}</p>;
    }
    return null;
  };

  // Função para carregar HTML
  const RenderizarHtml = (upload) => {
    if (upload.conteudoHtml) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: upload.conteudoHtml }}
          className="preview-html"
        ></div>
      );
    }
    return null;
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
      
      const todosUploads = [...imagens, ...imagensLink, ...videos, ...videosLink, ...textos, ...htmls];

      todosUploads.sort((a, b) => new Date(a.data) - new Date(b.data));

      setUploads(todosUploads);

      
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
                  <button class="botao-apagar" >×</button>
                  {RenderizarImagem(upload, index)}
                  {RenderizarVideo(upload, index)}
                  {RenderizarTexto(upload)}
                  {RenderizarHtml(upload)}
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
