import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rotasMidias from './midias_rotas.js';
import './db.js'; // Importar a função de conexão com o banco de dados
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializando o express
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar a porta a partir do arquivo .env ou usar um valor padrão
const PORTA = process.env.PORTA || 3000;

// Configurar o middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (como imagens e vídeos) da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Usar as rotas de mídia
app.use('/api/midias', rotasMidias);

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

// criando uma nova rota da api
//app.get('/', (request, response)=>{
//})