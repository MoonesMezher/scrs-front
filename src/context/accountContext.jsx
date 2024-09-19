import { createContext, useReducer } from "react";

export const accountContext = createContext();

const accountReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            localStorage.setItem('account', JSON.stringify(action.payload))
            return {
                account: action.payload
            };
        default: 
            return {
                account: null
            }
    }
}

export const AccountProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, {
        account: localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')): null,
    })

    return (
        <accountContext.Provider value={{...state, dispatch}}>
            {children}
        </accountContext.Provider>
    )
}
