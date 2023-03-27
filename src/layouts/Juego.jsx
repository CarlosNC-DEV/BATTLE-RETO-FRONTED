import React, { useContext } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';

const Juego = () => {

    const { jugadorActual } = useContext(jugadoresContexto);
    
    return (
        <div>
            <h1>Aqui se mirara el juego</h1>
            <p>soy el Jugador:{jugadorActual}</p>
        </div>
    );
}

export default Juego;
