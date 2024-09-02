import { response } from 'express'
import Imagem from '../modelos/imagem.js'

const create = async (require, response) =>{
    try {

        const {name} = require.body;

        const file = require.file;

        const imagem = new Imagem({
            name,
            src: file.path,
        })

        await imagem.save()

        response.json({imagem, msg: "mensagem salva com sucesso!"})
        
    } catch (error) {
        
        response.status(500).json({message: "erro ao salvar imagem"})
    }
}

export default {
    create,
    // outras funções
  };