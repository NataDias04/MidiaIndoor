import React from 'react';
import '../estilos/paginalayout.css';


const PaginaLayout = () => {

    return(
        <div className="dashbord">
        <div className="cabecalho">cabeçalho</div>
        <div className='secao'>
                <div className='layout1'>
                    <div className='background-layout1'>
                        <div className='linha-layout1'>
                            <div className='borda1-layout1'> </div>
                            <div className='borda2-layout1'> </div>
                        </div>
                        <div className='linha-layout1'>
                            <div className='borda3-layout1'> </div>
                        </div>
                    </div>
                </div>
                <div className='layout2'>
                    <div className='background-layout2'>
                        <div className='linha-layout2'>
                            <div className='borda1-layout2'></div>
                            <div className='borda2-layout2'></div>
                        </div>
                        <div className='linha-layout2'>
                            <div className='borda3-layout2'></div>
                        </div>
                    </div>
                </div>
                <div className='layout3'>
                <div className='background-layout3'>
                    <div className='linha-layout3'>
                            <div className='borda1-layout3'></div>
                            <div className='column-layout3'>
                                <div className='borda2-layout3'></div>
                                <div className='borda3-layout3'></div>
                            </div>
                        </div>
                        <div className='linha-layout3'>
                            <div className='row-layout3'>
                                <div className='borda4-layout3'></div>
                                <div className='borda5-layout3'></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="rodape">rodapé</div>
        </div>
    );

};

export default PaginaLayout;