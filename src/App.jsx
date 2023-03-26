import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './layouts/Landing';
import Sala from './layouts/Sala';
import Juego from './layouts/Juego';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      
        <Route path='/sala/:codigo' element={<Sala></Sala>}></Route>
        <Route path='/sala/:codigo/juego/:codigo' element={<Juego></Juego>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
