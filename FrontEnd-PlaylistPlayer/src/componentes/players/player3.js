import React, { useState, useEffect } from 'react'; 
import '../../estilos/player3.css';
import { useLocation } from 'react-router-dom'; // useNavigate,
import API_URL from '../../config.js';

import YouTube from 'react-youtube';

const CACHE_NAME = 'ArquivosCache';

const Player3 = () => {
    const location = useLocation();
    const PlaylistSelecionada = location.state?.PlaylistSelecionada;

    const [centro, setCentro] = useState([]);
    const [direita_cima, setDireitaCima] = useState([]);
    const [direita, setDireita] = useState([]);
    const [baixo, setBaixo] = useState([]);
    const [baixo_esquerda, setBaixoEsquerda] = useState([]);
    const [mediaCarregada, setMediaCarregada] = useState(false);

    async function baixarMidia(midia) {
      const cache = await caches.open(CACHE_NAME);
    
      const cachedResponse = await cache.match(midia.url);
      if (cachedResponse) {
        if (midia.tipo === 'texto' || midia.tipo === 'html') {
          midia.urlcache = await cachedResponse.text();
        } 
        
        else {
          const blob = await cachedResponse.blob();
          console.log("Tipo de Blob:", blob.type);
          const urlBlob = URL.createObjectURL(blob)
          midia.urlcache = urlBlob;
          console.log(urlBlob);
        }
        return;
      }
    
      try {
        const response = await fetch(midia.url);
        if (!response.ok) {
          throw new Error(`Erro ao baixar mídia: ${midia.url}`);
        }
    
        const responseClone = response.clone();
    
        if (midia.tipo === 'texto' || midia.tipo === 'html') {
          midia.urlcache = await response.text();
        } else {
          const blob = await response.blob();
          const urlBlob = URL.createObjectURL(blob)
          midia.urlcache = urlBlob;
          console.log(urlBlob);
        }
    
        await cache.put(midia.url, responseClone);
        //console.log(`Mídia armazenada em cache: ${midia.url}`);
      } catch (error) {
        midia.erro = error.message;
        //console.error(`Erro ao baixar mídia: ${error.message}`);
      }
    }
    
    const CarregarMidia = async (playlist) => {
      if (!Array.isArray(playlist.playlist.ordemMidias)) {
        console.error('ordemMidias não é um array ou está indefinido:', playlist.playlist.ordemMidias);
        return;
      }
      try {
        for (const midia of playlist.playlist.ordemMidias) {
          try {
            await baixarMidia(midia);
            DistribuirMidia(midia, midia.posicao);
          } catch (erro) {
            console.error(`Erro ao carregar mídia ${midia._id}:`, erro);
          }
        }
      } catch (erro) {
        console.error('Erro ao carregar a playlist:', erro);
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

    const renderizarItem = (upload, index, onVideoEnd) => {
      if (!upload) return null;
    
      const isHtml = (str) => /<[^>]+>/g.test(str);
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
            onEnd={onVideoEnd}
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
            onEnded={onVideoEnd}
            controls={false}
          >
            <source 
              src={upload.urlcache || `${API_URL}${upload.url}`} 
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
            src={upload.urlcache || `${API_URL}${upload.url}`}
            alt={`Imagem ${index}`}
          />
        );
      } else if (upload.conteudo && !isHtml(upload.conteudo)) {
        return <p key={index} className="texto">{upload.conteudo}</p>;
      } else if (upload.conteudo) {
        return (
          <iframe 
            key={`iframe-${index}`} 
            className="preview-html-conteudo" 
            srcDoc={upload.conteudo}
            width="100%" 
            height="100%" 
            frameBorder="0"
            title={`Iframe - ${upload.nome}`}
          ></iframe>
        );
      }
      return null;
    };

    const Player3Centro = ({ listacentro }) => {
      const [indexAtual, setIndexAtual] = useState(0);
      const [isVideo, setIsVideo] = useState(false);
    
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
          const tempoDeExibicao = itemAtual.tempo || 30;
          const timeout = setTimeout(() => {
            setIndexAtual((indexAtual + 1) % listacentro.length);
          }, tempoDeExibicao * 1000);
    
          return () => clearTimeout(timeout);
        }
      }, [indexAtual, listacentro]);
    
      const handleVideoEnd = () => {
        setIndexAtual((indexAtual + 1) % listacentro.length);
      };
    
      return (
        <div className="conteudo-centro">
          {renderizarItem(listacentro[indexAtual], indexAtual, handleVideoEnd)}
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

      const handleVideoEnd = () => {
        setIndexAtual((indexAtual + 1) % listadireita.length);
      };
    
      return (
        <div className="conteudo-direita">
          {renderizarItem(listadireita[indexAtual], indexAtual,handleVideoEnd)}
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

      const handleVideoEnd = () => {
        setIndexAtual((indexAtual + 1) % listadireitacima.length);
      };
    
      return (
        <div className="conteudo-direita-cima">
          {renderizarItem(listadireitacima[indexAtual], indexAtual, handleVideoEnd)}
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

      const handleVideoEnd = () => {
        setIndexAtual((indexAtual + 1) % listabaixoesquerda.length);
      };
    
      return (
        <div className="conteudo-baixo-esquerda">
          {renderizarItem(listabaixoesquerda[indexAtual], indexAtual,handleVideoEnd)}
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
