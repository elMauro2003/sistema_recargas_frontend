import { useEffect, useState } from "react";
import axios from "axios";
import PlanCard from "./PlanCard";
import { Loader2 } from "lucide-react";
import { PLANES_EJEMPLO } from "../utils/constants";

export default function PlanList() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // URL de API - CAMBIA ESTO
  const API_URL = "http://localhost:8000/api/planes/";

  // Esto hay que arreglarlo en caso de querer usar el componente
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        setLoading(true);
        
        // PARA PROBAR CON API REAL (descomentar):
        // const response = await axios.get(API_URL);
        // setPlanes(response.data);
        
        // DATOS DE EJEMPLO (elimina cuando tu API esté lista)
        setTimeout(() => {
          setPlanes(PLANES_EJEMPLO);
          setLoading(false);
        }, 800);

      } catch (err) {
        setError("Error al cargar los planes. Usando datos de ejemplo.");
        console.error("Error de API:", err);
        
        setPlanes(PLANES_EJEMPLO);
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={48} />
          <p className="text-gray-400">Cargando planes disponibles...</p>
          <p className="text-gray-500 text-sm mt-2">Conectando con el servidor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="gradient-text">Planes Disponibles</span>
        </h2>
        
        {error && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
            <p className="text-yellow-300">{error}</p>
            <p className="text-gray-400 text-sm mt-2">
              Para conectar con tu API Django, modifica <code>API_URL</code> en <code>PlanList.jsx</code>
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        
        {/* Nota para el desarrollador */}
        <div className="mt-12 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            💡 <strong>Para conectar con API Django:</strong> 
            <br />
            1. Modifica <code className="bg-gray-900 px-2 py-1 rounded">API_URL</code> en <code>PlanList.jsx</code>
            <br />
            2. Configura CORS en el backend Django
            <br />
            3. Asegúrate de que el endpoint devuelva datos en formato JSON
          </p>
        </div>
      </div>
    </div>
  );
}