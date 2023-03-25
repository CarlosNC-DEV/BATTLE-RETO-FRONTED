import React, { useState, useEffect, useContext } from 'react';
import { CartasContext } from '../context/mainContext';

const Cartas = () => {

    const { getCartas, cartas } = useContext(CartasContext);

    useEffect(() => {
        getCartas();
    }, []);


    return (
        <>
            {cartas.map((pokemons) => (
                <div key={pokemons._id} className="card" style={{ "width": "18rem" }}>
                    <div className="card-header">{pokemons.idGame}</div>
                    <img src={pokemons.img} className="card-img-top" alt={pokemons.img}></img>
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
        </>
    );
}

export default Cartas;
