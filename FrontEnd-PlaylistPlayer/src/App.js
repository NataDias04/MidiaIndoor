import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaLogin from './componentes/paginaloginplayer.js';
import PaginaCentral from './componentes/paginacentralplayer.js';
import PaginaPlaylist from './componentes/paginaplaylistsplayer.js';
//import Paginacadastro from './componentes/paginacadastro.js'

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
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/central" element={<PaginaCentral />} />
          <Route path="/playlist" element={<PaginaPlaylist />} />
          
          
          {/*<Route path="/cadastro" element={<Paginacadastro/>}/>
          <Route path="/central" element={<PaginaCentral/>} />
          <Route path="/dispositivo" element={<PaginaDispositivo/>} />
          <Route path="/verplaylist" element={<PaginaVerPlaylist/>} />*/}
        </Routes>

      </div>
      </Router>
  );
};

export default App;