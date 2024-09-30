import React, { useState } from 'react';
import '../../estilos/paginaupload.css';
import { salvarImagem, salvarImagemLink } from '../rotas/imagem'; // Certifique-se que essas funções estão corretas

const ModalImagem = ({ fecharModal }) => {
  const [isChecked, setIsChecked] = useState(false); // Estado da checkbox
  const [imagemFile, setImagemFile] = useState(null); // Estado para o arquivo de imagem
  const [imagemLink, setImagemLink] = useState(''); // Estado para o link da imagem
  const [nomeImagem, setNomeImagem] = useState(''); // Estado para o nome da imagem
  const [erro, setErro] = useState(''); // Estado para erros

  // Função para lidar com a mudança de arquivo de imagem
  const handleFileChange = (e) => {
    setImagemFile(e.target.files[0]);
    setErro('');
  };

  // Função para lidar com a mudança do link da imagem
  const handleLinkChange = (e) => {
    setImagemLink(e.target.value);
    setErro('');
  };

  // Função para lidar com a mudança do nome da imagem
  const handleNomeChange = (e) => {
    setNomeImagem(e.target.value);
    setErro('');
  };

  // Função para salvar dependendo do estado do checkbox
  const handleSave = async () => {
    setErro('');

    try {
      if (isChecked && imagemFile) {
        const formData = new FormData();
        formData.append('file', imagemFile); // O arquivo a ser enviado

        const response = await salvarImagem({ name: nomeImagem }, imagemFile); // Função para salvar a imagem
        console.log('Imagem salva com sucesso:', response);
        setImagemFile(null);
        setNomeImagem('');
      } else if (!isChecked && imagemLink) {
        const response = await salvarImagemLink({ name: nomeImagem, externalUrl: imagemLink });
        console.log('Link da imagem salvo com sucesso:', response);
        setImagemLink('');
        setNomeImagem('');
      } else {
        setErro('Por favor, selecione um arquivo ou insira um link.');
      }
    } catch (error) {
      console.error('Erro ao salvar a imagem:', error);
      setErro('Erro ao salvar a imagem. Tente novamente.');
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

          {isChecked ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          ) : (
            <>
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
