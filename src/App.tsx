import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './page/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={() => setCartCount((count) => count + 1)} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
