
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const newSocket = io('http://localhost:8080',{
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        setSocket(newSocket);

        

        newSocket.on('connect', () => {
            console.log('User connected with socket ID:', newSocket.id);
        });

        
        newSocket.on('receive-message', (msg) => {
            alert(msg);
        });
        
        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
