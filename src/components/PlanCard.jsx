import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import RecargaModal from "./RecargaModal";

export default function PlanCard({ plan }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Card 
        className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 w-full mx-auto transition-all duration-300 ${
          isHovered ? 'scale-[1.03] shadow-xl' : 'scale-100'
        }`}
        shadow="md" // Reducido de "lg" a "md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="p-4 sm:p-5 md:p-6">
          {/* Badge destacado */}
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold ${
              plan.es_popular 
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'bg-gray-700/50 text-gray-300'
            }`}>
              {plan.es_popular ? '🔥 POPULAR' : '📞 BÁSICO'}
            </span>
            <Zap className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Título principal */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 gradient-text">
            {plan.titulo}
          </h3>

          {/* Precio */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-baseline">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{plan.precio}</span>
              <span className="text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base">CU</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">IVA incluido</p>
          </div>

          {/* Descripción */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {plan.descripcion}
            </p>
            
            {/* Beneficios */}
            <div className="space-y-1 sm:space-y-2">
              {plan.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-gray-300 text-xs sm:text-sm">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>
        </CardBody>

        <CardFooter className="pt-0 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
          <Button
            onPress={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-[1.02]"
            radius="lg"
            startContent={<Zap className="animate-pulse-slow w-4 h-4 sm:w-5 sm:h-5" />}
          >
            <span className="animate-pulse-slow">¡Recargar Ahora!</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Modal */}
      <RecargaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={plan}
      />
    </>
  );
}