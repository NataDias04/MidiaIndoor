import { response } from 'express'
import Imagem from '../modelos/imagem.js'

import fs from 'fs';
import path from 'path';

const create = async (request, response) =>{
    try {

        const {nome, tipo} = request.body;

        const file = request.file;

        const caminhoCorrigido = file.path.replace(/\\/g, '/'); 

        const imagem = new Imagem({
            nome,
            tipo,
            url: caminhoCorrigido,
        })

        await imagem.save()

        response.json({imagem, msg: "mensagem salva com sucesso!"})
        
    } catch (error) {
        console.error("Erro ao salvar imagem:", error);
        response.status(500).json({message: "erro ao salvar imagem"})
    }
}

const findAll = async (request, response) =>{
    try {
        
        const imagens = await Imagem.find();
        response.status(200).json(imagens);

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
        
        return response.status(200).json(imagem);

    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
        return response.status(500).json({ message: "Erro ao buscar imagem" });
    }
};

const remove = async (request, response) =>{
    try {

        const imagem = await Imagem.findById(request.params.id)

        if(!imagem){
            return response.status(404).json({message: "imagem não encontrada"})
        }

        fs.unlinkSync(imagem.url)

        await Imagem.deleteOne({ _id: request.params.id });

        response.json({ message : "imagem revomida com sucesso"})
        
    } catch (error) {
        response.status(500).json({message: "erro ao excluir imagem", erro: error.message})
    }
}

export default {
    create,
    remove,
    findOne,
    findAll,
  };