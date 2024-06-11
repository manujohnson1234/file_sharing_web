// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { SignUp } from './pages/signup';
import { Login } from './pages/login';
import { Upload } from './pages/upload';
import { JoinRoom } from './pages/joinRoom';
import { Download } from './pages/download';

import { SocketProvider } from './context/socketContext';

import './App.css';

function App() {
  return (
    <div>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/join-room' element={<JoinRoom />} />
            <Route path='/download' element={<Download />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
