import React from 'react';
import PaginaUpload from './componentes/paginaupload.js';
import PaginaLayout from './componentes/paginalayout.js';
import PaginaLogin from './componentes/paginalogin.js';
import PaginaPlaylist from './componentes/paginaplaylist.js'

// <PaginaLayout />
// <PaginaUpload />
// <PaginaLogin/>
// <PaginaPlaylist/>

const App = () => {
  return (
    <div className="App">
      
      <PaginaPlaylist/> {/* Renderizando a página de upload */}
    </div>
  );
};

export default App;