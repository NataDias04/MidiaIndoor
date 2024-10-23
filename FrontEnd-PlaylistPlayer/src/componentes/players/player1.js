import React, { useState, useEffect } from 'react'; 
import '../../estilos/player1.css';

import { useNavigate,useLocation  } from 'react-router-dom';

import {buscarVideo, buscarVideoLink} from '../rotas/videoplayer.js';

import {buscarHtml, buscarTextoSimples} from '../rotas/textoplayer.js';

import {buscarImagem, buscarImagemLink} from '../rotas/imagemplayer.js';

const Player1 = () => {

    const location = useLocation();
    const { PlaylistSelecionada } = location.state || {};

    const BuscarMidias = async () => {
        try {
          const resultados = await Promise.all(
            PlaylistSelecionada.map(async (_id) => {
              const funcoesDeBusca = [
                buscarVideo,
                buscarVideoLink,
                buscarHtml,
                buscarTextoSimples,
                buscarImagem,
                buscarImagemLink,
              ];

              for (const func of funcoesDeBusca) {
                const resultado = await func(_id);
                if (resultado) {
                  return { _id, tipo: func.name, resultado };
                }
              }
              return { _id, tipo: 'nenhum', resultado: null };
            })
          );
    
          console.log('Resultados:', resultados);

        } catch (erro) {
          console.error('Erro ao buscar mídias:', erro);
        }
      };

  return (
    <div>
        {console.log(BuscarMidias(PlaylistSelecionada))}
    </div>
  );
};

export default Player1;