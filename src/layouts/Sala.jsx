import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartasContext } from '../context/mainContext';
import io from 'socket.io-client';
import './layouts.css';


const socket = io('http://localhost:3000');

const Sala = () => {

    const navigate = useNavigate()

    const { getCartas, cartas } = useContext(CartasContext);

    const [jugadores, setJugadores] = useState([]);
    const [jugadorActual, setJugadorActual] = useState(null);
    const [jugadorCreador, setJugadorCreador] = useState(null);

    const [anfitrion, setAnfitrion] = useState(false);
    const [suficientesJugadores, setSuficientesJugadores] = useState(false);
    const [partidaIniciada, setPartidaIniciada] = useState(false);

    const [contador, setContador] = useState(5);

    const codigo = localStorage.getItem("codigo_juego");


    useEffect(() => {

        getCartas()

        socket.on('connect', () => {
            console.log('Conectado al servidor.');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor.');
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

            // Comprobar si hay suficientes jugadores
            if (cantidad >= 2) {
                setSuficientesJugadores(true);
            } else {
                setSuficientesJugadores(false);
            }

        });


        socket.on('unido-a-juego', ({ jugadores, posicion }) => {
            setJugadorActual(posicion);
            setJugadorCreador(jugadores[0]);
            setJugadores(jugadores.map((jugador, index) => `Jugador ${index + 1}`));

            // Comprobar si el jugador es el anfitrión
            if (posicion == 0) {
                setAnfitrion(true);
            }
        });

        socket.on('partida-iniciada', () => {
            console.log('La partida ha sido iniciada.');
            navigate(`juego/${codigo}`);
        });

        // Limpiar eventos al desmontar componente
        return () => {
            socket.off('unirse-a-juego');
            socket.off('jugadores-actualizados');
            socket.off('unido-a-juego');
            socket.off('partida-iniciada');
        };
    }, [codigo]);

    useEffect(() => {
        if (jugadores.length === 7 && !partidaIniciada) {
            setPartidaIniciada(true);
            let intervalo = setInterval(() => {
                setContador((contador) => contador - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalo);
                socket.emit('iniciar-partida');
            }, 5000);
        }
    }, [jugadores.length, partidaIniciada]);


    const iniciarPartida = () => {
        if (suficientesJugadores && anfitrion) {
            socket.emit('iniciar-partida');
        }
    };

    const repartirCartas = () => {
        const numJugadores = jugadores.length;
        const numCartas = cartas.length;
        const cartasPorJugador = Math.floor(numCartas / numJugadores);
        const jugadoresConCartas = [];
      
        // Repartir las cartas de forma equitativa entre los jugadores
        for (let i = 0; i < numJugadores; i++) {
          const jugador = `jugador${i + 1}`;
          const cartasJugador = [];
      
          for (let j = 0; j < cartasPorJugador; j++) {
            const carta = cartas[i * cartasPorJugador + j];
            cartasJugador.push({ id: carta._id ,url: carta.img, codigoGame:carta.idGame });
          }
      
          // Agregar el jugador con sus cartas al arreglo
          jugadoresConCartas.push({ [jugador]: cartasJugador });
        }
      
        // Enviar el arreglo de jugadores con sus cartas al cliente
        socket.emit('repartir-cartas', jugadoresConCartas);
      };
      

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
