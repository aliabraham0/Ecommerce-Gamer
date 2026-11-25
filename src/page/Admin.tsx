import { useState,  } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { FiLogOut } from "react-icons/fi";

interface Game {
  id: number;
  name: string;
  category: string;
  price: number;
  players: number;
}

export function Admin() {
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      name: "Elden Ring",
      category: "RPG",
      price: 45000,
      players: 12,
    },
    {
      id: 2,
      name: "Cyberpunk 2077",
      category: "Acción",
      price: 38000,
      players: 8,
    },
    {
      id: 3,
      name: "God of War",
      category: "Aventura",
      price: 32000,
      players: 15,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    players: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.players) {
      alert("Completá todos los campos");
      return;
    }

    if (editingId !== null) {
      setGames((prev) =>
        prev.map((game) =>
          game.id === editingId
            ? {
                ...game,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                players: Number(form.players),
              }
            : game
        )
      );
    } else {
      const newGame: Game = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        players: Number(form.players),
      };

      setGames((prev) => [...prev, newGame]);
    }

    setForm({ name: "", category: "", price: "", players: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (game: Game) => {
    setForm({
      name: game.name,
      category: game.category,
      price: String(game.price),
      players: String(game.players),
    });

    setEditingId(game.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este videojuego?"
    );

    if (confirmDelete) {
      setGames((prev) => prev.filter((game) => game.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B1A] text-white lg:flex">

      
      <aside className="hidden w-64 shrink-0 bg-[#121224] border-r border-violet-500/20 p-6 md:flex md:flex-col">
        <h2 className="text-2xl font-black mb-10">
          GAME<span className="text-violet-500">STORE</span>
        </h2>

        <nav className="space-y-5">
          <a href="/admin" className="block text-violet-400 font-semibold">
            Dashboard
          </a>

          <a href="/admin" className="block text-gray-400 hover:text-cyan-400">
            Videojuegos
          </a>

          <a href="/" className="block text-gray-400 hover:text-cyan-400">
            Volver a la tienda
          </a>
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
          <FiLogOut /> Cerrar sesión
        </button>
      </aside>

  
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">

        <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center sm:mb-10">
          <div>
            <h1 className="text-3xl font-bold">Panel de administración</h1>
            <p className="text-gray-400 mt-2">
              Gestioná tu catálogo de videojuegos.
            </p>
          </div>

          <button
            onClick={() => {
              setForm({ name: "", category: "", price: "", players: "" });
              setEditingId(null);
              setShowForm(true);
            }}
            className="cursor-pointer w-full bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-lg font-semibold transition sm:w-auto"
          >
            + Agregar videojuego
          </button>
        </div>

       
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          <div className="bg-[#121224] border border-violet-500/20 p-6 rounded-xl">
            <p className="text-gray-400">Total de videojuegos</p>
            <h2 className="text-3xl font-bold text-violet-400 mt-3">
              {games.length}
            </h2>
          </div>

          <div className="bg-[#121224] border border-violet-500/20 p-6 rounded-xl">
            <p className="text-gray-400">Unidades disponibles</p>
            <h2 className="text-3xl font-bold text-cyan-400 mt-3">
              {games.reduce((total, game) => total + game.players, 0)}
            </h2>
          </div>

          <div className="bg-[#121224] border border-violet-500/20 p-6 rounded-xl">
            <p className="text-gray-400">Categorías</p>
            <h2 className="text-3xl font-bold text-white mt-3">
              {new Set(games.map((game) => game.category)).size}
            </h2>
          </div>

        </section>

        
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#121224] border border-violet-500/30 p-6 rounded-xl mb-8"
          >
            <h2 className="text-xl font-bold mb-5">
              {editingId !== null ? "Editar videojuego" : "Nuevo videojuego"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre del videojuego"
                className="bg-[#0B0B1A] border border-gray-700 p-3 rounded-lg outline-none focus:border-violet-500"
              />

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Categoría"
                className="bg-[#0B0B1A] border border-gray-700 p-3 rounded-lg outline-none focus:border-violet-500"
              />

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Precio"
                className="bg-[#0B0B1A] border border-gray-700 p-3 rounded-lg outline-none focus:border-violet-500"
              />

              <input
                name="players"
                type="number"
                min="0"
                value={form.players}
                onChange={handleChange}
                placeholder="Jugadores"
                className="bg-[#0B0B1A] border border-gray-700 p-3 rounded-lg outline-none focus:border-violet-500"
              />

            </div>

            <div className="flex gap-3 mt-5">
              <button
                type="submit"
                className="cursor-pointer bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg"
              >
                Guardar
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        
        <section className="bg-[#121224] border border-violet-500/20 rounded-xl overflow-hidden">

          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Inventario de videojuegos</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-150">

              <thead className="bg-[#19192F] text-gray-400 text-sm">
                <tr>
                  <th className="p-4">Videojuego</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Jugadores</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {games.map((game) => (
                  <tr key={game.id} className="border-t border-gray-800">
                    <td className="p-4 font-semibold">{game.name}</td>
                    <td className="p-4 text-gray-400">{game.category}</td>
                    <td className="p-4 text-cyan-400">
                      ${game.price.toLocaleString("es-AR")}
                    </td>
                    <td className="p-4">{game.players}</td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(game)}
                          className="cursor-pointer text-cyan-400 hover:text-cyan-300"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(game.id)}
                          className="cursor-pointer text-red-400 hover:text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {games.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      No hay videojuegos registrados.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </section>

      </main>

      
    </div>
  );
}

export default Admin;
