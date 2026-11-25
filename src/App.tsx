import { Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './page/Home'
import { Admin } from './page/Admin'
import { Error404 } from './page/error404'
import Login from './page/Login'
import Register from './page/Register'
import ProtectedRoute from './components/ProtectedRoute'
import About from './page/About'

function App() {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
