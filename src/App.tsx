import { BrowserRouter, Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
     <Routes>
      <Route path="/" />
      <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
