import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';
import {SignUp} from './pages/signup';
import { Login } from './pages/login';
import { Upload } from './pages/upload';
import { JoinRoom } from './pages/joinRoom'


import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/join-room' element={<JoinRoom/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
