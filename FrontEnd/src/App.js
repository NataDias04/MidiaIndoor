import React from 'react';
import PaginaUpload from './componentes/paginaupload.js';
import PaginaLayout from './componentes/paginalayout.js';
import PaginaLogin from './componentes/paginalogin.js';
import PaginaPlaylist from './componentes/paginaplaylist.js'
import PaginaCadastro from './componentes/paginacadastro.js';

// <PaginaLogin/>
// <PaginaCadastro/>
// <PaginaUpload />
// <PaginaPlaylist/>
// <PaginaLayout />


const App = () => {
  return (
    <div className="App">
      <PaginaCadastro/> {/* Renderizando a página de upload */}
    </div>
  );
};

export default App;