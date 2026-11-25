import { useState } from 'react'
import {
  FiBell,
  FiBox,
  FiDollarSign,
  FiEdit2,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
  FiX,
} from 'react-icons/fi'

type Game = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  sold: number
  accent: string
}

const initialGames: Game[] = [
  { id: 1, name: 'Cyberpunk 2077', category: 'RPG', price: 59.99, stock: 24, sold: 128, accent: 'from-fuchsia-500 to-violet-700' },
  { id: 2, name: 'The Witcher 3', category: 'Aventura', price: 39.99, stock: 18, sold: 96, accent: 'from-amber-500 to-orange-700' },
  { id: 3, name: 'Elden Ring', category: 'Acción', price: 69.99, stock: 32, sold: 84, accent: 'from-yellow-500 to-red-700' },
  { id: 4, name: 'God of War', category: 'Aventura', price: 49.99, stock: 9, sold: 73, accent: 'from-sky-500 to-blue-800' },
  { id: 5, name: 'Hades', category: 'Indie', price: 24.99, stock: 41, sold: 61, accent: 'from-red-500 to-pink-700' },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)

export const Admin = () => {
  const [games, setGames] = useState(initialGames)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editing, setEditing] = useState<Game | null>(null)

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'Todos' || game.category === category
    return matchesSearch && matchesCategory
  })

  const categories = ['Todos', ...Array.from(new Set(games.map((game) => game.category)))]

  const deleteGame = (id: number) => setGames((current) => current.filter((game) => game.id !== id))

  const saveGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const gameData = {
      name: String(form.get('name')),
      category: String(form.get('category')),
      price: Number(form.get('price')),
      stock: Number(form.get('stock')),
    }

    if (editing) {
      setGames((current) => current.map((game) => game.id === editing.id ? { ...game, ...gameData } : game))
    } else {
      setGames((current) => [{ id: Date.now(), ...gameData, sold: 0, accent: 'from-emerald-500 to-teal-700' }, ...current])
    }
    setEditing(null)
  }

  const openNewGame = () => setEditing({ id: 0, name: '', category: 'Acción', price: 0, stock: 0, sold: 0, accent: '' })

  const stats = [
    { label: 'Ingresos', value: '€24.580', change: '+12.5%', icon: FiDollarSign, color: 'bg-violet-100 text-violet-600' },
    { label: 'Pedidos', value: '1.248', change: '+8.2%', icon: FiShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Usuarios', value: '8.421', change: '+5.1%', icon: FiUsers, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Productos', value: String(games.length), change: '+3.0%', icon: FiPackage, color: 'bg-amber-100 text-amber-600' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      {sidebarOpen && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#171a2b] px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500 font-black">G</div>
            <div>
              <p className="text-lg font-bold leading-tight">GamerHub</p>
              <p className="text-xs text-slate-400">Panel admin</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><FiX /></button>
        </div>

        <nav className="space-y-2 text-sm">
          <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500 px-4 py-3 font-semibold">
            <FiGrid /> Resumen
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white">
            <FiShoppingBag /> Pedidos
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white">
            <FiBox /> Productos
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white">
            <FiUsers /> Usuarios
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white">
            <FiSettings /> Configuración
          </button>
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
          <FiLogOut /> Cerrar sesión
        </button>
      </aside>

      <main className="lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button aria-label="Abrir menú" className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={21} />
            </button>
            <div>
              <p className="text-xs text-slate-400">Miércoles, 19 de noviembre</p>
              <h1 className="text-xl font-bold">Panel de administración</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notificaciones" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500">
              <FiBell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-violet-500" />
            </button>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">AD</div>
              <div className="text-sm">
                <p className="font-bold">Administrador</p>
                <p className="text-xs text-slate-400">admin@gamerhub.es</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <article key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ${stat.color}`}><Icon size={21} /></div>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                      <FiTrendingUp /> {stat.change}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-black">{stat.value}</p>
                </article>
              )
            })}
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold">Catálogo de juegos</h2>
                <p className="mt-1 text-sm text-slate-400">Gestiona el inventario y los precios</p>
              </div>
              <button onClick={openNewGame} className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700">
                <FiPlus /> Añadir juego
              </button>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row">
              <label className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por nombre..."
                  className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-violet-400"
                />
              </label>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-violet-400">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Juego</th>
                    <th className="px-5 py-3 font-semibold">Categoría</th>
                    <th className="px-5 py-3 font-semibold">Precio</th>
                    <th className="px-5 py-3 font-semibold">Inventario</th>
                    <th className="px-5 py-3 font-semibold">Vendidos</th>
                    <th className="px-5 py-3 text-right font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGames.map((game) => (
                    <tr key={game.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${game.accent} text-lg font-black text-white`}>G</div>
                          <span className="font-bold">{game.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{game.category}</span></td>
                      <td className="px-5 py-4 font-bold">{formatCurrency(game.price)}</td>
                      <td className="px-5 py-4">
                        <span className={game.stock < 10 ? 'font-bold text-red-500' : 'text-slate-600'}>{game.stock} unidades</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{game.sold}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <button aria-label={`Editar ${game.name}`} onClick={() => setEditing(game)} className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-600"><FiEdit2 /></button>
                          <button aria-label={`Eliminar ${game.name}`} onClick={() => deleteGame(game.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredGames.length === 0 && <p className="py-12 text-center text-sm text-slate-400">No se encontraron juegos.</p>}
            </div>
          </section>
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-4">
          <form onSubmit={saveGame} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing.id ? 'Editar juego' : 'Nuevo juego'}</h2>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-slate-100"><FiX /></button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Nombre
                <input name="name" defaultValue={editing.name} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-violet-400" />
              </label>
              <label className="block text-sm font-semibold">Categoría
                <select name="category" defaultValue={editing.category} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-violet-400">
                  <option>Acción</option><option>Aventura</option><option>RPG</option><option>Indie</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-semibold">Precio (€)
                  <input name="price" type="number" min="0" step="0.01" defaultValue={editing.price} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-violet-400" />
                </label>
                <label className="block text-sm font-semibold">Stock
                  <input name="stock" type="number" min="0" defaultValue={editing.stock} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-violet-400" />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold">Cancelar</button>
              <button type="submit" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Admin
