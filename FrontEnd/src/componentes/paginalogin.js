import React, { useState } from 'react';
import '../estilos/paginalogin.css';

function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de login com:', email, senha);
  };

  return (
    <div className="dashbord">

      <div className="logo">
        <h1>GNHD TV</h1>
      </div>

      <div className="formulario-login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="grupo-formulario">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grupo-formulario">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="opcoes-adicionais">
          <a href="#" className="esqueceu-senha">Esqueceu a senha?</a>
          <p>Não tem uma conta? <a href="#" className="registrar">Registre-se</a></p>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
