import express from 'express'

//inicializando uma constante para usar a blibioteca express
const app = express()

//mostramos para o express que vamos usar .json
app.use(express.json())

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
app.get('/', (request, response)=>{

})