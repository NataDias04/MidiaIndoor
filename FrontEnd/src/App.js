import ImageUpload from './components/ImageUpload';

import React, { useState } from 'react';
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

  const handleUpload = () => {
    onUpload(files);
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

  const handleUpload = (files) => {
    console.log(`Arquivos enviados para ${editingPlaylist}:`, files);
      return (
      <div className="App">
        <h1>Meu Aplicativo</h1>
        <ImageUpload />
      </div>
    );
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

export default App;