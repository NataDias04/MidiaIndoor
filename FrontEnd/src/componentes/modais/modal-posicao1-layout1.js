import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalEscolherUpload from './modal-escolher-upload.js';


const ModalPosicao1Layout1 = ({ fecharModalPosicao1Layout1, midiaSelecionada }) => {
  const [modalEscolherUploadAberto, setModalEscolherUploadAberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);

  const abrirModalEscolherUpload = () => setModalEscolherUploadAberto(true);
  const fecharModalEscolherUpload = () => setModalEscolherUploadAberto(false);

  const carregarUploadsEscolhidos = () => {
    setUploadsSelecionados(prevUploads => [...prevUploads]);
    fecharModalEscolherUpload(); // Fecha o modal após carregar os uploads
  };

  const handleSalvarUpload = () => {
    console.log(fecharModalPosicao1Layout1); // Verifica se fecharModal está definido
    fecharModalPosicao1Layout1(); // Chama a função para fechar o modal
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
          <h2>Conteúdo do Modal Imagem</h2>

          <div className='ordem-playlist-posicao1-layou1'>
            <div className='adicionar-upload-posicao1-layou1'>
              <div className="icon-container-dispositivo" onClick={abrirModalEscolherUpload}>
                <FaPlus />
                
                {modalEscolherUploadAberto && (
                  <ModalEscolherUpload 
                    fecharModalEscolherUpload={carregarUploadsEscolhidos} 
                    idsUploads={uploadsSelecionados} // Passa os IDs dos uploads
                  />
                )}
              </div>
            </div>
          </div>

          {/* Renderização dos uploads selecionados */}
          <div className="uploads-selecionados">
            {uploadsSelecionados.length > 0 ? (
              uploadsSelecionados.map((upload, index) => (
                <div key={index} className="upload-item">
                  <div>
                    <img 
                      src={upload.previewUrl} 
                      alt={`Preview ${upload.nome || upload.id}`} 
                      style={{ width: '100px', height: 'auto' }} 
                    />
                    <p>{upload.nome || upload.id}</p>
                    <input 
                      type="number" 
                      placeholder="Tempo (s)" 
                      min="0" 
                      className="input-tempo"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum upload selecionado.</p>
            )}
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
