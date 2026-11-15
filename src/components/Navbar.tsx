import { NavLink } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { IoGameControllerSharp } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export const Navbar = () => {
    
  return (
    <header className="bg-slate-900 border-b border-violet-500/30 p-3">
      <div className="flex flex-wrap gap-4 items-center justify-end p-3 ">
        <div className="justify-start flex-grow">
          <NavLink to="/" className="flex items-center gap-2 text-3xl font-bold text-white"> 
          <IoGameControllerSharp className="text-violet-500" />
          <span className="hover:text-sky-300">Game<span className="text-violet-500"> 
          Store
          </span> 
          </span> 
          </NavLink>
        </div>
        <NavLink to="/" className="flex items-center gap-2 rounded-md border-violet-400 px-2 py-2 text-white transition-colors hover:border-transparent hover:bg-violet-800 hover:text-sky-400">
          <IoHomeOutline className="text-violet-500"/>
          <span>inicio</span> 
          </NavLink>
        <NavLink to="" className="flex items-center gap-2 text-white rounded-md hover:border-violet-400 hover:border-transparent px-2 py-2 hover:text-sky-400 hover:bg-violet-800 transition-colors"> 
          <IoCartSharp className="text-violet-500"/>
          <span>tienda</span>
          </NavLink>
        <NavLink to="" className="flex items-center gap-2 text-white rounded-md hover:border-violet-400 hover:border-transparent px-2 py-2 hover:text-sky-400 hover:bg-violet-800 transition-colors">
          <BsPersonFill className="text-violet-500"/>
          <span>Sobre nosotros</span>
          </NavLink>
        <NavLink to="" className="flex items-center gap-2 text-white rounded-md hover:border-violet-400 hover:border-transparent px-2 py-2 hover:text-sky-400 hover:bg-violet-800 transition-colors">
          <TfiHeadphoneAlt className="text-violet-500"/>
          <span>Contacto</span>
        </NavLink>
        <input
           className="placeholder:text-gray-400 placeholder:italic  ..."
          placeholder="buscar juego..."
          type="text"
          name="search"/>
        <div>
          <NavLink to="/login" className="border border-violet-400 rounded-md px-2 py-2 bg-violet-600 text-white hover:text-sky-400">
            Inicio de sesión
          </NavLink>
        </div>
      </div>
    </header>
  );
}; 