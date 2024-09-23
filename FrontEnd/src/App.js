import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaUpload from './componentes/paginaupload.js';
import PaginaLayout from './componentes/paginalayout.js';
import PaginaLogin from './componentes/paginalogin.js';
import PaginaPlaylist from './componentes/paginaplaylist.js';
import PaginaCentral from './componentes/paginacentral.js';

// <PaginaLayout />
// <PaginaUpload />
// <PaginaLogin/>
// <PaginaPlaylist/>
// <PaginaCentral/>

const App = () => {
  return (

      <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<PaginaLogin />} /> {/* Página inicial - login */}
          <Route path="/central" element={<PaginaCentral/>} /> {/* Página de central */}
          <Route path="/upload" element={<PaginaUpload />} /> {/* Página de upload */}
          <Route path="/layout" element={<PaginaLayout />} /> {/* Página de layout */}
          <Route path="/login" element={<PaginaLogin />} /> {/* Página de login */}
          <Route path="/playlist" element={<PaginaPlaylist />} /> {/* Página de playlist */}
        </Routes>

      </div>
      </Router>


  );
};

export default App;