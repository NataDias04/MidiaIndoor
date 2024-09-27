import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaUpload from './componentes/paginaupload.js';
import PaginaLayout from './componentes/paginalayout.js';
import PaginaLogin from './componentes/paginalogin.js';
import PaginaPlaylistLayout1 from './componentes/paginaplaylistlayout1.js';
import PaginaPlaylistLayout2 from './componentes/paginaplaylistlayout2.js';
import PaginaPlaylistLayout3 from './componentes/paginaplaylistlayout3.js';
import PaginaCentral from './componentes/paginacentral.js';
import PaginaVerPlaylist from './componentes/paginaverplaylist.js';

// <PaginaLayout />
// <PaginaUpload />
// <PaginaLogin/>
// <Paginaplaylistlayout1/>
// <Paginaplaylistlayout2/>
// <PaginaPlaylistLayout3/>
// <PaginaCentral/>
// <PaginaVerPlaylist/>

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
          <Route path="/playlistlayout1" element={<PaginaPlaylistLayout1 />} /> {/* Página de playlist */}
          <Route path="/playlistlayout2" element={<PaginaPlaylistLayout2 />} />
          <Route path="/playlistlayout3" element={<PaginaPlaylistLayout3 />} />
          <Route path="/verplaylist" element={<PaginaVerPlaylist/>} />
        </Routes>

      </div>
      </Router>
  );
};

export default App;