import Home from "./components/Pages/Home"

import './styles/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdGames from './components/Pages/AdGames'

function App() {

  return (
    <>
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
