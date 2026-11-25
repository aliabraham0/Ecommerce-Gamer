
import { Link } from "react-router";
import { IoGameControllerSharp } from "react-icons/io5";
import { BsController, BsPeopleFill, BsShieldCheck } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import Fernado from "../assets/Fernado.png";

function About() {
  return (
    <main className="min-h-screen bg-[#0B0B1A] text-white">

     
      <section className="text-center px-6 py-20 bg-linear-to-b from-violet-950/40 to-[#0B0B1A]">
        <IoGameControllerSharp className="text-violet-500 text-6xl mx-auto mb-5" />

        <h1 className="text-4xl md:text-6xl font-black mb-5">
          Sobre <span className="text-violet-500">GameStore</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Somos una tienda dedicada al mundo de los videojuegos.
          Nuestro objetivo es ofrecer una experiencia de compra
          sencilla, segura y accesible para todos los jugadores.
        </p>
      </section>

    
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-5">
            Nuestra <span className="text-violet-500">historia</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4">
            GameStore nace como un proyecto pensado para reunir
            a los amantes de los videojuegos en un solo lugar.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Buscamos ofrecer un catálogo variado, una navegación
            intuitiva y una plataforma donde cada jugador pueda
            descubrir sus próximos juegos favoritos.
          </p>
        </div>

        <div className="bg-[#121224] border border-violet-500/30 rounded-2xl p-10 text-center">
          <IoGameControllerSharp className="text-violet-500 text-8xl mx-auto mb-5" />

          <h3 className="text-2xl font-bold">
            GAME<span className="text-violet-500">STORE</span>
          </h3>

          <p className="text-gray-400 mt-3">
            Tu próximo juego comienza aquí.
          </p>
        </div>

      </section>

     
      <section className="bg-[#121224] py-16 px-6">

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Qué nos <span className="text-violet-500">define?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <article className="bg-[#0B0B1A] border border-violet-500/20 rounded-xl p-7 text-center hover:border-violet-500 transition">
              <BsController className="text-violet-500 text-5xl mx-auto mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Pasión por los juegos
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Nos encanta el mundo gamer y queremos acercar
                nuevas experiencias a cada jugador.
              </p>
            </article>

            <article className="bg-[#0B0B1A] border border-violet-500/20 rounded-xl p-7 text-center hover:border-violet-500 transition">
              <BsShieldCheck className="text-violet-500 text-5xl mx-auto mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Confianza y seguridad
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Trabajamos para brindar una experiencia
                de compra clara y confiable.
              </p>
            </article>

            <article className="bg-[#0B0B1A] border border-violet-500/20 rounded-xl p-7 text-center hover:border-violet-500 transition">
              <BsPeopleFill className="text-violet-500 text-5xl mx-auto mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Comunidad gamer
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Queremos crear un espacio para quienes
                comparten la pasión por los videojuegos.
              </p>
            </article>

          </div>
        </div>

      </section>

     
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-violet-500">equipo</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Detrás de GameStore hay un equipo de colaboradores
            que trabaja con dedicación para hacer realidad este proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Colaborador 1 */}
          <article className="bg-[#121224] border border-violet-500/20 rounded-2xl overflow-hidden text-center hover:border-violet-500 transition duration-300 hover:-translate-y-2">

            <div className="p-6">
              <div
                role="img"
                aria-label="Avatar de colaborador"
                className="w-40 h-40 mx-auto rounded-full border-4 border-violet-500 bg-[#0B0B1A] shadow-lg shadow-violet-500/20 flex items-center justify-center"
              >
                <BsPeopleFill className="text-violet-400 text-6xl" aria-hidden="true" />
              </div>
            </div>

            <div className="px-6 pb-7">
              <h3 className="text-xl font-bold">
                Nombre del colaborador 1
              </h3>

              <p className="text-violet-400 mt-2">
                Desarrollador Frontend
              </p>

              <p className="text-gray-400 text-sm mt-3">
                Participó en el desarrollo de la interfaz
                y los componentes visuales de GameStore.
              </p>
            </div>

          </article>

          {/* Colaborador 2 */}
          <article className="bg-[#121224] border border-violet-500/20 rounded-2xl overflow-hidden text-center hover:border-violet-500 transition duration-300 hover:-translate-y-2">

            <div className="p-6">
              <img
                src={Fernado}
                alt="Fotografía del colaborador 2"
                className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-violet-500 shadow-lg shadow-violet-500/20"
              />
            </div>

            <div className="px-6 pb-7">
              <h3 className="text-xl font-bold">
                Nombre del colaborador 2
              </h3>

              <p className="text-violet-400 mt-2">
                Desarrollador Backend
              </p>

              <p className="text-gray-400 text-sm mt-3">
                Colaboró en la lógica y el funcionamiento
                de las funcionalidades del proyecto.
              </p>
            </div>

          </article>

          {/* Colaborador 3 */}
          <article className="bg-[#121224] border border-violet-500/20 rounded-2xl overflow-hidden text-center hover:border-violet-500 transition duration-300 hover:-translate-y-2">

            <div className="p-6">
              <div
                role="img"
                aria-label="Avatar de colaborador"
                className="w-40 h-40 mx-auto rounded-full border-4 border-violet-500 bg-[#0B0B1A] shadow-lg shadow-violet-500/20 flex items-center justify-center"
              >
                <BsPeopleFill className="text-violet-400 text-6xl" aria-hidden="true" />
              </div>
            </div>

            <div className="px-6 pb-7">
              <h3 className="text-xl font-bold">
                Nombre del colaborador 3
              </h3>

              <p className="text-violet-400 mt-2">
                Diseñador UI/UX
              </p>

              <p className="text-gray-400 text-sm mt-3">
                Participó en el diseño y la experiencia
                de navegación de la tienda.
              </p>
            </div>

          </article>

        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <MdOutlineShoppingCart className="text-cyan-400 text-5xl mx-auto mb-5" />

        <h2 className="text-3xl font-bold mb-5">
          Explorá nuestra tienda
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Descubrí nuestro catálogo y encontrá videojuegos
          para disfrutar de nuevas aventuras.
        </p>

        <Link
          to="/"
          className="inline-block bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-violet-500/20"
        >
          Explorar juegos
        </Link>

      </section>

    </main>
  );
}

export default About;
