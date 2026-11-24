
import { FiShoppingCart } from 'react-icons/fi'

type NavbarProps = {
  cartCount: number
}

export const Navbar = ({ cartCount }: NavbarProps) => {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegación principal">
        <a className="site-brand" href="/" aria-label="Pixel Vault, inicio">
          <span className="site-brand__mark">P</span>
          <span>PIXEL<span className="site-brand__accent">VAULT</span></span>
        </a>
        <div className="site-nav__links">
          <a href="/">Inicio</a>
          <button
            className="cart-indicator"
            type="button"
            aria-label={`Carrito: ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
          >
            <FiShoppingCart aria-hidden="true" />
            <span>Carrito</span>
            <span className="cart-indicator__count" aria-live="polite">{cartCount}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
