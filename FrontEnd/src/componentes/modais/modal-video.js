import React, { useState } from 'react';
import '../../estilos/paginaupload.css';
import { salvarVideo, salvarVideoLink } from '../rotas/video';

const ModalVideo = ({ fecharModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [videoName, setVideoName] = useState('');
  const [erro, setErro] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Captura o primeiro arquivo selecionado
    if (selectedFile) {
      setVideoFile(selectedFile); // Atualiza o estado com o arquivo selecionado
      console.log('Arquivo de vídeo selecionado:', selectedFile); // Log para verificação
      setVideoName(selectedFile.name); // Define o nome do vídeo a partir do arquivo
    }
    setErro(''); // Limpa qualquer erro anterior
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
      ? () => salvarVideo(videoFile, videoFile.name) // Passa o arquivo de vídeo e o nome
      : () => salvarVideoLink(videoName, videoLink);  // Passa o nome e o link do vídeo

    // Chama a função correspondente (salvar vídeo ou link)
    saveFunction()
      .then(response => {
        // Lida com a resposta
        console.log('Salvo com sucesso:', response);
      })
      .catch(error => {
        // Lida com erros
        console.error('Erro ao salvar:', error);
        setErro('Erro ao salvar. Tente novamente.');
      });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-video">
          <h2>Conteúdo do Modal Vídeo</h2>

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

          {/* Mostrar input baseado no estado do checkbox */}
          {isChecked ? (
            // Campo para upload de arquivo de vídeo
            <input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleFileChange}
            />
          ) : (
            <>
              {/* Campo para inserir o nome do vídeo */}
              <input
                type="text"
                placeholder="Insira o nome do vídeo"
                value={videoName}
                onChange={handleNameChange}
              />
              {/* Campo para inserir o link do vídeo */}
              <input
                type="text"
                placeholder="Insira o link do vídeo"
                value={videoLink}
                onChange={handleLinkChange}
              />
            </>
          )}

          {/* Mostra o erro, se houver */}
          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-video" onClick={handleSave}>Salvar</button>
            <button className="botao-modal-video" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVideo;
