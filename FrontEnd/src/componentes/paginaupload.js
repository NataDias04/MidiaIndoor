import React from 'react';
import '../estilos/paginaupload.css'

const PaginaUpload = () => {
    
  return (
    <div  className="dashbord">
        <div className="cabecalho">cabeçalho</div>
        <div className='secao'>
            <div className='imagem'>
            <button class="botao-imagem">arquivo</button>
            </div>
        </div>
        <div className='secao'>
             <div className='video'>
                <button class="botao-video">arquivo</button>
                </div>
        </div>
        <div className='secao'> 
        <div className='texto'>
        <button class="botao-texto">arquivo</button>
        </div>
        </div>
        <div className="rodape">rodapé</div>
    </div>
  );
};

export default PaginaUpload;
