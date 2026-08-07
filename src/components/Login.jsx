import { useState } from "react";

function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-md p-8"
      >
        <h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-6 text-center">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#4a4a4a] mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-[14px] border border-[#d9d9d9] rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[13px] font-medium text-[#4a4a4a] mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-[14px] border border-[#d9d9d9] rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0d9488] text-white text-[14px] font-semibold
                     py-2.5 rounded-lg hover:bg-[#a80000] transition-colors"
        >
          Ingresar
        </button>

        <p className="text-[13px] text-[#7a7a7a] text-center mt-4">
          ¿No tenés cuenta?{" "}
          <button
            type="button"
            onClick={onGoToRegister}
            className="text-[#0d9488] font-medium hover:underline"
          >
            Registrarse
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;