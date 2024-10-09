import React, { useState, useEffect } from 'react';
import '../../estilos/paginadispositivo.css';
import { atualizarDispositivo } from '../rotas/dispositivo.js'; // Função para atualizar o dispositivo

const ModalEditarDispositivo = ({ fecharModal, dispositivo }) => {
  const [nome, setNome] = useState('');
  const [resolucao, setResolucao] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (dispositivo) {
      setNome(dispositivo.nome);
      setResolucao(dispositivo.resolucao);
    }
  }, [dispositivo]);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    setErro('');
  };

  const handleResolucaoChange = (e) => {
    setResolucao(e.target.value);
    setErro('');
  };

  const handleSave = async () => {
    try {
      if (!resolucao) {
        console.error('Erro: A resolução não pode estar vazia.');
        setErro('A resolução não pode estar vazia.');
        return;
      }

      console.log('Dados a serem enviados:', { nome, resolucao });

      const response = await atualizarDispositivo(dispositivo._id, nome, resolucao ); // Passando o ID e os dados do dispositivo
      console.log('Dispositivo atualizado com sucesso:', response);
      setErro('');
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error);
      setErro('Erro ao atualizar dispositivo. Tente novamente.');
    }
  };

  const onSaveAndClose = async () => {
    await handleSave();
    fecharModal();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-dispositivo">
          <h2>Editar Dispositivo</h2>

          <div className="input-group">
            <label htmlFor="nome">Nome do Dispositivo</label>
            <input
              type="text"
              id="nome"
              placeholder="Insira o nome do dispositivo"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="resolucao">Resolução</label>
            <select
              id="resolucao"
              value={resolucao}
              onChange={handleResolucaoChange}
            >
              <option value="">Selecione uma resolução</option>
              <option value="1920x1080">1920x1080 (Full HD)</option>
              <option value="1280x720">1280x720 (HD)</option>
              <option value="3840x2160">3840x2160 (4K UHD)</option>
              <option value="2560x1440">2560x1440 (QHD)</option>
              <option value="1366x768">1366x768 (HD Ready)</option>
              {/* Adicionar mais opções conforme necessário */}
            </select>
          </div>

          {erro && <p className="erro-mensagem">{erro}</p>}

          <div className="botao-container">
            <button className="botao-salvar-dispositivo" onClick={onSaveAndClose}>Salvar</button>
            <button className="botao-modal-dispositivo" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditarDispositivo;