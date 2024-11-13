import React, { useState, useEffect } from 'react'; 
import '../../estilos/player3.css';
import { useLocation } from 'react-router-dom'; // useNavigate,

import YouTube from 'react-youtube';

const Player3 = () => {
    const location = useLocation();
    const PlaylistSelecionada = location.state?.PlaylistSelecionada;

    const [centro, setCentro] = useState([]);
    const [direita_cima, setDireitaCima] = useState([]);
    const [direita, setDireita] = useState([]);
    const [baixo, setBaixo] = useState([]);
    const [baixo_esquerda, setBaixoEsquerda] = useState([]);
    const [mediaCarregada, setMediaCarregada] = useState(false);

    //const tiposDeVideo = ['mp4', 'webm', 'ogg'];
    //const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;
    //const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    const cacheMidia = (midia) => {
        const cachedMidia = localStorage.getItem(midia._id);
        if (cachedMidia) return JSON.parse(cachedMidia);
        
        localStorage.setItem(midia._id, JSON.stringify(midia));
        return midia;
    };

    const CarregarMidia = async (playlist) => {
        if (!Array.isArray(playlist.playlist.ordemMidias)) {
            console.error('ordemMidias não é um array ou está indefinido:', playlist.ordemMidias);
            return;
        }
        for (const midia of playlist.playlist.ordemMidias) {
            try {
                const cachedMidia = cacheMidia(midia);
                DistribuirMidia(cachedMidia, cachedMidia.posicao);
            } catch (erro) {
                console.error(`Erro ao carregar mídia ${midia._id}:`, erro);
            }
        }
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
        } else if (posicao === 'direita-cima') {
            setDireitaCima((prev) => [...prev, midia]);
        } else if (posicao === 'direita') {
            setDireita((prev) => [...prev, midia]);
        } else if (posicao === 'baixo-esquerda') {
            setBaixoEsquerda((prev) => [...prev, midia]);
        } else if (posicao === 'baixo') {
            setBaixo((prev) => [...prev, midia]);
        }
    };

    const Player3Centro = ({ listacentro }) => {
      const [indexAtual, setIndexAtual] = useState(0);
      const [isVideo, setIsVideo] = useState(false);
      const isHtml = (str) => /<[^>]+>/g.test(str);
    
      useEffect(() => {
        const itemAtual = listacentro[indexAtual];
    
        if (!itemAtual) {
          console.warn(`Item ${indexAtual + 1} não encontrado.`);
          return;
        }
    
        console.log(`Exibindo item ${indexAtual + 1}:`, itemAtual);
    
        const extensao = itemAtual.url ? itemAtual.url.split('.').pop() : '';
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;
        const tiposDeVideo = ['mp4', 'webm', 'ogg'];
        
        if (youtubeRegex.test(itemAtual.url) || tiposDeVideo.includes(extensao)) {
          setIsVideo(true);
        } else {
          setIsVideo(false);
          const tempoDeExibicao = itemAtual.tempo || 30000;
          const timeout = setTimeout(() => {
            setIndexAtual((indexAtual + 1) % listacentro.length);
          },  tempoDeExibicao * 1000);
    
          return () => clearTimeout(timeout);
        }
        
      }, [indexAtual, listacentro]);

      const handleVideoEnd = () => {
        setIndexAtual((indexAtual + 1) % listacentro.length);
      };
    
      const renderizarItem = (upload, index) => {
        if (!upload) return null;
    
        const extensao = upload.url ? upload.url.split('.').pop() : '';
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{10,12})$/;
        const tiposDeVideo = ['mp4', 'webm', 'ogg'];
        const tiposDeImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    
        if (youtubeRegex.test(upload.url)) {
          const videoId = upload.url.split('v=')[1]?.split('&')[0] || upload.url.split('/').pop();
          return (
            <YouTube
              key={index}
              videoId={videoId}
              onEnd={handleVideoEnd}
              opts={{
                height: '390',
                width: '640',
                playerVars: { autoplay: 1, controls: 0 },
              }}
              className="preview-video"
            />
          );
        } else if (tiposDeVideo.includes(extensao)) {
          return (
            <video 
              key={index} 
              className="video" 
              autoPlay 
              onEnded={() => setIndexAtual((indexAtual + 1) % listacentro.length)}
              controls={false}
            >
              <source 
                src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} 
                type={`video/${extensao}`} 
              />
              Seu navegador não suporta a tag de vídeo.
            </video>
          );
        } else if (tiposDeImagem.includes(extensao)) {
          return (
            <img
              key={index}
              className="imagem"
              src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`}
              alt={`Imagem ${index}`}
            />
          );
        } else if (upload.conteudo && !isHtml(upload.conteudo)) {
          return <p key={index} className="texto">{upload.conteudo}</p>;
        } else if (upload.conteudo) {
          return (
            <>
              <iframe 
                key={`iframe-${index}`} 
                className="preview-html-conteudo" 
                srcDoc={upload.conteudo}
                width="100%" 
                height="100%" 
                frameBorder="0"
                title={`Iframe - ${upload.nome}`}
              ></iframe>
            </>
          );
        }
        return null;
      };
    
      return (
        <div className="conteudo-centro">
          {renderizarItem(listacentro[indexAtual], indexAtual)}
        </div>
      );
    };

    const Player3DireitaCima = ({ listadireitacima }) => {
      const [indexAtual, setIndexAtual] = useState(0);
      const isHtml = (str) => /<[^>]+>/g.test(str);
    
      useEffect(() => {
        const itemAtual = listadireitacima[indexAtual];
    
        if (!itemAtual) {
          console.warn(`Item ${indexAtual + 1} não encontrado.`);
          return;
        }
    
        const tempo = itemAtual.tempo || 5;
    
        console.log(`Exibindo item ${indexAtual + 1}:`, itemAtual);
    
        const timer = setTimeout(() => {
          const proximoIndex = (indexAtual + 1) % listadireitacima.length;
          setIndexAtual(proximoIndex);
        }, tempo * 1000);
    
        return () => clearTimeout(timer);
      }, [indexAtual, listadireitacima]);
    
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
            <video controls key={index} className="video">
              <source src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} type={`video/${extensao}`} />
              Seu navegador não suporta a tag de vídeo.
            </video>
          );
        } else if (tiposDeImagem.includes(extensao)) {
          return (
            <img
              key={index}
              className="imagem"
              src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`}
              alt={`Imagem ${index}`}
            />
          );
        } else if (upload.conteudo && !isHtml(upload.conteudo)) {
          return <p key={index} className="texto">{upload.conteudo}</p>;
        } else if (upload.conteudo) {
          return (
            <>
              <iframe 
                key={`iframe-${index}`} 
                className="preview-html-conteudo" 
                srcDoc={upload.conteudo}
                width="100%" 
                height="100%" 
                frameBorder="0"
                title={`Iframe - ${upload.nome}`}
              ></iframe>
            </>
          );
        }
        return null;
      };
    
      return (
        <div className="conteudo-direita-cima">
          {renderizarItem(listadireitacima[indexAtual], indexAtual)}
        </div>
      );
    };
    
    

    const Player3Direita = ({ listadireita }) => {
      const [indexAtual, setIndexAtual] = useState(0);
      const isHtml = (str) => /<[^>]+>/g.test(str);
    
      useEffect(() => {
        const itemAtual = listadireita[indexAtual];
    
        if (!itemAtual) {
          console.warn(`Item ${indexAtual + 1} não encontrado.`);
          return;
        }
    
        const tempo = itemAtual.tempo || 5;
    
        console.log(`Exibindo item ${indexAtual + 1}:`, itemAtual);
    
        const timer = setTimeout(() => {
          const proximoIndex = (indexAtual + 1) % listadireita.length;
          setIndexAtual(proximoIndex);
        }, tempo * 1000);
    
        return () => clearTimeout(timer);
      }, [indexAtual, listadireita]);
    
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
            <video controls key={index} className="video">
              <source src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} type={`video/${extensao}`} />
              Seu navegador não suporta a tag de vídeo.
            </video>
          );
        } else if (tiposDeImagem.includes(extensao)) {
          return (
            <img
              key={index}
              className="imagem"
              src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`}
              alt={`Imagem ${index}`}
            />
          );
        } else if (upload.conteudo && !isHtml(upload.conteudo)) {
          return <p key={index} className="texto">{upload.conteudo}</p>;
        } else if (upload.conteudo) {
          return (
            <>
              <iframe 
                key={`iframe-${index}`} 
                className="preview-html-conteudo" 
                srcDoc={upload.conteudo}
                width="100%" 
                height="100%" 
                frameBorder="0"
                title={`Iframe - ${upload.nome}`}
              ></iframe>
            </>
          );
        }
        return null;
      };
    
      return (
        <div className="conteudo-direita">
          {renderizarItem(listadireita[indexAtual], indexAtual)}
        </div>
      );
    };

    const Player3BaixoEsquerda = ({ listabaixoesquerda }) => {
      const [indexAtual, setIndexAtual] = useState(0);
      const isHtml = (str) => /<[^>]+>/g.test(str);
    
      useEffect(() => {
        const itemAtual = listabaixoesquerda[indexAtual];
    
        if (!itemAtual) {
          console.warn(`Item ${indexAtual + 1} não encontrado.`);
          return;
        }
    
        const tempo = itemAtual.tempo || 5;
    
        console.log(`Exibindo item ${indexAtual + 1}:`, itemAtual);
    
        const timer = setTimeout(() => {
          const proximoIndex = (indexAtual + 1) % listabaixoesquerda.length;
          setIndexAtual(proximoIndex);
        }, tempo * 1000);
    
        return () => clearTimeout(timer);
      }, [indexAtual, listabaixoesquerda]);
    
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
            <video controls key={index} className="video">
              <source src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`} type={`video/${extensao}`} />
              Seu navegador não suporta a tag de vídeo.
            </video>
          );
        } else if (tiposDeImagem.includes(extensao)) {
          return (
            <img
              key={index}
              className="imagem"
              src={upload.url.startsWith('http') ? upload.url : `http://localhost:5000/${upload.url}`}
              alt={`Imagem ${index}`}
            />
          );
        } else if (upload.conteudo && !isHtml(upload.conteudo)) {
          return <p key={index} className="texto">{upload.conteudo}</p>;
        } else if (upload.conteudo) {
          return (
            <>
              <iframe 
                key={`iframe-${index}`} 
                className="preview-html-conteudo" 
                srcDoc={upload.conteudo}
                width="100%" 
                height="100%" 
                frameBorder="0"
                title={`Iframe - ${upload.nome}`}
              ></iframe>
            </>
          );
        }
        return null;
      };
    
      return (
        <div className="conteudo-baixo-esquerda">
          {renderizarItem(listabaixoesquerda[indexAtual], indexAtual)}
        </div>
      );
    };
    
    const Player3Baixo = () => {
      const [noticias, setNoticias] = useState([]);
      const [noticiaIndex, setNoticiaIndex] = useState(0);

      useEffect(() => {
        const buscarNoticias = async () => {
          try {
            const resposta = await fetch(
              'https://api.rss2json.com/v1/api.json?rss_url=https://rss.tecmundo.com.br/feed'
            );
            const dados = await resposta.json();
            setNoticias(dados.items || []);
          } catch (erro) {
            console.error('Erro ao buscar notícias:', erro);
            setNoticias([]);
          }
        };

        buscarNoticias();
      }, []);

      useEffect(() => {
        const tempo = 30;
        if (noticias.length > 0) {
          const timer = setTimeout(() => {
            const proximoIndex = (noticiaIndex + 1) % noticias.length;
            setNoticiaIndex(proximoIndex);
          }, tempo * 1000);

          return () => clearTimeout(timer);
        }
      }, [noticiaIndex, noticias]);

      const renderizarNoticia = (noticia) => {

        const removeHtmlTags = (htmlString) => {
          return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
        };

        return (
          <div className="noticia" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }} >{removeHtmlTags(noticia.title)}</h2>
            <h4 style={{ color: 'white', textAlign: 'center' }}> {removeHtmlTags(noticia.description)} </h4>
          </div>
        );
      };

      return (
        <div className="conteudo-baixo">
          {noticias.length > 0 && renderizarNoticia(noticias[noticiaIndex])}
        </div>
      );
    };
      

    return (
        <div className="player3-dashbord-player3">

          <div className="player3-linha-1">
            <div className="player3-centro">
              <Player3Centro listacentro={centro} />
            </div>
            <div className='player3-coluna1'>
              <div className="player3-direita-cima">
                <Player3DireitaCima listadireitacima={direita_cima} />
              </div>

              <div className="player3-direita">
                <Player3Direita listadireita={direita} />
              </div>
            </div>
          </div>

          <div className="player3-linha-2">
            <div className='player3-coluna2'>
                <div className='player3-baixo-esquerda'>
                  <Player3BaixoEsquerda listabaixoesquerda={baixo_esquerda} />
                </div>

                <div className='player3-baixo'>
                  <Player3Baixo listabaixo={baixo} />
                </div>
            </div>
          </div>
          
        </div>
    );
};

export default Player3;
