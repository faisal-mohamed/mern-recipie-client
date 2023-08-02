import react from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {Home} from './pages/home.js';
import {Auth} from './pages/auth.js'
import { CreateRecipie } from './pages/create-recipie';
import { SavedRecipies } from './pages/saved-recipies';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/create-recipie' element={<CreateRecipie/>} />
            <Route path='/saved-recipies' element={<SavedRecipies/>} />

          </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
