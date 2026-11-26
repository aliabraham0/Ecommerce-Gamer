import { NavLink } from "react-router";
import { IoHomeOutline, IoGameControllerSharp, IoCartSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FiShoppingCart } from "react-icons/fi";
import { SearchBar } from "./SearchBar";

interface NavbarProps {
  cartCount: number;
  search: string;
  onSearch: (value: string) => void;
}

export const Navbar = ({ cartCount, search, onSearch }: NavbarProps) => {
  return (
    <header className="bg-slate-900 border-b border-violet-500/30 p-3">
      <nav className="flex flex-wrap gap-4 items-center justify-end p-3">
        <div className="justify-start grow">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-3xl font-bold text-white"
          >
            <IoGameControllerSharp className="text-violet-500" />
            <span className="hover:text-sky-300">
              Game<span className="text-violet-500">Store</span>
            </span>
          </NavLink>
        </div>

        <NavLink
          to="/Home"
          className="flex items-center gap-2 px-2 py-2 text-white rounded-md transition-colors hover:bg-violet-800 hover:text-sky-400"
        >
          <IoHomeOutline className="text-violet-500" />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/tienda"
          className="flex items-center gap-2 px-2 py-2 text-white rounded-md transition-colors hover:bg-violet-800 hover:text-sky-400"
        >
          <IoCartSharp className="text-violet-500" />
          <span>Tienda</span>
        </NavLink>

        <NavLink
          to="/About"
          className="flex items-center gap-2 px-2 py-2 text-white rounded-md transition-colors hover:bg-violet-800 hover:text-sky-400"
        >
          <BsPersonFill className="text-violet-500" />
          <span>Sobre nosotros</span>
        </NavLink>

        <NavLink
          to="/contacto"
          className="flex items-center gap-2 px-2 py-2 text-white rounded-md transition-colors hover:bg-violet-800 hover:text-sky-400"
        >
          <TfiHeadphoneAlt className="text-violet-500" />
          <span>Contacto</span>
        </NavLink>

        <SearchBar search={search} onSearch={onSearch} />

        <div className="flex items-center gap-2 text-white">
          <FiShoppingCart className="text-violet-500" />
          <button>Carrito</button>
          <span
            className="bg-violet-600 text-white rounded-full px-2 py-1 text-sm"
            aria-live="polite"
          >
            {cartCount}
          </span>
        </div>

        <NavLink
          to="/login"
          className="border border-violet-400 rounded-md px-2 py-2 bg-violet-600 text-white hover:text-sky-400"
        >
          Inicio de sesión
        </NavLink>
      </nav>
    </header>
  );
};