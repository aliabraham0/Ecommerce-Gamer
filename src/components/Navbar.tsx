import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { IoHomeOutline, IoGameControllerSharp, IoCartSharp } from 'react-icons/io5'
import { BsPersonFill } from 'react-icons/bs'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiHeart, FiLogOut, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import { SearchBar } from './SearchBar'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  cartCount: number
  favoriteCount: number
  search: string
  onSearch: (value: string) => void
}

export const Navbar = ({ cartCount, favoriteCount, search, onSearch }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-violet-800 hover:text-sky-300 ${
      isActive ? 'bg-violet-800 text-sky-300' : 'text-white'
    }`

  const closeMenu = () => setIsOpen(false)

  const links = [
    { to: '/Home', label: 'Inicio', icon: <IoHomeOutline /> },
    { to: '/tienda', label: 'Tienda', icon: <IoCartSharp /> },
    { to: '/About', label: 'Sobre nosotros', icon: <BsPersonFill /> },
    { to: '/contacto', label: 'Contacto', icon: <TfiHeadphoneAlt /> }
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-violet-500/30 bg-slate-900">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 p-4">

        
        <NavLink to="/" onClick={closeMenu}
          className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
          <IoGameControllerSharp className="text-violet-500" />
          Game<span className="text-violet-500">Store</span>
        </NavLink>

        
        <button onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-violet-500 p-2 text-white hover:bg-violet-800 md:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

   
        <div className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-3 md:flex md:w-auto md:flex-1 md:flex-row md:flex-wrap md:items-center md:justify-end`}>

       
          {links.map(link => (
            <NavLink key={link.to} to={link.to}
              onClick={closeMenu} className={linkStyle}>
              <span className="text-violet-400">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

         
          <div className="w-full md:w-48 lg:w-56">
            <SearchBar search={search} onSearch={onSearch} />
          </div>

      
          <NavLink to="/favoritos" onClick={closeMenu}
            aria-label={`Mis favoritos: ${favoriteCount} juegos`}
            className={linkStyle}>
            <FiHeart className="text-pink-400" />
            Favoritos
            <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs">
              {favoriteCount}
            </span>
          </NavLink>

        
          <NavLink to="/carrito" onClick={closeMenu}
            aria-label={`Carrito: ${cartCount} juegos`}
            className={linkStyle}>
            <FiShoppingCart className="text-violet-400" />
            Carrito
            <span aria-live="polite" className="rounded-full bg-violet-600 px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          </NavLink>


          {user ? (
            <div className="flex flex-wrap items-center gap-3 text-white">
              <span className="text-sm">Hola, <strong>{user.name}</strong></span>
              <button onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-violet-400 px-3 py-2 hover:bg-violet-700">
                <FiLogOut /> Cerrar sesión
              </button>
            </div>
          ) : (
            <NavLink to="/login" onClick={closeMenu}
              className="rounded-lg bg-violet-600 px-4 py-2 text-center text-white hover:bg-violet-700">
              Inicio de sesión
            </NavLink>
          )}

        </div>
      </nav>
    </header>
  )
}
