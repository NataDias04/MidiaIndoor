import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../estilos/paginaupload.css';

const ModalTexto = ({ fecharModal }) => {
  const [editorData, setEditorData] = useState('');

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
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
          <div className="botao-container">
            <button className='botao-salvar-texto'>Salvar</button>
            <button className='botao-modal-texto' onClick={fecharModal}>Fechar</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ModalTexto;
