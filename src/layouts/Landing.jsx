import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ModalUnirme from '../components/ModalUnirme';

const socket = io('http://localhost:3000');

const Landing = () => {

    const navigate = useNavigate();

    const handleCrearJuego = () => {
        // emitir evento para crear juego
        socket.emit('crear-juego');

        // manejar evento de juego creado
        socket.on('juego-creado', (codigo) => {
            localStorage.setItem("codigo_juego", codigo);
            navigate(`/sala/${codigo}`);
            location.reload();
        });

        return () => {
            socket.off('juego-creado');
        };
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


                <div>
                    <ModalUnirme></ModalUnirme>
                </div>
        </>
    );
}

export default Landing;
