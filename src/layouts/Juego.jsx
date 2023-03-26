import React, { useContext } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';

const Juego = () => {

    const { x } = useContext(jugadoresContexto);

    console.log(x);
    
    return (
        <div>
            <h1>Aqui se mirara el juego</h1>
        </div>
    );
}

export default Juego;
