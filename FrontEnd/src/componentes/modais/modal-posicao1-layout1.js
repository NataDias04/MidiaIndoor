import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalEscolherUpload from './modal-escolher-upload.js';

const ModalPosicao1Layout1 = ({ fecharModalPosicao1Layout1 }) => {
  const [modalEscolherUploadAberto, setModalEscolherUploadAberto] = useState(false);
  const [uploadsSelecionados, setUploadsSelecionados] = useState([]); // Lista para armazenar uploads selecionados

  const abrirModalEscolherUpload = () => setModalEscolherUploadAberto(true);
  const fecharModalEscolherUpload = () => setModalEscolherUploadAberto(false);

  const adicionarUpload = (upload) => {
    setUploadsSelecionados((prev) => [...prev, upload]); // Adiciona o upload à lista
  };

  const handleSalvarUpload = () => {
    console.log('Fechando o modal posicao1');
    fecharModalPosicao1Layout1();
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
                <div key={`${upload._id}-${index}`} className="upload-preview">
                  {"Id: "}{upload} {/* O texto se quebrará em linha automaticamente se o CSS estiver configurado corretamente */}
    {" | "} {/* Separador opcional */}
    {"Ordem: "}{index + 1}
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
