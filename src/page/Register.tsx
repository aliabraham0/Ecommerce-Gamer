
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { IoGameControllerSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Completá todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

   
    const savedUsers = localStorage.getItem("gamestore_users");

    const users = savedUsers ? JSON.parse(savedUsers) : [];

   
    const emailExists = users.some(
      (user: { email: string }) =>
        user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists || email.trim().toLowerCase() === "admin@gamestore.com" ||
        email.trim().toLowerCase() === "usuario@gamestore.com") {
      setError("Este correo electrónico ya está registrado.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "user" as const,
    };

   
    users.push(newUser);
    localStorage.setItem("gamestore_users", JSON.stringify(users));

    
    login({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#0B0B1A] flex items-center justify-center px-4 py-10">

      <section className="w-full max-w-md bg-[#121224] border border-violet-500/30 rounded-2xl p-8 shadow-2xl shadow-violet-950/30">

        
        <div className="text-center mb-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-3xl font-bold text-white"
          >
            <IoGameControllerSharp className="text-violet-500 text-4xl" />
            GAME<span className="text-violet-500">STORE</span>
          </Link>

          <h1 className="text-2xl font-bold text-white mt-6">
            Crear una cuenta
          </h1>

          <p className="text-gray-400 mt-2">
            Unite a la comunidad GameStore.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

        
          <div>
            <label className="block text-gray-300 mb-2">
              Nombre completo
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full bg-[#0B0B1A] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-violet-500 transition"
            />
          </div>

         
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
                placeholder="Mínimo 6 caracteres"
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

         
          <div>
            <label className="block text-gray-300 mb-2">
              Confirmar contraseña
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                className="w-full bg-[#0B0B1A] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-violet-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
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
            Crear cuenta
          </button>

        </form>

        
        <div className="text-center mt-7">
          <p className="text-gray-400">
            ¿Ya tenés una cuenta?
          </p>

          <Link
            to="/login"
            className="text-cyan-400 hover:text-violet-400 font-semibold mt-2 inline-block transition"
          >
            Iniciar sesión
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-500 hover:text-white text-sm transition"
          >
            ← Volver a la tienda
          </Link>
        </div>

      </section>
    </main>
  );
}

export default Register;
