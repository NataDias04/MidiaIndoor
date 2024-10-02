import React, { useState } from 'react';
import '../../estilos/paginaupload.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { salvarTextoSimples, salvarHtml } from '../rotas/texto';

const ModalTexto = ({ fecharModal }) => {
  const [editorData, setEditorData] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSave = () => {

    // Função para descodificar entidades HTML
    
    const descodificado = (text) => {
      return text.replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
    };

     // Função para extrair o conteúdo da tag <title> usando expressão regular
     const extrairTituloDoHtml = (htmlString) => {
      const match = htmlString.match(/<title>(.*?)<\/title>/i);
      return match ? match[1] : 'Sem título'; // Retorna 'Sem título' se não encontrar a tag <title>
    };

    const htmldescodificado = descodificado(editorData)

    // Extraindo o título do HTML do CKEditor
    const titulo = extrairTituloDoHtml(htmldescodificado);

    console.log('editorData:', editorData);

    console.log('Título extraído:', titulo);

    if (!titulo || titulo.trim() === '') {
      console.error('Título não definido ou vazio');
      return;
    }

    const saveFunction = isChecked 
      ? () => salvarTextoSimples(editorData)
      : () => salvarHtml(editorData, titulo);

    saveFunction() 
      .then(response => {
        console.log('Salvo com sucesso:', response);
      })
      .catch(error => {
        console.error('Erro ao salvar:', error);
      });
  };

  const onSaveAndClose = async () => {
    await handleSave();  // Espera `handleSave` terminar
    fecharModal();  // Depois, fecha o modal
  };

  const editorConfiguration = {
    toolbar: {
      items: [
        'heading', '|',
        'bold', 'italic', 'link', '|',
        'bulletedList', 'numberedList', '|',
        'blockQuote', 'codeBlock', '|',
        'undo', 'redo'
      ],
    },
    language: 'pt',
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-especial">
        <div className="modal-texto">
          <h2>Conteúdo do Modal Texto</h2>

          <div>
            <label>
              <div className='linha-check-box'>
                Html
                <input 
                  type="checkbox" 
                  id="checkboxInput"
                  checked={isChecked} 
                  onChange={(e) => setIsChecked(e.target.checked)} 
                />
                <label htmlFor="checkboxInput" className="toggleSwitch"></label>
                Texto
              </div>
            </label>
          </div>

          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
              console.log('Editor Data atualizado:', data);
            }}
          />

          <div className="botao-container">
            <button className='botao-salvar-texto' onClick={onSaveAndClose}>Salvar</button>
            <button className='botao-modal-texto' onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTexto;
