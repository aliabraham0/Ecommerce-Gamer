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
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram, className: "hover:text-[#E4405F]" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube, className: "hover:text-[#FF0000]" },
  { label: "Discord", href: "https://discord.com/", icon: FaDiscord, className: "hover:text-[#7289DA]" },
  { label: "X", href: "https://x.com/", icon: FaXTwitter, },
]

export const Footer = () => {
  return (
    <footer className="border-t border-violet-500/30 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 md:flex-row md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:max-w-md">
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-white transition-colors hover:text-sky-300">
            <IoGameControllerSharp className="text-violet-500" />
            <span>
              Game<span className="text-violet-500">Store</span>
            </span>
          </NavLink>

          <p className="text-sm text-slate-300">
            Todas las marcas registradas pertenecen a sus respectivos dueños en EE. UU. y otros países.
            Todos los precios incluyen IVA (donde sea aplicable).
          </p>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="mb-3 text-lg font-bold text-white">Enlaces</h2>
          <nav className="flex flex-col gap-2">
            {footerLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className="text-slate-200 transition-colors hover:text-sky-400"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="mb-3 text-lg font-bold text-white">Síguenos</h2>
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ label, href, icon: Icon, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`flex items-center gap-2 text-slate-200 transition-colors ${className}`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="px-4 py-4 text-center text-sm text-slate-400">
          &copy; 2026 GameStore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
