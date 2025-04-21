/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import { KeenIcon } from "@/components/keenicons";

const Producto = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const toggleReaccion = (tipo) => {
    setReacciones((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };
  const [reacciones, setReacciones] = useState({
    like: false,
    bookmark: false,
    share: false,
  });

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.productos.find((p) => p.id === id);
        setProducto(found || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (!producto)
    return (
      <h2 className="text-red-500 font-semibold">Producto no encontrado</h2>
    );

  const handleCensura = (permitir) => {
    if (permitir) {
      setMostrarContenido(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <CardHeader id={producto.vendedor} />

      <div className="relative">
        <div
          className={`relative overflow-hidden ${producto.requiere_edad && !mostrarContenido ? "blur-md" : ""}`}
        >
          <img
            src={`/media/${producto.img_portada}`}
            alt="Producto"
            className="w-full h-[200px] object-cover transition duration-300"
          />
        </div>

        {/* 🔞 Capa de Censura */}
        {producto.requiere_edad && !mostrarContenido ? (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-center p-4 z-10">
            <p className="text-sm text-center font-medium mb-4 leading-snug">
              Este contenido está destinado únicamente a públicos específicos.
              <br />
              Debes tener 21 años de edad o más para ver este contenido.
            </p>
            <div className="flex gap-3">
              <button
                className="bg-white text-black px-3 py-1 text-sm font-medium rounded hover:bg-gray-200"
                onClick={() => handleCensura(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded hover:bg-blue-700"
                onClick={() => handleCensura(true)}
              >
                Tengo 21 años o más
              </button>
            </div>
          </div>
        ) : null}

        {/* ⭐ Rating */}
        <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-bl-lg flex items-center gap-1">
          <i className="fab fa-42-group text-yellow-400"></i>
          <span className="font-bold">{Number(producto.rate).toFixed(1)}</span>
        </div>

        {/* ❤️ Reactions */}
        <div className="absolute bottom-3 right-3 flex space-x-3 z-20">
          <button onClick={() => toggleReaccion("like")}>
            <KeenIcon
              icon="heart"
              className={`me-0.5 transition ${
                reacciones.like ? "text-blue-500" : "text-gray-400"
              }`}
            ></KeenIcon>
          </button>
          <button onClick={() => toggleReaccion("bookmark")}>
            <KeenIcon
              icon="bookmark"
              className={`me-0.5 transition ${
                reacciones.bookmark ? "text-blue-500" : "text-gray-400"
              }`}
            ></KeenIcon>
          </button>
          <button onClick={() => toggleReaccion("share")}>
            <KeenIcon
              icon="mouse-circle"
              className={`me-0.5 transition ${
                reacciones.share ? "text-blue-500" : "text-gray-400"
              }`}
            ></KeenIcon>
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <a
          href="./detalle_producto.php"
          className="block text-gray-900 font-semibold text-base hover:text-blue-600"
        >
          {producto.nombre}
        </a>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-800 font-bold text-lg">
            ${producto.precio}
          </span>
          <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Producto;
