import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalEscolherUpload from './modal-escolher-upload.js';

const ModalPosicao1Layout1 = ({ fecharModalPosicao1Layout1 }) => {
  const [modalEscolherUploadAberto, setModalEscolherUploadAberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]); // Lista para armazenar uploads selecionados
  const [tempos, setTempos] = useState({}); // Estado para armazenar os tempos

  const abrirModalEscolherUpload = () => setModalEscolherUploadAberto(true);
  const fecharModalEscolherUpload = () => setModalEscolherUploadAberto(false);

  const adicionarUpload = (upload) => {
    setUploadsSelecionados((prev) => [...prev, upload]); // Adiciona o upload à lista
  };

  const handleSalvarUpload = () => {
    console.log('Fechando o modal posicao1');
    console.log('Tempos dos uploads:', tempos); // Exibe os tempos no console
    fecharModalPosicao1Layout1();
  };

  const handleTempoChange = (index, value) => {
    // Verifica se o valor é um número inteiro
    if (/^\d*$/.test(value)) { // Regex para permitir apenas números inteiros
      console.log(`Mudando o tempo do upload ${index + 1} para: ${value}`); // Log para verificar a mudança
      setTempos((prev) => ({ ...prev, [index]: value })); // Atualiza o tempo para o índice correspondente
    } else {
      console.log(`Valor inválido para o upload ${index + 1}: ${value}`); // Log para valores inválidos
    }
  };

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

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
          <h2>Conteúdo do Modal Imagem</h2>

          <div className='ordem-playlist-posicao1-layou1'>
            <div className='adicionar-upload-posicao1-layou1'>
              <div className="icon-container-dispositivo">
                <FaPlus onClick={abrirModalEscolherUpload} />
                {/* Passar a função adicionarUpload para o ModalEscolherUpload */}
                {modalEscolherUploadAberto && (
                  <ModalEscolherUpload 
                    fecharModalEscolherUpload={fecharModalEscolherUpload}
                    adicionarUpload={adicionarUpload} // Passando a função
                  />
                )}
              </div>
            </div>

            {/* Renderiza a lista de uploads selecionados */}
            <div className="lista-uploads">
              {uploadsSelecionados.map((upload, index) => {
                console.log(upload, index + 1); // Mostra o upload atual
                console.log('Uploads selecionados:', uploadsSelecionados);
                return (
                  <div key={`${upload._id}-${index}`} className="upload-preview-layout1">
                    {RenderizarImagem(upload, index)}
                    {RenderizarVideo(upload, index)}
                    {RenderizarTexto(upload, index)}
                    {RenderizarHtml(upload)}
                    {console.log("ID:" , upload._id)}
                    {console.log("Ordem:" , index + 1)}
                    {console.log("Posição:" , "centro")}
                    <input
                      className="tempo"
                      type="text"
                      placeholder="tempo(seg)"
                      value={tempos[index] || ''} // Define o valor do input a partir do estado
                      onChange={(e) => handleTempoChange(index, e.target.value)} // Atualiza o estado ao mudar o valor
                    />
                    {console.log("Tempo:" , tempos[index] || '')}
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
