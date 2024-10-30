import ImagemLink from '../modelos/imagem_link.js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const create = async (request, response) => {
  try {
    const { nome, url } = request.body;
    let filePath = '';

    if (url.startsWith('http')) {
      // Se for um link externo, faça o download da imagem e salve localmente
      const responseFetch = await fetch(url);
      const arrayBuffer = await responseFetch.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const parsedUrl = new URL(url);
      const fileName = `${Date.now()}_${path.basename(parsedUrl.pathname)}`;
      filePath = `uploads/${fileName}`;

      fs.writeFileSync(filePath, buffer);
    }

    const imagemLink = new ImagemLink({
      nome,
      caminhointerno: filePath,
      url,
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

    response.status(200).json(imagens);

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

    const imagemLink = await ImagemLink.findById(request.params.id);

    if (!imagemLink) {
      return response.status(404).json({ mensagem: 'Imagem ou link não encontrado' });
    }

    if (imagemLink.src && fs.existsSync(imagemLink.src)) {
      fs.unlinkSync(imagemLink.src);
    }

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
