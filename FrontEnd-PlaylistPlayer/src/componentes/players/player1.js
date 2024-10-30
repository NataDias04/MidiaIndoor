import React, { useState, useEffect } from 'react'; 
import '../../estilos/player1.css';
import { useLocation } from 'react-router-dom'; // useNavigate,

const Player1 = () => {
    const location = useLocation();
    const PlaylistSelecionada = location.state?.PlaylistSelecionada;

    const [centro, setCentro] = useState([]);
    const [direita, setDireita] = useState([]);
    const [baixo, setBaixo] = useState([]);
    const [mediaCarregada, setMediaCarregada] = useState(false);

    const tiposDeVideo = ['mp4', 'webm', 'ogg'];
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;
    const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

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
        if (PlaylistSelecionada && !mediaCarregada) {
            CarregarMidia(PlaylistSelecionada);
            setMediaCarregada(true);
        }
    }, [PlaylistSelecionada, mediaCarregada]);

    const DistribuirMidia = (midia, posicao) => {
        if (posicao === 'centro') {
            setCentro((prev) => [...prev, midia]);
        } else if (posicao === 'direita') {
            setDireita((prev) => [...prev, midia]);
        } else if (posicao === 'baixo') {
            setBaixo((prev) => [...prev, midia]);
        }
    };

    const PlayerCentro = ({ listacentro }) => {
        const [indexAtual, setIndexAtual] = useState(0);
      
        useEffect(() => {
          const itemAtual = listacentro[indexAtual];
      
          if (!itemAtual) {
            console.warn(`Item ${indexAtual + 1} não encontrado.`);
            return;
          }
      
          const tempo = itemAtual.tempo || 5;
      
          console.log(`Exibindo item ${indexAtual + 1}:`, itemAtual);
      
          const timer = setTimeout(() => {
            const proximoIndex = (indexAtual + 1) % listacentro.length;
            setIndexAtual(proximoIndex);
          }, tempo * 1000);
      
          return () => clearTimeout(timer);
        }, [indexAtual, listacentro]);
      
        const renderizarItem = (upload, index) => {
          if (!upload) return null;
      
          const extensao = upload.url ? upload.url.split('.').pop() : '';
          const tiposDeVideo = ['mp4', 'webm', 'ogg'];
          const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;
          const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      
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
          } else if (tiposDeImagem.includes(extensao)) {
            return (
              <img
                key={index}
                className="preview-imagem"
                src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`}
                alt={`Imagem ${index}`}
              />
            );
          } else if (upload.conteudo) {
            return <p key={index} className="preview-texto">{upload.conteudo}</p>;
          } else if (upload.conteudoHtml) {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: upload.conteudoHtml }}
                className="preview-html"
              ></div>
            );
          }
          return null;
        };
      
        return <div>{renderizarItem(listacentro[indexAtual], indexAtual)}</div>;
      };
      

    return (
        <div className="player-dashbord-player1">
            <PlayerCentro listacentro={centro} />
        </div>
    );
};

export default Player1;
