import Home from "./Pages/Home"

import './styles/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdGames from './Pages/AdGames'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
     <ToastContainer autoClose={3000} />
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AdGames/:id' element={<AdGames />} />
        </Routes>

      </BrowserRouter>
    </>

  )

}

export default App
