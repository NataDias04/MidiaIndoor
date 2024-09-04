import ImagemLink from '../modelos/imagem_link.js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const create = async (request, response) => {
  try {

    const { name, externalUrl } = request.body;

    let filePath = null;

    if (request.file) {

      filePath = request.file.path;

    } else if (externalUrl) {

      const responseFetch = await fetch(externalUrl);

      const arrayBuffer = await responseFetch.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}_${path.basename(externalUrl)}`;

      filePath = `uploads/${fileName}`;

      fs.writeFileSync(filePath, buffer);
    }

    const imagemLink = new ImagemLink({
      name,
      src: filePath,
      externalUrl: externalUrl || null,
    });

    await imagemLink.save();

    response.status(201).json({ mensagem: 'Imagem ou link salvo com sucesso!', imagemLink });

  } catch (error) {

    response.status(500).json({ mensagem: 'Erro ao salvar imagem ou link', erro: error.message });

  }
};

const findAll = async (request, response) => {
  try {

    const imagens = await ImagemLink.find();

    response.json(imagens);

  } catch (error) {

    response.status(500).json({ mensagem: 'Erro ao buscar imagens ou links', erro: error.message });

  }
};

const findOne = async (request, response) => {
  try {

    const imagemLink = await ImagemLink.findById(request.params.id);

    if (!imagemLink) {

      return response.status(404).json({ mensagem: 'Imagem ou link não encontrado' });
    }
    response.json(imagemLink);

  } catch (error) {
    response.status(500).json({ mensagem: 'Erro ao buscar imagem ou link', erro: error.message });

  }
};

const remove = async (request, response) => {
  try {
    // Buscar a imagem pelo ID
    const imagemLink = await ImagemLink.findById(request.params.id);

    if (!imagemLink) {
      return response.status(404).json({ mensagem: 'Imagem ou link não encontrado' });
    }

    // Excluir o arquivo físico
    if (imagemLink.src && fs.existsSync(imagemLink.src)) {
      fs.unlinkSync(imagemLink.src);
    }

    // Excluir o documento da base de dados
    await ImagemLink.findByIdAndDelete(request.params.id);

    response.json({ mensagem: 'Imagem ou link removido com sucesso' });

  } catch (error) {
    response.status(500).json({ mensagem: 'Erro ao excluir imagem ou link', erro: error.message });
  }
};


export default {
    create,
    remove,
    findOne,
    findAll,
};
