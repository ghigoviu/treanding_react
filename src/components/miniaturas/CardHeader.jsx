import { useEffect, useState } from "react";

const CardHeader = ({ id }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        const user = data.usuarios.find((u) => u.id === id);
        setUsuario(user || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando los datos:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (!usuario)
    return (
      <h2 className="text-red-500 font-semibold">Usuario no encontrado</h2>
    );

  return (
    <div className="flex justify-between items-start px-4 py-2 border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={`/media/avatars/${usuario.img_perfil}`}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nombre + Estado */}
        <div className="flex flex-col">
          <a
            href="#"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            {usuario.nombre}
          </a>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Activo</span>
          </div>
        </div>
      </div>

      {/* Botón de menú (aún sin funcionalidad real de dropdown) */}
      <div>
        <button className="text-gray-500 hover:text-gray-800 transition">
          <i className="fa-solid fa-ellipsis text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
