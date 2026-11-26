import { Route, Routes } from 'react-router'
import About from './page/About'
import ProtectedRoute from './components/ProtectedRoute'
import Error404 from './page/error404'
import Login from './page/Login'
import Register from './page/Register'
import MainLayout, { AdminRoute, CartPage, FavoritesPage, GameDetailRoute, HomeRoute } from './layouts/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/Home" element={<HomeRoute />} />
        <Route path="/tienda" element={<HomeRoute />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detalle/:id" element={<GameDetailRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminRoute />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App
