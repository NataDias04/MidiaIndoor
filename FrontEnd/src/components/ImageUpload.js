import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const response = await axios.post('http://localhost:5000/imagem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.msg || 'Imagem enviada com sucesso!');
    } catch (error) {
      setMessage('Erro ao enviar a imagem: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Upload de Imagem</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={onNameChange} />
        </div>
        <div>
          <label>Escolha uma imagem:</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;