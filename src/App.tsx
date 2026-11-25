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
  const [search, setSearch] = useState('')
  const handleAddToCart = () => setCartCount((count) => count + 1)

  return (
    <section className="flex min-h-screen min-w-[320px] flex-col bg-[#080a14] bg-[radial-gradient(ellipse_at_50%_0%,rgba(86,47,150,0.18),transparent_44rem)] font-[Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] font-normal text-[#f5f4fb] antialiased [font-synthesis:none] [font-optical-sizing:auto] [text-rendering:optimizeLegibility] [&_a]:text-inherit [&_a]:no-underline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#d5adff] [&_a:focus-visible]:outline-offset-[3px] motion-reduce:**:scroll-auto motion-reduce:**:transition-none motion-reduce:[&_*::before]:transition-none motion-reduce:[&_*::after]:transition-none">
      <Navbar cartCount={cartCount} search={search} onSearch={setSearch} />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home search={search} onAddToCart={handleAddToCart} />} />
          <Route path="/About" element={<About/>}/>
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
