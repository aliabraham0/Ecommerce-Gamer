
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { IoGameControllerSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

type CredentialUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

const isCredentialUser = (value: unknown): value is CredentialUser => {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.password === "string" &&
    (user.role === "admin" || user.role === "user")
  );
};

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completá todos los campos.");
      return;
    }

  
    const demoUsers: CredentialUser[] = [
      {
        id: 1,
        name: "Administrador",
        email: "admin@gamestore.com",
        password: "admin123",
        role: "admin" as const,
      },
      {
        id: 2,
        name: "Usuario",
        email: "usuario@gamestore.com",
        password: "usuario123",
        role: "user" as const,
      },
    ];

    let registeredUsers: CredentialUser[] = [];
    const savedUsers = localStorage.getItem("gamestore_users");

    if (savedUsers) {
      try {
        const parsedUsers: unknown = JSON.parse(savedUsers);
        if (!Array.isArray(parsedUsers) || !parsedUsers.every(isCredentialUser)) {
          setError("No se pudieron cargar las cuentas registradas.");
          return;
        }
        registeredUsers = parsedUsers;
      } catch {
        setError("No se pudieron cargar las cuentas registradas.");
        return;
      }
    }

    const foundUser = [...demoUsers, ...registeredUsers].find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Correo electrónico o contraseña incorrectos.");
      return;
    }

    login({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    });

    navigate(foundUser.role === "admin" ? "/admin" : "/");
  };

  return (
    <main className="min-h-screen bg-[#0B0B1A] flex items-center justify-center px-4 py-10">

      <section className="w-full max-w-md bg-[#121224] border border-violet-500/30 rounded-2xl p-8 shadow-2xl shadow-violet-950/30">

       
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-white">
            <IoGameControllerSharp className="text-violet-500 text-4xl" />
            GAME<span className="text-violet-500">STORE</span>
          </Link>

          <h1 className="text-2xl font-bold text-white mt-6">
            ¡Bienvenido de nuevo!
          </h1>

          <p className="text-gray-400 mt-2">
            Iniciá sesión para continuar jugando.
          </p>
        </div>

    
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-300 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full bg-[#0B0B1A] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-violet-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá tu contraseña"
                className="w-full bg-[#0B0B1A] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-violet-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg transition duration-300 hover:shadow-lg hover:shadow-violet-500/20"
          >
            Iniciar sesión
          </button>

        </form>

        
        <div className="text-center mt-7">
          <p className="text-gray-400">
            ¿Todavía no tenés una cuenta?
          </p>

          <Link
            to="/register"
            className="text-cyan-400 hover:text-violet-400 font-semibold mt-2 inline-block transition"
          >
            Crear una cuenta
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-white text-sm transition">
            ← Volver a la tienda
          </Link>
        </div>

      </section>
    </main>
  );
}

export default Login;
