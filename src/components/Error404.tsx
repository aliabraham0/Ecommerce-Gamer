import { Link } from 'react-router';
import ghostImg from '../assets/404.jpg';
import homeIcon from '../assets/home-icon.png'

const Error404 = () => {
  return (
 <main className="min-h-screen flex items-center justify-center bg-[#090714] px-6 py-16 text-white">

    <div className="max-w-md w-full flex flex-col items-center text-center">
      
        <div className="mb-6 p-1 rounded-3xl bg-linear-to-b from-cyan-400/60 to-purple-600/30 shadow-lg shadow-cyan-500/20">
          <img
            src={ghostImg}
            alt="Fantasma neón 404"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-[20px] object-cover"
          />
        </div>

    
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight bg-linear-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
          Página no encontrada
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          La página que buscas no existe o fue movida.
        </p>

<Link
          to="/"
          className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors shadow-lg shadow-violet-600/30"
        >
          <img
            src={homeIcon}
            alt="Inicio"
            className="w-5 h-5 object-contain invert"
          />
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}

export default Error404
