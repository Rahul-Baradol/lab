import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import { Layout } from './layout'
import BreadcrumbDocs from './pages/docs/breadcrumb-navigator-doc'
import { useEffect } from 'react'
import Lenis from "lenis";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lab/*" element={<BreadcrumbDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
