import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalEscolherUpload from './modal-escolher-upload.js';

import { deletarImagem, deletarImagemLink } from '../rotas/imagem.js';
import { deletarTextoSimples, deletarHtml } from '../rotas/texto.js';
import { deletarVideo, deletarVideoLink } from '../rotas/video.js';

import API_URL from '../../config.js';

const ModalPosicao2Layout3 = ({ fecharModalPosicao2Layout3, atualizarUploadsSelecionados }) => {
  const [modalEscolherUploadAberto, setModalEscolherUploadAberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);
  const [tempos, setTempos] = useState({});
  const [minhaListaRequisicoes, setMinhaListaRequisicoes] = useState([]);

  const abrirModalEscolherUpload = () => setModalEscolherUploadAberto(true);
  const fecharModalEscolherUpload = () => setModalEscolherUploadAberto(false);

  const adicionarUpload = (upload) => {
    setUploadsSelecionados((prev) => {
      const novosUploads = [...prev, upload];

      const url = upload.url || '';
      const extensao = url.split('.').pop();
      const tiposDeVideo = ['mp4', 'webm', 'ogg'];
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;

      if (tiposDeVideo.includes(extensao.toLowerCase()) || youtubeRegex.test(url)) {
        setTempos((prevTempos) => ({ ...prevTempos, [novosUploads.length - 1]: '0' }));
      }

      return novosUploads;
    });
  };

  const handleSalvarUpload = () => {
    console.log('Fechando o modal posicao2 layout3');
    console.log('Tempos dos uploads:', tempos);
    atualizarUploadsSelecionados(minhaListaRequisicoes);
    
    fecharModalPosicao2Layout3();
  };

  const handleTempoChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      console.log(`Mudando o tempo do upload ${index + 1} para: ${value}`);
      setTempos((prev) => ({ ...prev, [index]: value }));
    } else {
      console.log(`Valor inválido para o upload ${index + 1}: ${value}`);
    }
  };

  useEffect(() => {
    const novasRequisicoes = uploadsSelecionados.map((upload, index) => ({
      midia: upload._id,
      url: upload.url,
      caminhointerno: upload.caminhointerno,
      tempo: tempos[index] || '',
      ordem: index + 1,
      posicao: "direita-cima",
    }));
    setMinhaListaRequisicoes(novasRequisicoes);

    if (uploadsSelecionados.length > 0) {
      localStorage.setItem('uploadsSelecionados_posicao2Layout2Layout3', JSON.stringify(uploadsSelecionados));
    }

    if (Object.keys(tempos).length > 0) {
      localStorage.setItem('temposUploads_posicao2Layout2Layout3', JSON.stringify(tempos));
    }
  }, [uploadsSelecionados, tempos]);

  useEffect(() => {
    const uploadsSalvos = localStorage.getItem('uploadsSelecionados_posicao2Layout2Layout3');
    if (uploadsSalvos) {
      setUploadsSelecionados(JSON.parse(uploadsSalvos));
    }
    const temposSalvos = localStorage.getItem('temposUploads_posicao2Layout2Layout3');
    if (temposSalvos) {
      setTempos(JSON.parse(temposSalvos));
    }
  }, []);

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

  const ApagarUploadSelecionado = (upload) => {
    try {
      console.log('Removendo upload localmente:', upload);
      const novaLista = uploadsSelecionados.filter((u) => u._id !== upload._id);
      setUploadsSelecionados(novaLista);
    } catch (erro) {
      console.error('Erro ao remover upload da lista:', erro);
    }
  };

  return (
    <>
      <div className='previews'>
        {minhaListaRequisicoes.map((imagem) => (
          <img key={imagem.midia} src={`url_da_imagem/${imagem.midia}`} alt="Preview" />
        ))}
      </div>
      <div className="overlay"></div>
      <div className="modal-posicao2-layout3">
        <div className="modal2-posicao2-layout3">
          Centro

          <div className='ordem-playlist-posicao2-layout3'>
            <div className='adicionar-upload-posicao2-layout3'>
              <div className="icon-container-dispositivo">
                <FaPlus onClick={abrirModalEscolherUpload} />
                {modalEscolherUploadAberto && (
                  <ModalEscolherUpload 
                    fecharModalEscolherUpload={fecharModalEscolherUpload}
                    adicionarUpload={adicionarUpload}
                  />
                )}
              </div>
            </div>

            <div className="lista-uploads">
              {uploadsSelecionados.map((upload, index) => {
                const tempo = tempos[index] || '';
                return (
                  <div key={`${upload._id}-${index}`} className="upload-preview-layout3">
                    <button
                      className="botao-apagar"
                      onClick={() => ApagarUploadSelecionado(upload)}
                    >
                      ×
                    </button>
                    {RenderizarImagem(upload, index)}
                    {RenderizarVideo(upload, index)}
                    {RenderizarTexto(upload, index)}
                    {RenderizarHtml(upload)}
                    {console.log("ID:", upload._id)}
                    {console.log("Ordem:", index + 1)}
                    {console.log("Posição:", "centro")}
                    <input
                      className="tempo"
                      type="text"
                      placeholder="tempo(seg)"
                      value={tempos[index] || ''}
                      onChange={(e) => handleTempoChange(index, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="botao-container">
            <button className='botao-cancel-layout-upload' onClick={fecharModalPosicao2Layout3}>Fechar</button>
            <button className='botao-salvar-layout-upload' onClick={handleSalvarUpload}>Salvar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPosicao2Layout3;
