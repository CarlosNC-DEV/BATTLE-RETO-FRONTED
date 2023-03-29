import React, { useEffect, useState, useContext } from 'react';
import { jugadoresContexto } from '../context/jugadoresContexto';
import './components.css'

const MesaJuego = () => {

    const { socket, jugadores } = useContext(jugadoresContexto);

    const [cartasMesa, setCartasMesa] = useState([]);

    useEffect(() => {
        socket.on("cartas-en-mesa", ({ cartasEnJuego, jugadoresEnJuego }) => {
            console.log(cartasEnJuego);
            console.log(jugadoresEnJuego);
            setCartasMesa(cartasEnJuego);
        });
        return () => {
            socket.off('cartas-en-mesa');
        };
    }, [socket]);

    if(jugadores.length === cartasMesa.length){
        console.log("Comprarando cartas y aqui se dara el ganador");
    }

    return (
        <>
            <div className="container mesa-de-juego w-75 mx-3">
                <p className="text-white fs-2 fw-bold text-center">Mesa de juego</p>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {cartasMesa.length === 0 ? (
                        <div className="text-white fs-2 fw-bold text-center">
                            <p>No hay cartas en la mesa</p>
                        </div>
                    ) : (
                        cartasMesa.map((pokemons) => {
                            return (
                                <div key={pokemons._id} className="card fs-5" style={{ width: "250px" }}>
                                    <div className="card-header">{pokemons.idGame}</div>
                                    <img
                                        src={pokemons.img}
                                        className="card-img-top card-img-top-small"
                                        alt={pokemons.img}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{pokemons.nombre}</h5>
                                        <p className="card-text">{pokemons.exp} exp</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-evenly">
                                        <div className="text-center mx-2">
                                            <p className="p-0 m-0">{pokemons.ataque}K</p>
                                            <p className="p-0 m-0">Ataque</p>
                                        </div>
                                        <div className="text-center mx-2">
                                            <p className="p-0 m-0">{pokemons.ataqueEspecial}K</p>
                                            <p className="p-0 m-0">Ataque Especial</p>
                                        </div>
                                        <div className="text-center mx-2">
                                            <p className="p-0 m-0">{pokemons.defensa}K</p>
                                            <p className="p-0 m-0">Defensa</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default MesaJuego;
