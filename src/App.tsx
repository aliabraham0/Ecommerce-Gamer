import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { Home } from './page/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { GameDetail } from './page/GameDetail'
import { Admin } from './page/Admin'
import { Error404 } from './page/error404'
import Login from './page/Login'
import Register from './page/Register'
import ProtectedRoute from './components/ProtectedRoute'
import About from './page/About'

function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <section className="flex flex-col min-h-screen">
    <Navbar cartCount={cartCount} />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detalle/:id" element={<GameDetail onAddToCart={() => setCartCount((count) => count + 1)} />} />

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
