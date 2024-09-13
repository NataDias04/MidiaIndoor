import React, { useState } from 'react';
import '../estilos/paginalogin.css';

function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de login com:', email, senha);
  };

  return (
    <div className="container">
      {/* Seção do Logo */}
      <div className="logo">
        <h1>GNHD TV</h1>
      </div>

      {/* Formulário de Login */}
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            />
          </div>

          {/* Campo de Senha */}
          <div className="form-group">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
            />
          </div>

          {/* Botão de Envio */}
          <button type="submit">Entrar</button>
        </form>

        {/* Opções adicionais */}
        <div className="additional-options">
          <a href="#" className="forgot-password">Esqueceu a senha?</a>
          <p>Não tem uma conta? <a href="#" className="register">Registre-se</a></p>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
