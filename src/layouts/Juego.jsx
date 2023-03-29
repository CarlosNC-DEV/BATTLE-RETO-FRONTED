import React, { useContext, useEffect, useState } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';
import MesaJuego from '../components/MesaJuego';
import './layouts.css';

const Juego = () => {

    const { socket, jugadorActual } = useContext(jugadoresContexto);

    const [cartasJugador, setCartasJugador] = useState([]);
    const [cartaEnJuego, setCartaEnJuego] = useState(null);
    const [indiceCartaActual, setIndiceCartaActual] = useState(0);

    const [iniciaJuego, setIniciaJuego] = useState(false);

    useEffect(() => {
        socket.on("recibir-cartas", (jugadoresConCartas) => {
            console.log(jugadoresConCartas);
            const cartaJugadorActual = jugadoresConCartas[jugadorActual];
            setCartasJugador(cartaJugadorActual);
            mostrarPrimeraCarta(cartaJugadorActual);
        });

    }, [socket, jugadorActual]);

    useEffect(() => {
        if (cartasJugador.some(carta => carta.idGame === "1A")) {
            setIniciaJuego(true);
        }
    }, [cartasJugador]);

    const mostrarPrimeraCarta = (cartas) => {
        const cartaActual = cartas[indiceCartaActual];
        setCartaEnJuego(cartaActual);
    };

    const mostrarSiguienteCarta = () => {
        const siguienteIndice = indiceCartaActual + 1;
        if (siguienteIndice < cartasJugador.length) {
            const cartaActual = cartasJugador[siguienteIndice];
            setCartaEnJuego(cartaActual);
            setIndiceCartaActual(siguienteIndice);
        } else {
            setIndiceCartaActual(0);
            const cartaActual = cartasJugador[0];
            setCartaEnJuego(cartaActual);
        }
    };

    const subirCartaMesa = ()=>{
        enviarCartaEnJuego();
    }

    const enviarCartaEnJuego = () => {
        socket.emit("cartas-en-juego", { cartaEnJuego: cartaEnJuego, jugador: jugadorActual });
    };

    return (
        <div>
            <div className='text-end'>
                <p className='jugador-juego'>Mucha Suerte</p>
            </div>
            {!iniciaJuego ? (
                <div>
                    <p className='jugador-juego bg-warning'>Esperando a que el jugador con la carta "1A" elija el poder a jugar...</p>
                </div>
            ) : (
                <div>
                    <p className='jugador-juego bg-success'>Tu inicias el juego...</p>
                </div>
            )}

            <p className='ms-3 fs-4'>Tu carta a jugar en esta ronda es:</p>
            <div className='d-flex'>
                <div className='d-flex justify-content-center w-25'>
                    {cartaEnJuego && (
                        <div key={cartaEnJuego._id} className="card" style={{ "width": "100%", "maxWidth": "250px" }}>
                            <div className="card-header">{cartaEnJuego.idGame}</div>
                            <img src={cartaEnJuego.img} className="card-img-top card-img-top-small" alt={cartaEnJuego.img}></img>
                            <div className="card-body text-center">
                                <h5 className="card-title">{cartaEnJuego.nombre}</h5>
                                <p className="card-text">{cartaEnJuego.exp} exp</p>
                            </div>
                            <div className="card-footer d-flex justify-content-evenly">
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{cartaEnJuego.ataque}K</p>
                                    <p className='p-0 m-0'>Ataque</p>
                                </div>
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{cartaEnJuego.ataqueEspecial}K</p>
                                    <p className='p-0 m-0'>Ataque Especial</p>
                                </div>
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{cartaEnJuego.defensa}K</p>
                                    <p className='p-0 m-0'>Defensa</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                    
                    <MesaJuego></MesaJuego>

            </div>

            <div className='container m-5'>
                <button className='btn btn-primary' onClick={() => subirCartaMesa()}>Subir Carta a Mesa</button>
            </div>
        </div>
    );
}

export default Juego;
