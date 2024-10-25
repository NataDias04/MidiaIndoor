import React, { useState, useEffect } from 'react'; 
import '../../estilos/player1.css';

import { useNavigate,useLocation  } from 'react-router-dom';

import {buscarVideo, buscarVideoLink} from '../rotas/videoplayer.js';

import {buscarHtml, buscarTextoSimples} from '../rotas/textoplayer.js';

import {buscarImagem, buscarImagemLink} from '../rotas/imagemplayer.js';

const Player1 = () => {

    const location = useLocation();
    const PlaylistSelecionada = location.state?.PlaylistSelecionada;

    const [centro, setCentro] = useState([]);
    const [direita, setDireita] = useState([]);
    const [baixo, setBaixo] = useState([]);


    const CarregarMidia = async (playlist) => {
      if (!Array.isArray(playlist.playlist.ordemMidias)) {
        console.error('ordemMidias não é um array ou está indefinido:', playlist.ordemMidias);
        return;
      }
      for (const midia of playlist.playlist.ordemMidias) {
        try {
          console.log(`Carregando mídia: ${midia._id} na posição: ${midia.posicao}`);

            DistribuirMidia(midia, midia.posicao);

        } catch (erro) {
          console.error(`Erro ao carregar mídia ${midia._id}:`, erro);
        }
      }
      return null;
    };

    useEffect(() => {
      if (PlaylistSelecionada) {
        CarregarMidia(PlaylistSelecionada);
      }
    }, [PlaylistSelecionada]);

    const DistribuirMidia = (midia, posicao) => {
  
      if (posicao === 'centro') {
        setCentro((prev) => [...prev, midia]);
      } else if (posicao === 'direita') {
        setDireita((prev) => [...prev, midia]);
      } else if (posicao === 'baixo') {
        setBaixo((prev) => [...prev, midia]);
      }
    };

  return (
    <div className="player-dashbord-player1">
      {console.log(PlaylistSelecionada)}
        {console.log("TESTE CENTRO",centro)}
        {console.log("TESTE DIREITA",direita)}
        {console.log("TESTE BAIXO",baixo)}
    </div>
  );
};

export default Player1;