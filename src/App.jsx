import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import PlanSlider from "./components/PlanSlider";
import PlanCarousel from './components/PlanCarousel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
      <Header />
      <main>
        <PlanSlider />
      </main>
      
      <footer className="py-8 px-4 text-center text-gray-500 text-sm border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Recargas Móviles - Todos los derechos reservados</p>
          <p className="mt-2">
            <span className="text-gray-400">Desarrollado con </span>
            <span className="text-red-400">❤</span>
            <span className="text-gray-400"> usando React, Vite, Tailwind CSS y HeroUI</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <span className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              ⚡ Instantáneo
            </span>
            <span className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              🔒 Seguro
            </span>
            <span className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              📱 Responsive
            </span>
            <span className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              🎯 Slider Interactivo
            </span>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
