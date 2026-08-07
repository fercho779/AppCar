import { useState } from "react";

function Formulario({ onRegister }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Más adelante acá podrás guardar el usuario en una base de datos
    alert("Usuario registrado correctamente");

    onRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-md p-8"
      >
        <h2 className="text-[20px] font-semibold text-center mb-6">
          Registrarse
        </h2>

        <div className="mb-4">
          <label className="block text-[13px] mb-1">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[13px] mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[13px] mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#e63946] text-white py-2 rounded-lg hover:bg-[#a80000]"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Formulario;