import React from 'react';
import PaginaUpload from './componentes/paginaupload.js';
import PaginaLayout from './componentes/paginalayout.js';
import PaginaLogin from './componentes/paginalogin.js';

// <PaginaLayout />
// <PaginaUpload />

const App = () => {
  return (
    <div className="App">
      
        <PaginaLogin/>{/* Renderizando a página de upload */}
    </div>
  );
};

export default App;