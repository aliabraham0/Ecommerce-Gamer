export type GameReview = {
  author: string
  rating: number
  date: string
  comment: string
}

export type Game = {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  developer: string
  rating: number
  reviewCount: number
  requirements: {
    minimum: string[]
    recommended: string[]
  }
  reviews: GameReview[]
}

const defaultRequirements = {
  minimum: ['Windows 10 de 64 bits', '8 GB de RAM', 'Tarjeta gráfica compatible con DirectX 11'],
  recommended: ['Windows 10/11 de 64 bits', '16 GB de RAM', 'Tarjeta gráfica dedicada con 6 GB de VRAM'],
}

const sampleReviews: GameReview[] = [
  {
    author: 'AlexGamer',
    rating: 5,
    date: '12 de octubre de 2025',
    comment: 'Una experiencia increíble. El mundo y la música hacen que cada partida se sienta especial.',
  },
  {
    author: 'NinaPlay',
    rating: 4,
    date: '28 de septiembre de 2025',
    comment: 'Muy entretenido y con mucho por descubrir. Lo recomiendo si te gusta explorar a tu ritmo.',
  },
]

const createGame = (
  id: number,
  title: string,
  price: number,
  category: string,
  developer: string,
  description: string,
  rating: number,
  reviewCount: number,
): Game => ({
  id,
  title,
  price,
  image: '/game-cover.svg',
  category,
  developer,
  description,
  rating,
  reviewCount,
  requirements: defaultRequirements,
  reviews: sampleReviews,
})

export const games: Game[] = [
  createGame(1, 'Elden Ring', 59.99, 'RPG de acción', 'FromSoftware', 'Explora las Tierras Intermedias en una aventura de acción y fantasía oscura llena de secretos, criaturas formidables y desafíos legendarios.', 4.8, 12500),
  createGame(2, 'Omori', 19.99, 'RPG psicológico', 'OMOCAT', 'Un RPG narrativo que alterna entre un mundo onírico y la realidad, con personajes entrañables, combates por turnos y una historia inolvidable.', 4.7, 8400),
  createGame(3, 'Minecraft', 29.99, 'Sandbox / Supervivencia', 'Mojang Studios', 'Construye, explora y sobrevive en mundos generados para ti. Reúne recursos, crea herramientas y comparte tus aventuras con amigos.', 4.9, 48200),
  createGame(4, 'GTA 6', 79.99, 'Acción / Mundo abierto', 'Rockstar Games', 'Descubre una nueva aventura de mundo abierto ambientada en Vice City. La información y los requisitos finales se actualizarán cuando estén disponibles.', 4.8, 0),
  createGame(5, 'OneShot', 9.99, 'Aventura / Puzles', 'Future Cat', 'Acompaña a Niko en una aventura de puzles donde tus decisiones importan y la relación entre el jugador y el mundo forma parte de la historia.', 4.8, 6100),
  createGame(6, 'Hylics', 2.99, 'RPG experimental', 'Mason Lindroth', 'Un RPG surrealista de estética artesanal, exploración por turnos y humor extraño que invita a perderse en un mundo único.', 4.5, 1200),
  createGame(7, 'Hollow Knight: Silksong', 19.99, 'Acción / Metroidvania', 'Team Cherry', 'Embárcate en una nueva aventura de acción y exploración en un reino desconocido, con combates ágiles, habilidades y secretos por descubrir.', 4.9, 15800),
  createGame(8, 'REPO', 9.99, 'Terror cooperativo', 'semiwork', 'Forma un equipo y recupera objetos valiosos en inquietantes escenarios generados de forma procedural. La cooperación será clave para salir con vida.', 4.6, 3400),
  createGame(9, 'Celeste', 19.99, 'Plataformas', 'Maddy Makes Games', 'Ayuda a Madeline a escalar la montaña Celeste en un desafiante juego de plataformas con controles precisos y una historia cercana.', 4.9, 22600),
  createGame(10, 'DEEPROOTED', 0, 'RPG narrativo', 'Jueguitos Mega', 'Explora una ciudad y el bosque a sus alrededores donde suceden eventos paranormales en busqueda de tu mejor amigo desaparecido. La información del juego se ampliará cuando sus detalles estén disponibles.', 4.3, 0),
]
