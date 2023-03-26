import React, { createContext } from 'react';

export const jugadoresContexto = createContext()

export const JugadoresContextoProvider = (props) => {

    const x = 21;
    
    return (
        <jugadoresContexto.Provider value={{x}}>
            {props.children}
        </jugadoresContexto.Provider>
    );
} 
