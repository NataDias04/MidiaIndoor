import React, { useState } from 'react';
import '../estilos/paginalayout.css';


const PaginaLayout = () => {

    return(
        <div className="dashbord">
        <div className="cabecalho">cabeçalho</div>
        <div className='secao'>
            <div className='linha'>
                <div className='layout layout1'>Layout 1</div>
                <div className='layout layout2'>Layout 2</div>
            </div>
            <div className='linha'>
                <div className='layout layout3'>Layout 3</div>
                <div className='layout layout4'>Layout 4</div>
            </div>
        </div>
        <div className="rodape">rodapé</div>
        </div>
    );

};

export default PaginaLayout;