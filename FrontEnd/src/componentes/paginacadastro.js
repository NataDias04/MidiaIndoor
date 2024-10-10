import React, { useState } from 'react';
import '../estilos/paginacadastro.css';

import { useNavigate } from 'react-router-dom';

function PaginaCadastro() {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/login');
  };

  const validarCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarCPF(cpf)) {
      alert('CPF inválido! Use o formato XXX.XXX.XXX-XX');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Tentativa de cadastro com:', email, cpf, senha);
  };

  return (
    <div className="dashbord-cadastro">
      <div className="formulario-cadastro">
        <div className="logo-cadastro">
          <h1>GNHD TV</h1>
        </div>

        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="grupo-formulario-cadastro">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grupo-formulario-cadastro">
            <input
              type="text"
              id="cpf"
              placeholder="CPF (XXX.XXX.XXX-XX)"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="grupo-formulario-cadastro">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="grupo-formulario-cadastro">
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirmar Senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <button className="button-entrar-cadastro" type="submit">
            Cadastrar
          </button>
        </form>

        <div className="opcoes-adicionais-cadastro">
          <p>Já tem uma conta? <a href="#" className="login-cadastro" onClick={irParaLogin}>Faça login</a></p>

        </div>
      </div>
    </div>
  );
}

export default PaginaCadastro;
