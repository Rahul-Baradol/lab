import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cordyceps from './components/cordyceps'
import FireParticles from './components/fire'
import Rippling from './components/rippling'
import Waves from './components/waves'
import BouncyButton from './components/bouncy-button'
import Home from './pages/home'
import FrostedGlass from './components/frosted-glass'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/cordyceps" element={<Cordyceps />} />
          <Route path="/components/fire" element={<FireParticles />} />
          <Route path="/components/rippling" element={<Rippling />} />
          <Route path="/components/waves" element={<Waves />} />
          <Route path="/components/bouncy-button" element={<BouncyButton />} />
          <Route path="/components/frosted-glass" element={<FrostedGlass />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
