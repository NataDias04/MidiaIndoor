import React, { useState } from 'react';
import '../estilos/paginaplaylistlayout2.css';

import { FaPlus } from 'react-icons/fa';
import ModalPosicao1Layout2 from './modais/modal-posicao1-layout2.js';
import ModalPosicao2Layout2 from './modais/modal-posicao2-layout2.js';
import ModalPosicao3Layout2 from './modais/modal-posicao3-layout2.js';

import { criarPlaylist } from './rotas/playlist.js';
import { useNavigate } from 'react-router-dom';

const PaginaPlaylistLayout2 = () => {
  const [ModalPosicao1Layout2Aberto, setModalPosicao1Layout2Aberto] = useState(false);
  const [ModalPosicao2Layout2Aberto, setModalPosicao2Layout2Aberto] = useState(false);
  const [ModalPosicao3Layout2Aberto, setModalPosicao3Layout2Aberto] = useState(false);

  const abrirModalPosicao1Layout2 = () => setModalPosicao1Layout2Aberto(true);
  const fecharModalPosicao1Layout2 = () => setModalPosicao1Layout2Aberto(false);

  const abrirModalPosicao2Layout2 = () => setModalPosicao2Layout2Aberto(true);
  const fecharModalPosicao2Layout2 = () => setModalPosicao2Layout2Aberto(false);

  const abrirModalPosicao3Layout2 = () => setModalPosicao3Layout2Aberto(true);
  const fecharModalPosicao3Layout2 = () => setModalPosicao3Layout2Aberto(false);

  const [uploadsSelecionados, setUploadsSelecionados] = useState([]);
  const [PlaylistName, setPlaylistName] = useState('');
  const [erro, setErro] = useState(null);

  const atualizarUploadsSelecionados = (novosUploads) => {
    setUploadsSelecionados((prevUploads) => [...prevUploads, ...novosUploads]);
  };

  const navigate = useNavigate();

  const irParaLayout = () => navigate('/layout');
  const irParaCentral = () => navigate('/central');

  const handlePlaylistChange = (e) => {
    setPlaylistName(e.target.value);
    setErro('');
  };

  const handleSalvarPlaylist = () => {
    criarPlaylist(PlaylistName, uploadsSelecionados);
    irParaCentral();
  };

  const handlecancelar = () =>{
    localStorage.clear();
    irParaLayout();
  };

  return (
    <div className="dashbord-playlist-layout2">
      <div className="cabecalho-playlist-layout2">
        <input
          className="nome-playlist"
          type="text"
          placeholder="Insira o nome da playlist"
          value={PlaylistName}
          onChange={handlePlaylistChange}
        />
      </div>

      <div className="secao-layout2">
        <div className="linha-layout2-layout2">
          <div className="borda1-layout2-layout2">
            <FaPlus onClick={abrirModalPosicao2Layout2} />
            {ModalPosicao2Layout2Aberto && (
              <ModalPosicao2Layout2
                fecharModalPosicao2Layout2={fecharModalPosicao2Layout2}
                atualizarUploadsSelecionados={atualizarUploadsSelecionados}
              />
            )}
          </div>
          <div className="borda2-layout2-layout2">
            <FaPlus onClick={abrirModalPosicao1Layout2} />
            {ModalPosicao1Layout2Aberto && (
              <ModalPosicao1Layout2
                fecharModalPosicao1Layout2={fecharModalPosicao1Layout2}
                atualizarUploadsSelecionados={atualizarUploadsSelecionados}
              />
            )}
          </div>
        </div>
        <div className="linha-layout2-layout2">
          <div className="borda3-layout2-layout2">
            {/*<FaPlus onClick={abrirModalPosicao3Layout2} />
            {ModalPosicao3Layout2Aberto && (
              <ModalPosicao3Layout2
                fecharModalPosicao3Layout2={fecharModalPosicao3Layout2}
                atualizarUploadsSelecionados={atualizarUploadsSelecionados}
              />
            )}*/}
          </div>
        </div>
      </div>

      <div className="rodape-playlist-layout2">
        <button onClick={handlecancelar}>cancelar</button>
        <button onClick={handleSalvarPlaylist}>salvar</button>
      </div>
    </div>
  );
};

export default PaginaPlaylistLayout2;
