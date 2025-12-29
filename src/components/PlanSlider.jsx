import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import PlanCard from "./PlanCard";
import { PLANES_EJEMPLO } from "../utils/constants";
import { Button } from "@heroui/react";

export default function PlanSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [planes, setPlanes] = useState([]);
  
  // Número de items por página
  const itemsPerPage = 4;
  
  // Calcular total de páginas
  const totalPages = Math.ceil(planes.length / itemsPerPage);
  
  // Obtener planes para la página actual
  const startIndex = currentPage * itemsPerPage;
  const currentPlanes = planes.slice(startIndex, startIndex + itemsPerPage);

  const API_URL = "http://127.0.0.1:8000/api/planes/"; // Local

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        setLoading(true);
        //console.log("Conectando a API:", API_URL);
        
        const response = await axios.get(API_URL);
        //console.log("Respuesta API:", response.data);
        
        let datos;
        
        // Opción 1: Si es un objeto con propiedad "results" (paginación DRF)
        if (response.data && Array.isArray(response.data.results)) {
          datos = response.data.results;
        } 
        // Opción 2: Si es directamente un array
        else if (Array.isArray(response.data)) {
          datos = response.data;
        }
        // Opción 3: Si es otro formato
        else {
          //console.error("Formato de API desconocido:", response.data);
          throw new Error("Formato de API no válido");
        }
        
        // Transforma los datos
        const planesTransformados = datos.map(plan => ({
          id: plan.id || Math.random(),
          titulo: plan.titulo || "Sin título",
          descripcion: plan.descripcion || "",
          precio: plan.precio ? plan.precio.toString().replace('.00', '') : "0",
          beneficios: Array.isArray(plan.beneficios) ? plan.beneficios : [],
          esPopular: plan.es_popular || plan.esPopular || false
        }));
        
        setPlanes(planesTransformados);
        setLoading(false);
        
      } catch (err) {
        //console.error("Error de API:", err);
        //console.log("Usando datos de ejemplo como fallback");
        
        setPlanes(PLANES_EJEMPLO);
        setLoading(false);
      }
    };
    
    fetchPlanes();
  }, []);

  // Navegación
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Ir a página específica
  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando planes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con título y controles */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 px-4">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text flex items-center gap-3">
              <Sparkles className="text-yellow-400 animate-pulse" />
              Planes Destacados
              <Sparkles className="text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-gray-400 mt-2">
              Desliza para ver más opciones
            </p>
          </div>
          
          {/* Contador de páginas */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === index
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Botones de navegación */}
            <div className="flex gap-3">
              <Button
                onPress={prevPage}
                isDisabled={currentPage === 0}
                className="min-w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                radius="full"
                startContent={<ChevronLeft className="w-5 h-5" />}
                isIconOnly
              />
              
              <Button
                onPress={nextPage}
                isDisabled={currentPage === totalPages - 1}
                className="min-w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                radius="full"
                startContent={<ChevronRight className="w-5 h-5" />}
                isIconOnly
              />
            </div>
          </div>
        </div>

        {/* Slider/Carrusel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 py-6"
            >
              {currentPlanes.map((plan) => (
                <div 
                  key={plan.id} 
                  className="h-full"
                  style={{ 
                    padding: '4px', 
                    margin: '-4px' 
                  }}
                >
                  <PlanCard plan={plan} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores y información */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-800 px-4">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, planes.length)} de {planes.length} planes
          </div>
          
          {/* Indicadores móvil */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 sm:hidden">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === index
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-125'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="text-cyan-300 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
              Página {currentPage + 1} de {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}