import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartasContext  = createContext(); 

export const MainContextProvider = (props) => {

    const URL = "http://localhost:3000/pokemon";

    const [cartas, setCartas] = useState([]);

    const getCartas = async()=>{
        const respuesta = await axios.get(URL)
        setCartas(respuesta.data);
    }


    return (
        <CartasContext.Provider value={{getCartas, cartas}}>
            {props.children}
        </CartasContext.Provider>
    );
}
