import React, { useState } from 'react';
import '../estilos/paginaloginplayer.css';

import { useNavigate } from 'react-router-dom';

function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de login com:', email, senha);
  };

  const navigate = useNavigate();

  const irParaCentral = () => {
    navigate('/central');
};

const irParaCadastro = () => {
  navigate('/cadastro');
};

  return (
    <div className="player-dashbord-login">

      <div className="player-formulario-login">

        <div className="player-logo-login">
          <h1>GNHD TV</h1>
        </div>
        

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="player-grupo-formulario-login">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="player-grupo-formulario-login">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className={'player-button-entrar-login'}type="submit" onClick={irParaCentral}>Entrar</button>
        </form>

        <div className="player-opcoes-adicionais-login">
          <button
            className="player-esqueceu-senha-login"
            onClick={() => alert('Funcionalidade não implementada')}
          >
            Esqueceu a senha?
          </button>
          <p>
            Não tem uma conta?{' '}
            <button
              className="player-registrar-login"
              onClick={irParaCadastro}
            >
              Registre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;

