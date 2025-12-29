import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:py-10 md:py-12 lg:py-16 sm:px-6 lg:px-8">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            ⚡ Recargas Instantáneas
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
          style={{ lineHeight: '1.2' }}
        >
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Recarga Tu
          </span>
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Energía Móvil
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-2"
        >
          Los mejores planes de recarga con <span className="font-bold text-cyan-300">cobertura nacional</span> y 
          <span className="font-bold text-purple-300"> activación inmediata</span>
        </motion.p>

        {/* Elementos decorativos */}
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
          {['📱', '⚡', '💎', '🎯'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-2xl sm:text-3xl"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}