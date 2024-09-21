// SocketContext.js
import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { main } from '../api';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const ssocket = io(main, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            cert: '',
            key: ''
        });
        
        ssocket.on('connect', () => {
            setSocket(ssocket);
            // console.log("SOCKET: ", ssocket.id);
        });

    }, []);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };