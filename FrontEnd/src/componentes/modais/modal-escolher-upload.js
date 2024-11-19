import React, { useState, useEffect } from 'react';
import { buscarImagens, buscarImagensLink } from '../rotas/imagem.js';
import { buscarTextosSimples, buscarHtmls } from '../rotas/texto.js';
import { buscarVideos, buscarVideosLink } from '../rotas/video.js';

import '../../estilos/modal-escolher-upload.css'

import API_URL from '../../config.js';

const ModalEscolherUpload = ({ fecharModalEscolherUpload, adicionarUpload }) => {
  const [uploads, setUploads] = useState([]);
  const [uploadSelecionado, setUploadSelecionado] = useState(null);

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

  const RenderizarImagem = (upload, index) => {
    const extensao = upload.url ? upload.url.split('.').pop() : '';
    const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

    if (tiposDeImagem.includes(extensao.toLowerCase())) {
      return (
        <img src={upload.url.startsWith('http') ? upload.url : `${API_URL}${upload.url}`} alt={`upload-${index}`} className="preview-imagem" />
      );
    }
    return null;
  };

  const RenderizarVideo = (upload, index) => {
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
      return (
        <video controls key={index} className="preview-video">
          <source src={upload.url.startsWith('http') ? upload.url : `${API_URL}${upload.url}`} type={`video/${extensao}`} />
          Seu navegador não suporta a tag de vídeo.
        </video>
      );
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
              width="80%" 
              height="80%" 
              frameBorder="0"
              title={`Iframe - ${upload.nome}`}
            ></iframe>
          </>
        );
      }
    }
    return null;
  };

  const handleSelecionarUpload = (upload) => {
    setUploadSelecionado(upload);
  };

  const handleSalvarUpload = (upload) => {
    console.log('ID do upload selecionado:', upload);
    adicionarUpload(upload);
    fecharModalEscolherUpload();
  };

  useEffect(() => {
    carregarUploads();
  }, []);

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
          <h2>Escolha seu Upload</h2>
          <div className='previews-upload-escolher'>
            {uploads.length > 0 ? (
              uploads.map((upload, index) => (
                <div
                  key={index}
                  className={`escolher-upload-preview ${uploadSelecionado === upload ? 'selecionado' : ''}`}
                  onClick={() => handleSelecionarUpload(upload)}
                >
                  {RenderizarImagem(upload, index)}
                  {RenderizarVideo(upload, index)}
                  {RenderizarTexto(upload, index)}
                  {RenderizarHtml(upload)}
                </div>
              ))
            ) : (
              <p>Nenhum upload encontrado.</p>
            )}
          </div>
          <div className="botao-container">
            <button className='botao-salvar-upload' onClick={() => handleSalvarUpload(uploadSelecionado)}>Salvar</button>
            <button className='botao-modal-upload' onClick={fecharModalEscolherUpload}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEscolherUpload;
