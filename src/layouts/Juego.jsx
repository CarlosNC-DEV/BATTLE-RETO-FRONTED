import React, { useContext, useEffect, useState } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';
import MesaJuego from '../components/MesaJuego';
import './layouts.css';

const Juego = () => {

    const { socket, jugadorActual } = useContext(jugadoresContexto);

    const [cartasJugador, setCartasJugador] = useState([]);
    const [cartaEnJuego, setCartaEnJuego] = useState(null);
    const [poderjugar, setPoderJugar] = useState('');
    const [restosTurno, setRestoTurno] = useState(false);
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

    const subirCartaMesa = () => {
        enviarCartaEnJuego();
    }

    const enviarCartaEnJuego = () => {
        socket.emit("cartas-en-juego", { cartaEnJuego: cartaEnJuego, jugador: jugadorActual });
    };


    console.log(restosTurno);


    return (
        <div>
            <div className='text-end'>
                <p className='jugador-juego'>Mucha Suerte</p>
            </div>
            {!iniciaJuego ? (
                <div>
                    <p className='jugador-juego bg-warning'>Espera tu turno...</p>
                </div>

            ) : (
                <div>
                    <p className='jugador-juego bg-success'>Tu inicias el juego, elije el poder con el que jugaras tu carta y subela a al mesa...</p>
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

            {!iniciaJuego ? (
                <div className='container m-3'>
                    <button className='btn btn-warning'>Espera tu turno</button>
                </div>
            ) : (
                <div className='container d-flex gap-2 m-3'>
                    <div>
                        <select defaultValue="" className="form-select" aria-label="Default select example" onChange={(e) => setPoderJugar(e.target.value)}>
                            <option value="">Selecciona el poder</option>
                            <option value="exp">Exp</option>
                            <option value="ataque">Ataque</option>
                            <option value="ataque-especial">Ataque especial</option>
                            <option value="defensa">Defensa</option>
                        </select>
                    </div>
                    {poderjugar === '' && iniciaJuego ? (
                        <p className='btn btn-warning'>Seleccione un poder para poder subir su carta a la mesa...</p>
                    ) : (
                        <div>
                            <button className='btn btn-primary' onClick={() => subirCartaMesa()}>Subir Carta a Mesa</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Juego;
