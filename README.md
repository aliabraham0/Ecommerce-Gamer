# 🎮 Ecommerce Gamer

Tienda online de videojuegos hecha con React y TypeScript. Permite explorar un catálogo, buscar juegos, ver el detalle de cada uno con su galería de imágenes y registrarse o iniciar sesión.

![Captura del proyecto](src/assets/hero.png)

## Características

- Catálogo de juegos con tarjetas de portada
- Buscador de juegos
- Página de detalle con galería de capturas
- Registro e inicio de sesión con validación de formularios
- Rutas protegidas mediante contexto de autenticación
- Panel de administración
- Persistencia de datos en el navegador (localStorage)
- Página "Acerca de" y página 404 personalizada
- Diseño responsive con Tailwind CSS

## Catálogo incluido

Celeste, DEEPROOTED, Elden Ring, GTA, Hylics, Minecraft, Omori, OneShot, R.E.P.O. y Hollow Knight: Silksong.

## Tecnologías

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/): bundler y servidor de desarrollo
- [Tailwind CSS 4](https://tailwindcss.com/): estilos
- [React Router](https://reactrouter.com/): enrutado
- [React Hook Form](https://react-hook-form.com/): formularios
- [Axios](https://axios-http.com/): peticiones HTTP
- [React Icons](https://react-icons.github.io/react-icons/): íconos
- ESLint + React Compiler: calidad y optimización del código

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior
- [pnpm](https://pnpm.io/) (o npm)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/aliabraham0/Ecommerce-Gamer.git
cd Ecommerce-Gamer

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

La app queda disponible en `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Compila TypeScript y genera la build de producción |
| `pnpm preview` | Sirve localmente la build de producción |
| `pnpm lint` | Revisa el código con ESLint |

## Estructura del proyecto

```
src/
├── assets/
│   └── games/
│       ├── gallery/      # Capturas de cada juego
│       └── portada/      # Portadas
├── components/           # Navbar, Footer, GameCard, SearchBar, ProtectedRoute
├── context/              # AuthContext (autenticación)
├── data/                 # Datos de los juegos
├── hooks/                # useLocalStorage
├── layouts/              # MainLayout
├── page/                 # Home, GameDetail, Login, Register, Admin, About, 404
├── services/             # gameService
├── App.tsx
├── index.css
└── main.tsx
```

## Estado del proyecto

En desarrollo.

- [x] Catálogo y detalle de juegos
- [x] Login y registro
- [x] Panel de administración
- [ ] [Carrito de compras]
- [ ] [Pasarela de pago]

## Licencia

[MIT / Todos los derechos reservados]
