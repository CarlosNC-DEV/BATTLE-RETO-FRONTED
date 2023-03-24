import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Sala = () => {

    const codigo = localStorage.getItem("codigo_juego");

    const [jugadores, setJugadores] = useState([]);

    useEffect(()=>{
        // Unirse al juego utilizando el código del juego
        socket.emit('unirse-a-juego', codigo);

        // manejar evento de jugadores actualizados
        socket.on('jugadores-actualizados', (cantidad) => {
            const nuevosJugadores = [];
            for (let i = 1; i <= cantidad; i++) {
                nuevosJugadores.push(`Jugador ${i}`);
            }
            setJugadores(nuevosJugadores);
        });

        // Limpiar eventos al desmontar componente
        return () => {
            socket.off('jugadores-actualizados');
        };
    },[codigo])


    return (
        <div>
            <h2>Código del juego: {codigo}</h2>
            <p>¡Invita a tus amigos a unirse al juego usando este código!</p>
            <p>Jugadores:</p>
                <ul>
                    {jugadores.map((jugador, index) => (
                        <li key={index}>{jugador}</li>
                    ))}
                </ul>
        </div>
    );
}

export default Sala;
