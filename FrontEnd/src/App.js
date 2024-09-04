// src/App.js
/*import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import './App.css';

const PlaylistCard = ({ title, content, buttonText, onEdit }) => (
  <div className="playlist-card">
    <h2>{title}</h2>
    <div className="content">{content}</div>
    <button onClick={onEdit}>{buttonText}</button>
  </div>
);

const EditModal = ({ isOpen, onClose, onUpload, playlistTitle }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.log('Nenhum arquivo selecionado para upload.');
      return;
    }
    await onUpload(files);
    setFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar {playlistTitle}</h2>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={handleUpload}>Enviar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  const handleEdit = (playlistTitle) => {
    setEditingPlaylist(playlistTitle);
  };

  const handleCloseModal = () => {
    setEditingPlaylist(null);
  };

  const handleUpload = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/imagem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os arquivos:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <img src="/gnhd-tv-logo.png" alt="GNHD TV" className="logo" />
      </header>
      <main>
        <h1>Crie sua Playlist</h1>
        <p>Clique em "Selecionar" para escolher entre as opções disponíveis para criação ou edição.</p>
        <div className="playlist-grid">
          <PlaylistCard title="Playlist 1" content="#CONTEÚDO" buttonText="Editar" onEdit={() => handleEdit("Playlist 1")} />
          <PlaylistCard title="Playlist 2" content="#CONTEÚDO" buttonText="Editar" onEdit={() => handleEdit("Playlist 2")} />
          <PlaylistCard title="Playlist 3" content="#CONTEÚDO" buttonText="Selecionar" />
          <PlaylistCard title="Playlist 4" content="#CONTEÚDO" buttonText="Selecionar" />
        </div>
        <button className="voltar-button">Voltar</button>
        <ImageUpload /> 
      </main>
      <EditModal
        isOpen={!!editingPlaylist}
        onClose={handleCloseModal}
        onUpload={handleUpload}
        playlistTitle={editingPlaylist}
      />
    </div>
  );
};

export default App; */

// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import './App.css';

const PlaylistCard = ({ title, content, onEdit }) => (
  <div className="playlist-card">
    <h2>{title}</h2>
    <div className="content">{content}</div>
    <button onClick={() => onEdit(title)}>Editar</button>
  </div>
);

const App = () => {
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  const handleEdit = (playlistTitle) => {
    setEditingPlaylist(playlistTitle);
  };

  const handleCloseModal = () => {
    setEditingPlaylist(null);
  };

  const handleUpload = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/imagem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os arquivos:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <img src="/gnhd-tv-logo.png" alt="GNHD TV" className="logo" />
      </header>
      <main>
        <h1>Crie sua Playlist</h1>
        <p>Clique em "Selecionar" para escolher entre as opções disponíveis para criação ou edição.</p>
        <div className="playlist-grid">
          <PlaylistCard title="Playlist 1" content="#CONTEÚDO" onEdit={handleEdit} />
          <PlaylistCard title="Playlist 2" content="#CONTEÚDO" onEdit={handleEdit} />
          <PlaylistCard title="Playlist 3" content="#CONTEÚDO" />
          <PlaylistCard title="Playlist 4" content="#CONTEÚDO" />
        </div>
        <button className="voltar-button">Voltar</button>
        {editingPlaylist && (
          <ImageUpload 
            onClose={handleCloseModal}
            playlistTitle={editingPlaylist}
          />
        )}
      </main>
    </div>
  );
};

export default App;

