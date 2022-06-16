import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

const contextFromLocalStorage = localStorage.getItem('ctx')
? JSON.parse(localStorage.getItem('ctx'))
: {}

export const AuthProvider = ({children}) => {


    const [auth, setAuth] = useState(contextFromLocalStorage);


    useEffect( () => {
        localStorage.setItem('ctx',JSON.stringify(auth))
    }, 
    [
        auth
    ]
    )  

    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
