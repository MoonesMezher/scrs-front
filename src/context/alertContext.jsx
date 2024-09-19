import { createContext, useReducer } from "react";

export const alertContext = createContext([]);

const alertReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            // localStorage.setItem("ns", JSON.stringify([...state.show.filter(e => e != action.payload), action.payload]))
            return {
                show: [...state.show.filter(e => e != action.payload), action.payload]
            }
        case 'REMOVE': 
            // localStorage.setItem("ns", JSON.stringify(state.show.filter(e => e != action.payload)))
            return {
                show: state.show.filter(e => e != action.payload)
            }
        default: 
            // localStorage.setItem("ns", JSON.stringify([]))
            return {
                show: []
            }
    }
}

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, {
        // show: localStorage.getItem("ns")? JSON.parse(localStorage.getItem("ns")): []
        show: []
    })

    return (
        <alertContext.Provider value={{...state, dispatch}}>
            {children}
        </alertContext.Provider>
    )
}
