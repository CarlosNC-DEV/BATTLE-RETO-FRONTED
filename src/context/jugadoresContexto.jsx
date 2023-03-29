import React, { createContext, useState, useContext } from 'react';
import { CartasContext } from '../context/mainContext';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const jugadoresContexto = createContext()

export const JugadoresContextoProvider = (props) => {

    const { getCartas, cartas } = useContext(CartasContext);

    const codigo = localStorage.getItem("codigo_juego");

    const [jugadores, setJugadores] = useState([]);

    const [suficientesJugadores, setSuficientesJugadores] = useState(false);

    const [jugadorActual, setJugadorActual] = useState(null);
    const [jugadorCreador, setJugadorCreador] = useState(null);
    const [anfitrion, setAnfitrion] = useState(false);

    const [partidaIniciada, setPartidaIniciada] = useState(false);
    const [contador, setContador] = useState(5);

    const unirseJuegoContext = () => {
        socket.emit('unirse-a-juego', codigo);
    }

    const jugadoresActualizadosContex = () => {
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
    }

    const jugadorActualContext = () => {
        socket.on('unido-a-juego', ({ jugadores, posicion }) => {
            setJugadorActual(posicion);
            setJugadorCreador(jugadores[0]);
            setJugadores(jugadores.map((jugador, index) => `Jugador ${index + 1}`));

            // Comprobar si el jugador es el anfitrión
            if (posicion == 0) {
                setAnfitrion(true);
            }
        });
    }


    const iniciarPartidaAutoContext = ()=>{
        if (jugadores.length === 7 && !partidaIniciada) {
            setPartidaIniciada(true);
            let intervalo = setInterval(() => {
                setContador((contador) => contador - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalo);
                socket.emit('iniciar-partida');
                repartirCartas()
            }, 5000);
        }
    }

    const iniciarPartida = () => {
        if (suficientesJugadores && anfitrion) {
            socket.emit('iniciar-partida');
            repartirCartas()
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
            cartasJugador.push({ _id: carta._id , img: carta.img, nombre:carta.nombre, exp: carta.exp, ataque: carta.ataque, ataqueEspecial: carta.ataqueEspecial, resistencia: carta.resistencia, fuerza: carta.fuerza, defensa: carta.defensa, idGame: carta.idGame });
          }
      
          // Agregar el jugador con sus cartas al arreglo
          jugadoresConCartas.push(cartasJugador);
        }
      
        // Enviar el arreglo de jugadores con sus cartas al cliente
        socket.emit('repartir-cartas', jugadoresConCartas);
      };

    //=======================================================


    return (
        <jugadoresContexto.Provider value={{ socket, getCartas, unirseJuegoContext, jugadorActualContext, jugadoresActualizadosContex, iniciarPartidaAutoContext, iniciarPartida, codigo, jugadorActual, jugadorCreador, anfitrion, jugadores, partidaIniciada, suficientesJugadores, contador }}>
            {props.children}
        </jugadoresContexto.Provider>
    );
} 
