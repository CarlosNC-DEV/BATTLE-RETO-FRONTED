import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './layouts.css';


const Sala = () => {

    const codigo = localStorage.getItem("codigo_juego");

    const [jugadores, setJugadores] = useState([]);
    const [jugadorActual, setJugadorActual] = useState(null);
    const [jugadorCreador, setJugadorCreador] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('Conectado al servidor.');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor.');
            location.reload();
        });
        // Unirse al juego utilizando el código del juego
        socket.emit('unirse-a-juego', codigo);

        // manejar evento de jugadores actualizados

        // manejar evento de jugadores actualizados
        socket.on('jugadores-actualizados', (cantidad) => {
            const nuevosJugadores = [];
            for (let i = 1; i <= cantidad; i++) {
                nuevosJugadores.push(`Jugador ${i}`);
            }
            setJugadores(nuevosJugadores);
        });

        socket.on('unido-a-juego', ({ jugadores, posicion }) => {
            setJugadorActual(posicion);
            setJugadorCreador(jugadores[0]);
            setJugadores(jugadores.map((jugador, index) => `Jugador ${index + 1}`));
        });

        // Limpiar eventos al desmontar componente
        return () => {
            socket.off('unirse-a-juego');
            socket.off('jugadores-actualizados');
            socket.off('unido-a-juego');
        };
    }, [codigo])


    return (
        <div>
            <h2>Código del juego: {codigo}</h2>
            <p>¡Invita a tus amigos a unirse al juego usando este código!</p>
            <p>Jugadores:</p>
            <div className="jugadores-grid">
                {jugadores.map((jugador, index) => (
                    <div key={index} className={`jugador ${index === jugadorActual ? "jugador-actual" : (index === jugadorCreador ? "jugador-creador" : "")}`}>{jugador}</div>
                ))}
            </div>

        </div>
    );
}

export default Sala;
