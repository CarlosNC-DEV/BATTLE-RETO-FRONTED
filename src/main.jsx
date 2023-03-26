import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MainContextProvider } from './context/mainContext';
import { JugadoresContextoProvider } from './context/jugadoresContexto';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


ReactDOM.createRoot(document.getElementById('root')).render(
    <MainContextProvider>
        <JugadoresContextoProvider>
            <App />
        </JugadoresContextoProvider>
    </MainContextProvider>
)
