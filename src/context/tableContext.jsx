import { createContext, useReducer } from "react";

export const tableContext = createContext([]);

const tableReducer = (state, action) => {
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

export const TableProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tableReducer, {
        // show: localStorage.getItem("ns")? JSON.parse(localStorage.getItem("ns")): []
        show: []
    })

    console.log(state.show)

    return (
        <tableContext.Provider value={{...state, dispatch}}>
            {children}
        </tableContext.Provider>
    )
}
