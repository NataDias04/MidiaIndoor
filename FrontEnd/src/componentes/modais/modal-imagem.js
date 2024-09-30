import React, { useState } from 'react';
import '../../estilos/paginaupload.css';
import { salvarImagem, salvarImagemLink } from '../rotas/imagem'; // Certifique-se que essas funções estão corretas

const ModalImagem = ({ fecharModal }) => {
  const [isChecked, setIsChecked] = useState(false); // Estado da checkbox
  const [imagemFile, setImagemFile] = useState(null); // Inicializado como null
  const [imagemLink, setImagemLink] = useState(''); // Estado inicializado como string vazia
  const [nomeImagem, setNomeImagem] = useState(''); // Estado para o nome da imagem
  const [erro, setErro] = useState(''); // Estado para mostrar erros, se necessário

  // Função para lidar com a mudança de arquivo de imagem
  const handleFileChange = (e) => {
    setImagemFile(e.target.files[0]); // Atualiza o estado com o arquivo selecionado
    setErro(''); // Limpa o erro, caso tenha um
  };

  // Função para lidar com a mudança do link da imagem
  const handleLinkChange = (e) => {
    setImagemLink(String(e.target.value)); // Atualiza o estado com o link digitado
    setErro(''); // Limpa o erro, caso tenha um
  };

  // Função para lidar com a mudança do nome da imagem
  const handleNomeChange = (e) => {
    setNomeImagem(e.target.value); // Atualiza o estado com o nome digitado
    setErro(''); // Limpa o erro, caso tenha um
  };

  // Função para salvar dependendo do estado do checkbox
  // Função para salvar dependendo do estado do checkbox
const handleSave = async () => {
  setErro(''); // Limpa erros anteriores

  if (isChecked && imagemFile) {
    // Upload de arquivo de imagem
    const formData = new FormData();
    formData.append('imagem', imagemFile);

    try {
      const response = await salvarImagem({ name: nomeImagem }, formData);
      console.log('Imagem salva com sucesso:', response);
      setImagemFile(null);
      setNomeImagem('');
    } catch (error) {
      console.error('Erro ao salvar a imagem:', error);
      setErro('Erro ao salvar a imagem. Tente novamente.');
    }
  } else if (!isChecked && imagemLink) {
    // Salvar link da imagem
    try {
      const imagemLinkData = {
        name: nomeImagem,
        externalUrl: imagemLink
      };

      console.log('Dados a serem enviados:', imagemLinkData); // Para verificação

      const response = await salvarImagemLink(imagemLinkData); // Enviando o objeto corretamente
      console.log('Link salvo com sucesso:', response);
      setImagemLink('');
      setNomeImagem('');
    } catch (error) {
      console.error('Erro ao salvar o link da imagem:', error);
      setErro('Erro ao salvar o link da imagem. Tente novamente.');
    }
  } else {
    setErro('Selecione um arquivo de imagem ou insira um link válido.');
  }
};

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-imagem">
          <h2>Conteúdo do Modal Imagem</h2>

          <div className="linha-check-box">
            Link
            <input
              type="checkbox"
              id="checkboxInput"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            Arquivo
          </div>

          {/* Mostrar input baseado no estado do checkbox */}
          {isChecked ? (
            // Campo para upload de arquivo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          ) : (
            <>
              {/* Campo para digitar o nome da imagem */}
              <div>
                <label htmlFor="nomeImagem">Nome da Imagem:</label>
                <input
                  id="nomeImagem"
                  type="text"
                  placeholder="Insira o nome da imagem"
                  value={nomeImagem}
                  onChange={handleNomeChange}
                />
              </div>

              {/* Campo para inserir o link da imagem */}
              <div>
                <label htmlFor="imagemLink">Link da Imagem:</label>
                <input
                  id="imagemLink"
                  type="text"
                  placeholder="Insira o link da imagem"
                  value={imagemLink}
                  onChange={handleLinkChange}
                />
              </div>
            </>
          )}

          {/* Mostra o erro, se houver */}
          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-imagem" onClick={handleSave}>Salvar</button>
            <button className="botao-modal-imagem" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalImagem;
