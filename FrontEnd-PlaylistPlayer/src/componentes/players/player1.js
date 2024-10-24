import React, { useState, useEffect } from 'react'; 
import '../../estilos/player1.css';

import { useNavigate,useLocation  } from 'react-router-dom';

import {buscarVideo, buscarVideoLink} from '../rotas/videoplayer.js';

import {buscarHtml, buscarTextoSimples} from '../rotas/textoplayer.js';

import {buscarImagem, buscarImagemLink} from '../rotas/imagemplayer.js';

const Player1 = () => {

    const location = useLocation();
    const { PlaylistSelecionada } = location.state || {};

    const BuscarMidia = async (midia) => {
      const funcoes = [
        buscarVideo,
        buscarVideoLink,
        buscarHtml,
        buscarTextoSimples,
        buscarImagem,
        buscarImagemLink
      ];
    
      for (const func of funcoes) {
        try {
          const resultado = await func(midia);

          if (resultado) {
            console.log(`Função ${func.name} retornou:`, resultado);
            return resultado;
          }
        } catch (erro) {
          console.error(`Erro ao executar ${func.name}:`, erro);
        }
      }
    
      console.log('Nenhuma mídia encontrada para esta playlist.');
      return null;
      };

    const CarregarMidia = async (playlist) => {
      for (const midia of playlist.ordemMidias) {
        console.log(BuscarMidia(midia));
      }
    };

  return (
    <div>

    </div>
  );
};

export default Player1;