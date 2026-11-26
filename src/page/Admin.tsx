import { Link, useNavigate } from "react-router";
import { FiArrowUpRight, FiLogOut, FiPackage, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { games } from "../data/game";

interface AdminProps {
  cartItems: { id: number; title: string; price: number; quantity: number }[];
  onRemoveCartItem: (id: number) => void;
  onClearCart: () => void;
}

export function Admin({ cartItems, onRemoveCartItem, onClearCart }: AdminProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#080a14] px-4 py-8 text-[#f5f4fb] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="flex flex-col rounded-2xl border border-violet-500/20 bg-[#121224] p-5">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">GameStore</p>
            <h2 className="mt-2 text-xl font-black">Panel admin</h2>
          </div>
          <nav className="flex gap-2 lg:flex-col">
            <a href="/admin" className="rounded-lg bg-violet-600/20 px-3 py-2 text-sm font-semibold text-violet-200">Resumen</a>
            <a href="/admin" className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Catálogo</a>
            <Link to="/" className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Volver a la tienda</Link>
          </nav>
          <div className="mt-8 rounded-xl border border-white/10 bg-[#0B0B1A] p-4 lg:mt-auto">
            <p className="text-xs uppercase tracking-wider text-slate-500">Sesión activa</p>
            <p className="mt-2 truncate font-semibold">{user?.name ?? "Administrador"}</p>
            <p className="mt-1 break-all text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-violet-400/30 px-3 py-2.5 text-sm text-violet-200 transition hover:bg-violet-500/15"
          >
            <FiLogOut aria-hidden="true" /> Cerrar sesión
          </button>
        </aside>

        <div className="min-w-0 space-y-6">
          <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-cyan-300">Centro de control</p>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Resumen de la tienda</h1>
              <p className="mt-2 text-sm text-slate-400">Hola, {user?.name ?? "Administrador"}.</p>
            </div>
            <Link to="/tienda" className="inline-flex items-center gap-2 self-start rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold hover:bg-violet-500 sm:self-auto">
              Abrir tienda <FiArrowUpRight />
            </Link>
          </header>

          <section className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-violet-500/20 bg-[#121224] p-5">
              <FiPackage className="text-xl text-violet-300" />
              <p className="mt-4 text-sm text-slate-400">Juegos en catálogo</p>
              <p className="mt-1 text-3xl font-bold">{games.length}</p>
            </article>
            <article className="rounded-2xl border border-cyan-400/20 bg-[#121224] p-5">
              <FiShoppingCart className="text-xl text-cyan-300" />
              <p className="mt-4 text-sm text-slate-400">Juegos en carrito</p>
              <p className="mt-1 text-3xl font-bold">{cartCount}</p>
            </article>
            <article className="rounded-2xl border border-violet-500/20 bg-[#121224] p-5">
              <p className="text-sm text-slate-400">Total del carrito</p>
              <p className="mt-5 text-3xl font-bold text-cyan-300">${cartTotal.toFixed(2)}</p>
              <p className="mt-1 text-xs text-slate-500">USD</p>
            </article>
          </section>

          <section className="overflow-hidden rounded-2xl border border-violet-500/20 bg-[#121224]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold">Carrito compartido</h2>
                <p className="mt-1 text-sm text-slate-400">Revisa o elimina artículos del carrito.</p>
              </div>
              {cartItems.length > 0 && (
                <button type="button" onClick={onClearCart} className="rounded-lg border border-rose-400/30 px-3 py-2 text-sm text-rose-300 hover:bg-rose-400/10">
                  Vaciar carrito
                </button>
              )}
            </div>
            {cartItems.length === 0 ? (
              <p className="p-6 text-sm text-slate-400">No hay juegos agregados al carrito.</p>
            ) : (
              <ul className="divide-y divide-white/5">
                {cartItems.map(item => (
                  <li key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.quantity} × ${item.price.toFixed(2)} USD</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveCartItem(item.id)}
                      aria-label={`Eliminar ${item.title} del carrito`}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-300 hover:bg-rose-400/10"
                    >
                      <FiTrash2 /> Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-violet-500/20 bg-[#121224]">
            <div className="border-b border-white/10 p-5 sm:p-6">
              <h2 className="text-xl font-bold">Catálogo de juegos</h2>
              <p className="mt-1 text-sm text-slate-400">Datos del catálogo que ve la tienda.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-140 text-left text-sm">
                <thead className="bg-[#19192F] text-slate-400">
                  <tr>
                    <th className="p-4">Juego</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Valoración</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map(game => (
                    <tr key={game.id} className="border-t border-white/5">
                      <td className="p-4 font-medium">{game.title}</td>
                      <td className="p-4 text-slate-400">{game.category}</td>
                      <td className="p-4 text-cyan-300">${game.price.toFixed(2)} USD</td>
                      <td className="p-4 text-violet-200">{game.rating.toFixed(1)} / 5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Admin;