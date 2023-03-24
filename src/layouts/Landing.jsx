import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Cartas from '../components/Cartas';
import ModalUnirme from '../components/ModalUnirme';

const Landing = () => {

    const navigate = useNavigate();

    const handleCrearJuego = () => {
        const socket = io('http://localhost:3000');
        // emitir evento para crear juego
        socket.emit('crear-juego');

        // manejar evento de juego creado
        socket.on('juego-creado', (codigo) => {
            localStorage.setItem("codigo_juego", codigo);
            navigate(`/sala/${codigo}`);
            location.reload();
        });
    };


    return (
        <>
            <div className='m-3 d-flex gap-2'>
                <div>
                    <button className='btn btn-primary' onClick={handleCrearJuego}>Crear Juego</button>
                </div>

                <div>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Unirte a Sala</button>
                </div>
            </div>

            <div className='container'>
                <Cartas></Cartas>
            </div>
            
            <div>
                <ModalUnirme></ModalUnirme>
            </div>
        </>
    );
}

export default Landing;
