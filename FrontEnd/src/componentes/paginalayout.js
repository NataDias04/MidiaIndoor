import React from 'react';
import '../estilos/paginalayout.css';

const PaginaLayout = () => {

    return(
        <div className="dashbord-layout">
            <div className="cabecalho-layout">cabeçalho</div>
            <div className='secao-layout'>
                <div className='layout1-layout'>
                    <div className='background-layout1-layout'>
                        <div className='linha-layout1-layout'>
                            <div className='borda1-layout1-layout'> </div>
                            <div className='borda2-layout1-layout'> </div>
                        </div>
                        <div className='linha-layout1-layout'>
                            <div className='borda3-layout1-layout'> </div>
                        </div>
                    </div>
                </div>
                <div className='layout2-layout'>
                    <div className='background-layout2-layout'>
                        <div className='linha-layout2-layout'>
                            <div className='borda1-layout2-layout'> </div>
                            <div className='borda2-layout2-layout'> </div>
                        </div>
                        <div className='linha-layout2-layout'>
                            <div className='borda3-layout2-layout'> </div>
                        </div>
                    </div>
                </div>
                <div className='layout3-layout'>
                    <div className='background-layout3-layout'>
                        <div className='linha-layout3-layout'>
                            <div className='borda1-layout3-layout'></div>
                            <div className='column-layout3-layout'>
                                <div className='borda2-layout3-layout'></div>
                                <div className='borda3-layout3-layout'></div>
                            </div>
                        </div>
                        <div className='linha-layout3-layout'>
                            <div className='row-layout3-layout'>
                                <div className='borda4-layout3-layout'></div>
                                <div className='borda5-layout3-layout'></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="rodape-layout">rodapé</div>
        </div>
    );

};

export default PaginaLayout;
