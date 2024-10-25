import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalEscolherUpload from './modal-escolher-upload.js';

import { deletarImagem, deletarImagemLink } from '../rotas/imagem.js';
import { deletarTextoSimples, deletarHtml } from '../rotas/texto.js';
import { deletarVideo, deletarVideoLink } from '../rotas/video.js';

const ModalPosicao1Layout1 = ({ fecharModalPosicao1Layout1, atualizarUploadsSelecionados }) => {
  const [modalEscolherUploadAberto, setModalEscolherUploadAberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);
  const [tempos, setTempos] = useState({});
  const [minhaListaRequisicoes, setMinhaListaRequisicoes] = useState([]);

  const abrirModalEscolherUpload = () => setModalEscolherUploadAberto(true);
  const fecharModalEscolherUpload = () => setModalEscolherUploadAberto(false);

  const adicionarUpload = (upload) => {
    setUploadsSelecionados((prev) => [...prev, upload]);
  
    // Verifica se o upload é um vídeo e define o tempo como 0
    const extensao = upload.url ? upload.url.split('.').pop() : '';
    const tiposDeVideo = ['mp4', 'webm', 'ogg'];
    if (tiposDeVideo.includes(extensao.toLowerCase())) {
      setTempos((prev) => ({ ...prev, [uploadsSelecionados.length]: '0' }));
    }
  };

  const handleSalvarUpload = () => {
    console.log('Fechando o modal posicao1');
    console.log('Tempos dos uploads:', tempos);
    atualizarUploadsSelecionados(minhaListaRequisicoes);
    
    fecharModalPosicao1Layout1();
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
      tempo: tempos[index] || '',
      ordem: index + 1,
      posicao: "centro",
    }));
    console.log("Novas requisições:", novasRequisicoes);
    setMinhaListaRequisicoes(novasRequisicoes);

    // Salva os uploads selecionados no localStorage
    if (uploadsSelecionados.length > 0) {
      localStorage.setItem('uploadsSelecionados', JSON.stringify(uploadsSelecionados));
    }

    if (Object.keys(tempos).length > 0) {
      localStorage.setItem('temposUploads', JSON.stringify(tempos));
    }

  }, [uploadsSelecionados, tempos]);

  // Recupera os uploads salvos no localStorage ao montar o componente
  useEffect(() => {
    const uploadsSalvos = localStorage.getItem('uploadsSelecionados');
    if (uploadsSalvos) {
      setUploadsSelecionados(JSON.parse(uploadsSalvos));
    }
    const temposSalvos = localStorage.getItem('temposUploads');
    if (temposSalvos) {
      setTempos(JSON.parse(temposSalvos));
    }
  }, []);

  const RenderizarImagem = (upload, index) => {
    const extensao = upload.url ? upload.url.split('.').pop() : '';
    const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

    if (tiposDeImagem.includes(extensao.toLowerCase())) {
      return (
        <img src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} alt={`upload-${index}`} className="preview-imagem" />
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
          <source src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} type={`video/${extensao}`} />
          Seu navegador não suporta a tag de vídeo.
        </video>
      );
    }
    return null;
  };

  const RenderizarTexto = (upload, index) => {
    return upload.conteudo ? <p key={index} className="preview-texto">{upload.conteudo}</p> : null;
  };

  const RenderizarHtml = (upload) => {
    return upload.conteudoHtml ? (
      <div dangerouslySetInnerHTML={{ __html: upload.conteudoHtml }} className="preview-html"></div>
    ) : null;
  };
  
  const ApagarUploadSelecionado = (upload) => {
    try {
      console.log('Removendo upload localmente:', upload);
  
      // Filtra a lista, removendo o item com o ID correspondente
      const novaLista = uploadsSelecionados.filter((u) => u._id !== upload._id);
  
      // Atualiza o estado com a nova lista filtrada
      setUploadsSelecionados(novaLista);
      
      console.log('Upload removido da lista:', novaLista);
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
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
          <h2>Conteúdo do Modal Imagem</h2>

          <div className='ordem-playlist-posicao1-layou1'>
            <div className='adicionar-upload-posicao1-layou1'>
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
                console.log(upload, index + 1);
                console.log('Uploads selecionados:', uploadsSelecionados);
                const tempo = tempos[index] || '';
                
                return (
                  <div key={`${upload._id}-${index}`} className="upload-preview-layout1">
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
                      disabled={RenderizarVideo(upload, index) !== null}
                    />
                    
                  </div>
                );

              })}
            </div>
          </div>

          <div className="botao-container">
            <button className='botao-salvar-upload' onClick={handleSalvarUpload}>Salvar</button>
            <button className='botao-modal-upload' onClick={fecharModalPosicao1Layout1}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPosicao1Layout1;
