import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Alert } from "@heroui/react";
import { Phone, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { WHATSAPP_CONFIG } from "../utils/constants";

export default function RecargaModal({ isOpen, onClose, plan }) {
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validar número en tiempo real
  useEffect(() => {
    const numeroLimpio = telefono.replace(/\D/g, '');
    
    if (numeroLimpio.length === 10) {
      setIsValid(true);
      setError("");
    } else if (telefono.length > 0) {
      setIsValid(false);
      if (numeroLimpio.length > 10) {
        setError("El número debe tener máximo 8 dígitos");
      } else if (numeroLimpio.length < 10 && numeroLimpio.length > 0) {
        setError(`Faltan ${10 - numeroLimpio.length} dígitos`);
      } else {
        setError("");
      }
    } else {
      setIsValid(false);
      setError("");
    }
  }, [telefono]);

  const handleConfirmar = () => {
    const numeroLimpio = telefono.replace(/\D/g, '');
    
    if (!isValid) {
      setError("Por favor, ingresa un número de teléfono válido (8 dígitos)");
      return;
    }

    setIsLoading(true);
    
    // Simular procesamiento (puedes quitar este timeout)
    setTimeout(() => {
      // Crear mensaje para WhatsApp
      const mensaje = encodeURIComponent(
        `${WHATSAPP_CONFIG.mensajeBase}` +
        `📱 *${plan.titulo}*\n` +
        `💵 Precio: ${plan.precio} CU\n` +
        `📞 Número a recargar: ${numeroLimpio}\n` +
        `---\n` +
        `Por favor, procesa mi recarga.`
      );

      // Abrir WhatsApp
      window.open(`https://wa.me/${WHATSAPP_CONFIG.numero}?text=${mensaje}`, "_blank");
      
      // Mostrar éxito
      setShowSuccess(true);
      setIsLoading(false);
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setTelefono("");
      }, 2000);
    }, 800);
  };

  const handleClose = () => {
    setTelefono("");
    setError("");
    setIsValid(false);
    setShowSuccess(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="md"
      backdrop="blur"
      className="bg-gradient-to-br from-gray-800 to-gray-900"
      hideCloseButton={isLoading} // No permitir cerrar mientras carga
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold gradient-text">Confirmar Recarga</h2>
              <p className="text-gray-300">Completa los datos para proceder</p>
            </ModalHeader>
            
            <ModalBody>
              {/* Mostrar éxito si la recarga se procesó */}
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">¡Recarga enviada!</h3>
                  <p className="text-gray-300">
                    Se ha abierto WhatsApp con los datos de tu recarga.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Cerrándose automáticamente...
                  </p>
                </div>
              ) : (
                <>
                  {/* Información del plan */}
                  <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                    <p className="text-sm text-gray-300">
                      Estás a punto de adquirir: 
                      <span className="block text-lg font-bold text-cyan-300 mt-1">{plan.titulo}</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Precio: <span className="font-bold text-white">{plan.precio} CU</span>
                    </p>
                  </div>

                  {/* Mensaje explicativo */}
                  <p className="text-gray-300 mb-4">
                    Ingresa el número de teléfono al que quieres aplicar la recarga. 
                    La activación es <span className="font-bold text-green-400">inmediata</span>.
                  </p>

                  {/* Input sin autofocus */}
                  <Input
                    label="Número de Teléfono"
                    placeholder="Ej: 58215321"
                    value={telefono}
                    onValueChange={setTelefono}
                    startContent={<Phone className="text-gray-400" size={20} />}
                    className="mb-3"
                    variant="bordered"
                    color={error ? "danger" : isValid ? "success" : "primary"}
                    description="Ingresa los 8 dígitos sin espacios ni guiones"
                    isInvalid={!!error}
                    errorMessage={error}
                    endContent={
                      isValid ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : null
                    }
                  />

                  {/* Indicador visual de validación */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <span className={`text-sm ${isValid ? 'text-green-400' : 'text-gray-400'}`}>
                      {isValid ? '✓ Número válido' : 'Esperando número de 8 dígitos'}
                    </span>
                  </div>

                  {/* Ejemplos de formato */}
                  {/* <div className="text-xs text-gray-500 bg-gray-800/50 p-3 rounded-lg">
                    <p className="font-semibold mb-1">Formato correcto:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-green-400">5512345678</span>
                      <span className="text-green-400">8112345678</span>
                      <span className="text-amber-400">55-1234-5678</span>
                      <span className="text-amber-400">55 1234 5678</span>
                    </div>
                  </div> */}
                </>
              )}
            </ModalBody>
            
            <ModalFooter>
              {!showSuccess && (
                <>
                  <Button 
                    color="danger" 
                    variant="light" 
                    onPress={handleClose}
                    isDisabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onPress={handleConfirmar}
                    isLoading={isLoading}
                    isDisabled={!isValid || isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    startContent={!isLoading && <Send size={20} />}
                  >
                    {isLoading ? "Procesando..." : "Enviar por WhatsApp"}
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}