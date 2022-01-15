import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState();
    const toggleAuth = () =>{
        setIsAuth((prev)=>!prev)
    }
    const setData = (res)=>{
        setUserData(res)
    }
    const value = {isAuth, setData, userData, toggleAuth}
    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}
