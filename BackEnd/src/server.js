import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db.js';
import ImagemRota from './rotas/imagem.js';
import ImagemRotaLink from './rotas/imagem_link.js';
import VideoRota from './rotas/video.js';
import VideoLinkRota from './rotas/video_link.js';
import TextoSimplesRota from './rotas/texto_simples.js'
import HtmlRota from './rotas/html.js'
import DispositivoRota from './rotas/dispositivo.js'
import PlaylistRota from './rotas/playlist.js'

// Carregar variáveis de ambiente
dotenv.config();

// Inicializando o express
const app = express();

// Middleware para configurar CORS
app.use(cors());

// Middleware para interpretar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para interpretar JSON
app.use(express.json()); 

// Configura o diretório de uploads para ser acessível publicamente
app.use('/uploads', express.static('uploads'));

// Configurar a porta a partir do arquivo .env ou usar um valor padrão
const PORTA = process.env.PORTA || 3000;

app.use("/imagem", ImagemRota)
app.use("/imagem_link", ImagemRotaLink);
app.use("/video", VideoRota);
app.use('/video_link', VideoLinkRota);
app.use('/texto', TextoSimplesRota);
app.use('/html', HtmlRota);
app.use('/dispositivo', DispositivoRota);
app.use('/playlist',PlaylistRota)

// Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});


/*
    para definir uma rota e preciso saber:
    1) tipo de rota / método HTTP
        get -> listar
        post -> criar
        put -> editar vário
        patch -> editar um
        delete -> deletar

        HTTP status
            2xx -> sucesso
            4xx -> erro cliente
            5xx -> erro servidor
    2) endereço / exemplo
        www.site.br/produtos
        www.site.br/usuarios
*/

/* criando uma nova rota da api
 app.get('/', (request, response)=>{
}) */