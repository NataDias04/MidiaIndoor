import React, { useState } from 'react';
import '../estilos/paginalogin.css';

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
    <div className="dashbord-login">

      <div className="formulario-login">

        <div className="logo-login">
          <h1>GNHD TV</h1>
        </div>
        

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="grupo-formulario-login">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grupo-formulario-login">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className={'button-entrar-login'}type="submit">Entrar</button>
        </form>

        <div className="opcoes-adicionais-login">
          <a href="#" className="esqueceu-senha-login">Esqueceu a senha?</a>
          <p>Não tem uma conta? <a href="#" className="registrar-login" onClick={irParaCadastro}>Registre-se</a></p>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
