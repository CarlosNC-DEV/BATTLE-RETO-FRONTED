import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jugadoresContexto } from '../context/jugadoresContexto';
import './layouts.css';

const Sala = () => {

    const navigate = useNavigate();

    const { socket, getCartas, unirseJuegoContext, jugadorActualContext, jugadoresActualizadosContex, iniciarPartidaAutoContext, iniciarPartida, codigo, jugadorActual, jugadorCreador, anfitrion, jugadores, suficientesJugadores, partidaIniciada, contador } = useContext(jugadoresContexto);

    useEffect(() => {

        getCartas()

        unirseJuegoContext();

        // manejar evento de jugadores actualizados
        jugadoresActualizadosContex();

        jugadorActualContext();

        socket.on('partida-iniciada', () => {
            console.log('La partida ha sido iniciada.');
            navigate(`juego/${codigo}`)
        });

    }, [codigo]);

    useEffect(() => {
        iniciarPartidaAutoContext();
    }, [jugadores.length, partidaIniciada]);
      

    return (
        <div>
            <h2>Código del juego: {codigo}</h2>
            <p>¡Invita a tus amigos a unirse al juego usando este código!</p>
            <div className="jugadores-grid">
                {jugadores.map((jugador, index) => (
                    <div key={index} className={`jugador ${index === jugadorActual ? "jugador-actual" : (index === jugadorCreador ? "jugador-creador" : "")}`}>{jugador}</div>
                ))}
            </div>

            {partidaIniciada ? (
                <div>Iniciando partida en {contador}...</div>
            ) : (
                <div>
                    <button onClick={iniciarPartida} disabled={!suficientesJugadores || !anfitrion}>
                        Iniciar Partida
                    </button>
                </div>
            )}

        </div>
    );
}

export default Sala;
