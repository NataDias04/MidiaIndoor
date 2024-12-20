import React, { useState } from 'react';
import '../../estilos/paginaupload.css';

import { salvarVideo, salvarVideoLink } from '../rotas/video';

const ModalVideo = ({ fecharModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [videoName, setVideoName] = useState('');
  const [erro, setErro] = useState('');
  const tipo = 'video';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setVideoFile(selectedFile);
      console.log('Arquivo de vídeo selecionado:', selectedFile);
      setVideoName(selectedFile.name);
    }
    setErro('')
  };

  const handleLinkChange = (e) => {
    setVideoLink(e.target.value);
    setErro('');
  };

  const handleNameChange = (e) => {
    setVideoName(e.target.value);
    setErro('');
  };

  const handleSave = () => {
    const saveFunction = isChecked 
      ? () => salvarVideo(videoFile, videoFile.name,tipo)
      : () => salvarVideoLink(videoName, videoLink,tipo);

    saveFunction()
      .then(response => {
        console.log('Salvo com sucesso:', response);
      })
      .catch(error => {
        console.error('Erro ao salvar:', error);
        setErro('Erro ao salvar. Tente novamente.');
      });
  };

  const onSaveAndClose = async () => {
    await handleSave();
    fecharModal();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-video">
          Upload de videos

          <div className="linha-check-box">
            Link
            <input
              type="checkbox"
              id="checkboxInput"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            Arquivo
          </div>

          {isChecked ? (
            <input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleFileChange}
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Insira o nome do vídeo"
                value={videoName}
                onChange={handleNameChange}
              />

              <input
                type="text"
                placeholder="Insira o link do vídeo"
                value={videoLink}
                onChange={handleLinkChange}
              />
            </>
          )}

          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-video" onClick={onSaveAndClose}>Salvar</button>
            <button className="botao-modal-video" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVideo;
