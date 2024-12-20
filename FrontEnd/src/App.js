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
import PaginaDispositivo from './componentes/paginadispositivo.js';
import Paginacadastro from './componentes/paginacadastro.js';
import PaginaEditarPlaylist from './componentes/paginaeditarplaylist.js';

// <PaginaLayout />
// <PaginaUpload />
// <PaginaLogin/>
// <Paginaplaylistlayout1/>
// <Paginaplaylistlayout2/>
// <PaginaPlaylistLayout3/>
// <PaginaCentral/>
// <PaginaVerPlaylist/>
//<Paginacadastro/>

const App = () => {
  return (
      <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/central" element={<PaginaCentral/>} />
          <Route path="/upload" element={<PaginaUpload />} />
          <Route path="/dispositivo" element={<PaginaDispositivo/>} />
          <Route path="/layout" element={<PaginaLayout />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<Paginacadastro/>}/>
          <Route path="/playlistlayout1" element={<PaginaPlaylistLayout1 />} />
          <Route path="/playlistlayout2" element={<PaginaPlaylistLayout2 />} />
          <Route path="/playlistlayout3" element={<PaginaPlaylistLayout3 />} />
          <Route path="/verplaylist" element={<PaginaVerPlaylist/>} />
          <Route path="/editarplaylist" element={<PaginaEditarPlaylist/>}/>
        </Routes>

      </div>
      </Router>
  );
};

export default App;