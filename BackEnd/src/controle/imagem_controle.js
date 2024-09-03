import { response } from 'express'
import Imagem from '../modelos/imagem.js'

import fs from 'fs'

const create = async (request, response) =>{
    try {

        const {name} = request.body;

        const file = request.file;

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

const findAll = async (request, response) =>{
    try {
        
        const imagens = await Imagem.find();

    } catch (error) {

        response.status(500).json({message: "erro ao buscar imagens"})
    }
}

const findOne = async (request, response) => {
    try {

        const imagem = await Imagem.findById(request.params.id);

        if (!imagem) {
            return response.status(404).json({ message: "Imagem não encontrada" });
        }

        response.json(imagem);

    } catch (error) {

        response.status(500).json({ message: "Erro ao buscar imagem" });
    }
}

const remove = async (request, response) =>{
    try {

        const imagem = await Imagem.findById(req.params.id)

        if(!imagem){
            return response.status(404).json({message: "imagem não encontrada"})
        }

        fs.unlinkSync(imagem.src)

        await imagem.remove()

        response.json({ message : "imagem revomida com sucesso"})
        
    } catch (error) {
        response.status(500).json({message: "erro ao excluir imagem"})
    }
}

export default {
    create,
    remove,
    findOne,
    findAll,
    // outras funções
  };