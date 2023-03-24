import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ModalUnirme = () => {

    const navigate = useNavigate()

    const [codigo, setCodigo] = useState('');

    function unirseAJuego() {
        
        socket.emit('unirse-a-juego', codigo);

        // manejar evento de unido a juego
        socket.on('unido-a-juego', () => {
            navigate(`/sala/${codigo}`);
            location.reload();
        });

        // manejar evento de código inválido
        socket.on('codigo-invalido', () => {
            alert('Código inválido');
        });
        
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ingresa el codigo del juego</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Ingresa el codigo del juego"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}></input>
                                <span className="input-group-text" id="basic-addon2">Bienvenido</span>
                            </div>

                            <button type="button" className="btn btn-primary d-flex w-50 mx-auto justify-content-center" onClick={() => unirseAJuego()}>Unirme a juego</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalUnirme;
