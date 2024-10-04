import React , { useState } from 'react';
import '../../estilos/paginaplaylistlayout1.css';

import { FaPlus } from 'react-icons/fa';

const ModalPosicao1Layout = ({ fecharModal }) => {

  const [midias, setMidias] = useState([]); // Lista para armazenar as mídias

  // Função para adicionar uma nova mídia à lista
  const adicionarMidia = () => {
    const novaMidia = {
      id: midias.length + 1,
      nome: `Mídia ${midias.length + 1}`,
    };
    setMidias([...midias, novaMidia]); // Adiciona a nova mídia à lista
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-posicao1-layou1">
        <div className="modal2-posicao1-layou1">
            <h2>Conteúdo do Modal Imagem</h2>

              <div className='ordem-playlist-posicao1-layou1'>

                <div className='adicionar-midia-posicao1-layou1'>
                  <FaPlus onClick={adicionarMidia} />
                </div>

              {midias.map((midia) => (
                <div key={midia.id} className="midia-item">
                <span>{midia.nome}</span> {/* Nome da mídia */}
                
                {/* Campo para digitar o tempo */}

                <div>
                  <label htmlFor={`tempo-${midia.id}`}>tempo (seg.): </label>
                  <input
                    type="number"
                    id={`tempo-${midia.id}`}
                    name={`tempo-${midia.id}`}
                    step="any"  // Permite números inteiros e decimais
                    min="0"     // Valor mínimo permitido
                    className="input-tempo"
                    onChange={(e) => {
                      // Função para lidar com a alteração do valor do tempo
                      const valorTempo = parseFloat(e.target.value);
                      console.log(`Tempo da mídia ${midia.nome}: ${valorTempo} segundos`);
                    }}
                  />
                </div>
              </div>
              ))}
            </div>

            <div className="botao-container">
              {/*<button className='botao-salvar-imagem'>Salvar</button>*/}
              <button className='botao-modal-imagem' onClick={fecharModal}>Fechar</button>
            </div>
            
        </div>
      </div>
    </>
  );
};

export default ModalPosicao1Layout;
