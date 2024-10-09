import React from 'react';
import '../../estilos/paginaupload.css';
import { salvarImagem, salvarImagemLink } from '../rotas/imagem';

const ModalImagem = ({ fecharModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemLink, setImagemLink] = useState('');
  const [imagemName, setImagemName] = useState('');
  const [erro, setErro] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImagemFile(selectedFile);
      console.log('Arquivo de imagem selecionado:', selectedFile);
      setImagemName(selectedFile.name);
    }
    setErro('');
  };

  const handleLinkChange = (e) => {
    setImagemLink(e.target.value);
    setErro('');
  };

  const handleNameChange = (e) => {
    setImagemName(e.target.value);
    setErro('');
  };

  const handleSave = async () => {
    try {
      const saveFunction = isChecked
        ? () => salvarImagem(imagemFile, imagemFile.name)
        : () => salvarImagemLink(imagemName, imagemLink);

      const response = await saveFunction();
      console.log('Salvo com sucesso:', response);
      setErro(''); // Limpa a mensagem de erro após salvar com sucesso
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErro('Erro ao salvar. Tente novamente.');
    }
  };

  const onSaveAndClose = async () => {
    await handleSave(); // Espera `handleSave` terminar
    fecharModal(); // Depois, fecha o modal
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
              name="imagem"
              onChange={handleFileChange}
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Insira o nome da imagem"
                value={imagemName}
                onChange={handleNameChange}
              />

              <input
                type="text"
                placeholder="Insira o link da imagem"
                value={imagemLink}
                onChange={handleLinkChange}
              />
            </>
          )}

          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-imagem" onClick={onSaveAndClose}>Salvar</button>
            <button className="botao-modal-imagem" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalImagem;
