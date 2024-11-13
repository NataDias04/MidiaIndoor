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
  const [uploads, setUploads] = useState([]);

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

   const RenderizarVideo = (upload, index) => {
      console.log(upload);

      const extensao = upload.url ? upload.url.split('.').pop() : '';
      const tiposDeVideo = ['mp4', 'webm', 'ogg'];

      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;

      if (youtubeRegex.test(upload.url)) {
          const videoId = upload.url.split('v=')[1]?.split('&')[0] || upload.url.split('/').pop();
          return (
              <iframe
                  key={index}
                  className="preview-video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video ${index}`}
              ></iframe>
          );
      } else if (tiposDeVideo.includes(extensao)) {
          if (upload.url.startsWith('http://') || upload.url.startsWith('https://')) {
              return (
                  <video controls key={index} className="preview-video">
                      <source src={upload.url} type={`video/${extensao}`} />
                      Seu navegador não suporta a tag de vídeo.
                  </video>
              );
          } else {
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

  const RenderizarTexto = (upload, index) => {

    const isHtml = (str) => /<[^>]+>/g.test(str);

    if (upload.conteudo && !isHtml(upload.conteudo)) {
      return <p key={index} className="preview-texto">{upload.conteudo}</p>;
    }
    return null;
  };

  /*const RenderizarHtml = (upload, index) => {

    const isHtml = (str) => /<[^>]+>/g.test(str);
  
    if (upload.conteudo && isHtml(upload.conteudo)) {
      if (upload.nome) {
        console.log("TESTE TITULO", upload.nome);
        return (
          <p key={index} className="preview-html-titulo">
            {`Titulo do Html: ${upload.nome}`}
          </p>
        );
      }
    }
    return null;
  };*/

  const RenderizarHtml = (upload, index) => {

    const isHtml = (str) => /<[^>]+>/g.test(str);
    
    if (upload.conteudo && isHtml(upload.conteudo)) {
      if (upload.nome) {
        console.log("TESTE TITULO", upload.nome);
        return (
          <>
            <iframe 
              key={`iframe-${index}`} 
              className="preview-html-conteudo" 
              srcDoc={upload.conteudo}
              width="100%" 
              height="500px" 
              frameBorder="0"
              title={`Iframe - ${upload.nome}`}
            ></iframe>
          </>
        );
      }
    }
    return null;
  };
  
  
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

  const deletarUpload = async (upload) => {
    try {
      console.log(upload)

      if (upload.url && upload.url.startsWith('uploads')) {
        if (upload.url.endsWith('.mp4') || upload.url.endsWith('.webm') || upload.url.endsWith('.ogg')) {
          await deletarVideo(upload._id);
        } else {
          await deletarImagem(upload._id);
        }
      } 

      else if (upload.url && (upload.url.startsWith('http://') || upload.url.startsWith('https://'))) {
        if (upload.url.endsWith('.mp4') || upload.url.endsWith('.webm') || upload.url.endsWith('.ogg') || upload.url.includes('youtube.com/watch') || upload.url.includes('youtu.be')) {
          await deletarVideoLink(upload._id);
        } else {
          await deletarImagemLink(upload._id);
        }
      } 

      else if (upload.conteudo && upload.conteudo.includes('<html>') && upload.conteudo.includes('<!DOCTYPE')) {
        await deletarHtml(upload._id);
      } 

      else if (upload.conteudo) {
        await deletarTextoSimples(upload._id);
      } 

      carregarUploads();
    } catch (erro) {
      console.error('Erro ao deletar upload:', erro);
    }
  };

  const carregarposmodalimagem = async () => {
    fecharModalImagem();
    carregarUploads();
  };

  const carregarposmodaltexto = async () => {
    fecharModalTexto();
    carregarUploads();
  };

  const carregarposmodalvideo = async () => {
    fecharModalVideo();
    carregarUploads();
  };

  useEffect(() => {
    carregarUploads();
  }, []);

  return (
    <div className="dashbord-upload">
      <div className="cabecalho-upload"></div>

      <div className='linha-upload'>

        <div className='column1-upload'>
          <div className='imagem-upload'>
            <div className="icon-container-upload">
              <FaRegImage />
            </div>
            <button className="botao-imagem-upload" onClick={abrirModalImagem}>arquivo</button>
            {modalImagemAberto && <ModalImagem fecharModal={carregarposmodalimagem} />}
          </div>

          <div className='video-upload'>
            <div className="icon-container-upload">
              <FaRegPlayCircle />
            </div>
            <button className="botao-video-upload" onClick={abrirModalVideo}>arquivo</button>
            {modalVideoAberto && <ModalVideo fecharModal={carregarposmodalvideo} />}
          </div>

          <div className='texto-upload'>
            <div className="icon-container-upload">
              <FaRegFileAlt />
            </div>
            <button className="botao-texto-upload" onClick={abrirModalTexto}>arquivo</button>
            {modalTextoAberto && <ModalTexto fecharModal={carregarposmodaltexto} />}
          </div>
        </div>

        <div className='column2-upload'>
          <div className='previews-upload'>
            {uploads.length > 0 ? (
              uploads.map((upload, index) => (
                <div key={index} className="upload-preview">
                  <button className="botao-apagar"  onClick={() => deletarUpload(upload)} >×</button>
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
        <button className="botao-anterior-central" onClick={irParaCentral}>voltar</button>
      </div>
    </div>
  );
};

export default PaginaUpload;
