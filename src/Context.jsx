import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAsyncError } from 'react-router-dom';

const contextObj = createContext();

const AppProvider = (prop) => {

    const[currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
        if(currency === "INR") setSymbol("₹")
        else if(currency === "USD") setSymbol("$")
    },[currency])

  return (
    <contextObj.Provider value={{currency, setCurrency, symbol}}>
        {prop.children}
    </contextObj.Provider>
  )
}


// Custom Hook
const useGlobalContext = () => {
    const obj = useContext(contextObj);
    return obj;
}

export  {AppProvider, useGlobalContext};