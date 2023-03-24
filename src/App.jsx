import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './layouts/Landing';
import Sala from './layouts/Sala';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/sala/:codigo' element={<Sala></Sala>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
