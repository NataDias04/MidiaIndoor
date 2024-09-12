import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../estilos/paginaupload.css';
import {salvarTextoSimples , salvarHtml} from '../rotas/texto';

const ModalTexto = ({ fecharModal }) => {

  const [editorData, setEditorData] = useState('');
  const [isChecked, setIsChecked] = useState(false); // Estado da checkbox

  const handleSave = () => {
    const saveFunction = isChecked 
      ? salvarTextoSimples 
      : salvarHtml ;

    saveFunction(editorData)
      .then(response => {
        // Lidar com a resposta
        return response.json(); // Supondo que você está lidando com JSON
      })
      .then(data => {
        // Processar os dados da resposta
        console.log(data);
      })
      .catch(error => {
        // Lidar com erros
        console.error('Erro:', error);
      });
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
                
                <label for="checkboxInput" class="toggleSwitch">
                </label>

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
            }}
          />
          <div className="botao-container">
            <button className='botao-salvar-texto' onClick={handleSave}>Salvar</button>
            <button className='botao-modal-texto' onClick={fecharModal}>Fechar</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ModalTexto;
