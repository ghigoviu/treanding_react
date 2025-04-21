// src/App.jsx
import { useEffect, useState } from 'react';
import Producto from '../miniaturas/Producto';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.productos || []);
      })
      .catch((err) => {
        console.error('Error cargando productos:', err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <Producto key={producto.id} id={producto.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
