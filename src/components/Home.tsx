import { useState } from 'react';


interface Slide {
  titulo1: string;
titulo2:  string;
destacado: string;
subtitulo: string;
boton: string;
imagen: string;
}


const slides: Slide[] =[ {                                              titulo1: 'Descubrí los',
    titulo2: 'mejores',
    destacado: 'videojuegos',
    subtitulo: 'Tu tienda gamer, en un solo lugar.',
    boton: 'Explorar Catálogo',
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600',
  },
       {
    titulo1: 'Viví la historia',
    titulo2: 'nueva de',
    destacado: 'GTA 6',
    subtitulo: 'Explorá Vice City en la nueva generación.',
    boton: 'Ver Juego',
    imagen: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=1600',
  },
  {
    titulo1: 'Sobreviví en',
    titulo2: 'las cuevas de',
    destacado: 'DEEPROOTED',
    subtitulo: 'Una aventura subterránea llena de secretos.',
    boton: 'Ver Juego',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600',
  },                                      
  {
    titulo1: 'Construí tu',
    titulo2: 'propio mundo en',
    destacado: 'Minecraft',
    subtitulo: 'Aventuras infinitas bloque a bloque.',
    boton: 'Ver Juego',
    imagen: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=1600',
  },
];                                         
 export function Home() {
  const [actual, setActual] = useState<number>(0);

  
  const anterior = () => {
    if (actual === 0) {
      setActual(slides.length - 1);
    } else {
      setActual(actual - 1);
    }
  };

  const siguiente = () => {
    if (actual === slides.length - 1) {
      setActual(0);
    } else {
      setActual(actual + 1);
    }
  };

  const banner: Slide = slides[actual];
                                         return (
    <div className="relative w-full h-[300px] md:h-[380px] bg-slate-950 overflow-hidden">
      
      <img
        src={banner.imagen}
        alt={banner.destacado}
        className="w-full h-full object-cover object-right"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />                                                               
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          {banner.titulo1} <br />
          {banner.titulo2}{' '}
          <span className="text-purple-500">{banner.destacado}</span>
        </h1>

        <p className="text-gray-300 text-sm md:text-lg mt-2 md:mt-3">
          {banner.subtitulo}
        </p>

        <div className="mt-5">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition">
            <span>{banner.boton}</span>
            <span>🎮</span>
          </button>
        </div>
      </div>

    
      <button
        onClick={anterior}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white w-8 h-8 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={siguiente}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white w-8 h-8 rounded-full"
      >
      ,
      </button>

      {/* Puntitos de abajo */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setActual(index)}
            aria-label={`Ir al slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${
              actual === index ? 'bg-purple-500' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 

export default Home
