import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import PlanSlider from "./components/PlanSlider";
import { Github, MessageCircle, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from "@heroui/react";

function App() {
  const [count, setCount] = useState(0);

  const mensaje = encodeURIComponent(
    `¡Hola!\n` +
    `He visto su trabajo y estoy interesado en sus servicios.` +
    `Por favor, escríbame para darle detalles.`
  );
  
  const socialLinks = {
    github: "https://github.com/elMauro2003",
    whatsapp: `https://wa.me/58521602?text=${mensaje}`, 
    email: "mauricioavalo@protonmail.com", 
    linkedin: "https://linkedin.com/in/mauricio-ag-dev"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
      <Header />
      <main>
        <PlanSlider />
      </main>
      
      <footer className="py-8 px-4 text-center text-gray-500 text-sm border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto">
          {/* <p className="mt-2">
            <span className="text-gray-400">Desarrollado con </span>
            <span className="text-red-400">❤</span>
            <span className="text-gray-400"> usando React, Vite, Tailwind CSS y HeroUI</span>
          </p> */}
          
          {/* BOTONERA ANIMADA */}
          <div className="mt-6 flex justify-center gap-4">
            {/* Botón GitHub */}
            <Button
              as="a"
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20"
              isIconOnly
              radius="full"
              size="lg"
            >
              <div className="relative flex items-center justify-center">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {/* Efecto de brillo al pasar el mouse */}
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 blur-sm transition-all duration-300"></div>
              </div>
            </Button>
            
            {/* Botón WhatsApp */}
            <Button
              as="a"
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 animate-pulse-slow"
              isIconOnly
              radius="full"
              size="lg"
            >
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {/* Anillo animado */}
                <div className="absolute inset-0 rounded-full border-2 border-green-400/30 group-hover:border-green-400/60 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </Button>
            
            {/* Botón Email (Gmail/Proton) */}
            <Button
              as="a"
              href={socialLinks.email}
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20"
              isIconOnly
              radius="full"
              size="lg"
            >
              <div className="relative flex items-center justify-center">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {/* Efecto de chispa */}
                <div className="absolute inset-0 rounded-full bg-red-300/0 group-hover:bg-red-300/10 blur-sm transition-all duration-500"></div>
                {/* Puntitos animados */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              </div>
            </Button>
            
            {/* Botón LinkedIn */}
            <Button
              as="a"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              isIconOnly
              radius="full"
              size="lg"
            >
              <div className="relative flex items-center justify-center">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {/* Efecto de pulso sutil */}
                <div className="absolute inset-0 rounded-full bg-blue-400/0 group-hover:bg-blue-400/20 blur-sm transition-all duration-500"></div>
              </div>
            </Button>
          </div>
          
          {/* Texto adicional para indicar que son enlaces */}
          <div className="mt-4 text-gray-500 text-xs">
            <p className="flex items-center justify-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Conéctate conmigo en mis redes
            </p>
          </div>
          
          <p className="mt-5 text-gray-400">© {new Date().getFullYear()} Mauricio Avalo - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}

export default App