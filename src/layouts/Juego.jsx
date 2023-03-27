import React, { useContext, useEffect, useState } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';
import './layouts.css';

const Juego = () => {

    const { socket, jugadorActual } = useContext(jugadoresContexto);

    const [cartaJugador, setCartaJugador] = useState([]);

    useEffect(() => {
        socket.on("recibir-cartas", (jugadoresConCartas) => {
            const cartaJugadorActual = jugadoresConCartas[jugadorActual];
            console.log(cartaJugadorActual);
            setCartaJugador(cartaJugadorActual);
        });
    }, [jugadorActual]);

    let jugadorMuestreo = jugadorActual+1;

    return (
        <div>
            <div className='d-lfex text-end'>
                <p className='jugador-juego'>Eres el Jugador {jugadorMuestreo}</p>
            </div>
            <div className='d-flex'>
                <div className='container' style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridGap: "1rem" }}>
                    {cartaJugador.map((pokemons) => (
                        <div key={pokemons._id} className="card" style={{ "width": "100%", "maxWidth": "250px" }}>
                            <div className="card-header">{pokemons.idGame}</div>
                            <img src={pokemons.img} className="card-img-top card-img-top-small" alt={pokemons.img}></img>
                            <div className="card-body text-center">
                                <h5 className="card-title">{pokemons.nombre}</h5>
                                <p className="card-text">{pokemons.exp} exp</p>
                            </div>
                            <div className="card-footer d-flex justify-content-evenly">
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{pokemons.ataque}K</p>
                                    <p className='p-0 m-0'>Ataque</p>
                                </div>
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{pokemons.ataqueEspecial}K</p>
                                    <p className='p-0 m-0'>Ataque Especial</p>
                                </div>
                                <div className='text-center mx-2'>
                                    <p className='p-0 m-0'>{pokemons.defensa}K</p>
                                    <p className='p-0 m-0'>Defensa</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="container mesa-de-juego">
                    <div>
                        Mesa de juego
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Juego;
