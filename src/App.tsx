
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { Home } from './page/Home'
import { GameDetail } from './page/GameDetail'
import { Admin } from './page/Admin'
import  About  from './page/About'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Error404 from './page/error404'
import Login from './page/Login'
import Register from './page/Register'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')

  const handleAddToCart = () => setCartCount(prev => prev + 1)

  return (
    <section className="flex min-h-screen flex-col bg-[#080a14] text-[#f5f4fb]">
      <Navbar cartCount={cartCount} search={search} onSearch={setSearch} />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home search={search} onAddToCart={handleAddToCart} />} />
          
          <Route path="/Home" element={<Home search={search} onAddToCart={handleAddToCart} />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detalle/:id" element={<GameDetail onAddToCart={handleAddToCart} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>

      <Footer />
    </section>
  )
}

export default App
