import express from 'express'
import path from 'path';
import rotasMidias from './medias_rotas.js';
import { fileURLToPath } from 'url';

//inicializando uma constante para usar a blibioteca express
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//mostramos para o express que vamos usar .json
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

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

// Servir arquivos estáticos (como imagens e vídeos) da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Usar as rotas de mídia
app.use('/api/midias', rotasMidias);

// Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});