
import { NavLink } from "react-router"
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoGameControllerSharp } from "react-icons/io5"

const footerLinks = [
  { label: "Inicio", to: "/Home" },
  { label: "Tienda", to: "/tienda" },
  { label: "Sobre nosotros", to: "/about" },
  { label: "Contacto", to: "/contacto" },
]

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram, color: "hover:text-[#E4405F]" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube, color: "hover:text-[#FF0000]" },
  { label: "Discord", href: "https://discord.com/", icon: FaDiscord, color: "hover:text-[#7289DA]" },
  { label: "X", href: "https://x.com/", icon: FaXTwitter, color: "hover:text-white" },
]

export const Footer = () => {
  return (
    <footer className="border-t border-violet-500/30 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 text-center sm:grid-cols-2 md:grid-cols-3 md:text-left">

        {/* Marca */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-sky-300">
            <IoGameControllerSharp className="text-violet-500" />
            <span>Game<span className="text-violet-500">Store</span></span>
          </NavLink>

          <p className="max-w-sm text-sm text-slate-300">
            Todas las marcas registradas pertenecen a sus respectivos dueños en EE. UU. y otros países.
            Todos los precios incluyen IVA (donde sea aplicable).
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Enlaces</h2>
          <nav className="flex flex-col gap-2">
            {footerLinks.map(({ label, to }) => (
              <NavLink key={label} to={to} className="transition-colors hover:text-sky-400">
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Redes sociales */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Síguenos</h2>
          <div className="flex flex-col items-center gap-2 md:items-start">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex items-center gap-2 transition-colors ${color}`}
              >
                <Icon aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 px-4 py-4 text-center text-sm text-slate-400">
        © 2026 GameStore. Todos los derechos reservados.
      </div>
    </footer>
  )
}
