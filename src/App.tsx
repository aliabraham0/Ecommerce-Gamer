import { BrowserRouter, Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './page/Home'
import { Login } from './page/Login'
import { Admin } from './page/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Route   />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
