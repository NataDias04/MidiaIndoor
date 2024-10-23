import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaLogin from './componentes/paginaloginplayer.js';
import PaginaCentral from './componentes/paginacentralplayer.js';
import PaginaPlaylist from './componentes/paginaplaylistsplayer.js';
import Player1 from './componentes/players/player1.js';
import Player2 from './componentes/players/player2.js';
import Player3 from './componentes/players/player3.js';
//import Paginacadastro from './componentes/paginacadastro.js'

const App = () => {
  return (
      <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/central" element={<PaginaCentral />} />
          <Route path="/playlist" element={<PaginaPlaylist />} />
          <Route path="/player1" element={<Player1 />} />
          <Route path="/player2" element={<Player2 />} />
          <Route path="/player3" element={<Player3 />} />
          
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