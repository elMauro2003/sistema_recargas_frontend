import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import PlanCard from "./PlanCard";
import { PLANES_EJEMPLO } from "../utils/constants";
import { Button } from "@heroui/react";

export default function PlanCarousel() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [planes, setPlanes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch planes
  useEffect(() => {
    setTimeout(() => {
      setPlanes(PLANES_EJEMPLO);
    }, 800);
  }, []);

  // Navegación
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.querySelector('.carousel-item').offsetWidth + 32; // width + gap
    const scrollPosition = index * cardWidth;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, planes.length - 4);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  const firstSlide = () => {
    scrollToIndex(0);
  };

  const lastSlide = () => {
    const maxIndex = Math.max(0, planes.length - 4);
    scrollToIndex(maxIndex);
  };

  // Drag para móvil
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events para móvil
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              Desliza para Explorar
            </h2>
            <p className="text-gray-400">
              Arrastra o usa los botones para navegar
            </p>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Button
                onPress={firstSlide}
                isDisabled={currentIndex === 0}
                className="min-w-10 h-10 bg-gray-800 hover:bg-gray-700"
                radius="full"
                isIconOnly
                startContent={<ChevronsLeft className="w-4 h-4" />}
              />
              <Button
                onPress={prevSlide}
                isDisabled={currentIndex === 0}
                className="min-w-10 h-10 bg-gray-800 hover:bg-gray-700"
                radius="full"
                isIconOnly
                startContent={<ChevronLeft className="w-4 h-4" />}
              />
              <Button
                onPress={nextSlide}
                isDisabled={currentIndex >= planes.length - 4}
                className="min-w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600"
                radius="full"
                isIconOnly
                startContent={<ChevronRight className="w-4 h-4" />}
              />
              <Button
                onPress={lastSlide}
                isDisabled={currentIndex >= planes.length - 4}
                className="min-w-10 h-10 bg-gray-800 hover:bg-gray-700"
                radius="full"
                isIconOnly
                startContent={<ChevronsRight className="w-4 h-4" />}
              />
            </div>
            
            <div className="hidden md:block text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
              {currentIndex + 1}-{Math.min(currentIndex + 4, planes.length)} / {planes.length}
            </div>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 pb-6"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {planes.map((plan, index) => (
              <motion.div
                key={plan.id}
                className="carousel-item flex-shrink-0 w-[300px] md:w-[320px] lg:w-[340px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>

          {/* Efectos de desvanecimiento */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(planes.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index * 4)}
                className={`relative w-12 h-2 rounded-full transition-all duration-300 ${
                  currentIndex >= index * 4 && currentIndex < (index + 1) * 4
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {currentIndex >= index * 4 && currentIndex < (index + 1) * 4 && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            💡 <span className="text-cyan-300">Consejo:</span> 
            Puedes arrastrar el carrusel con el mouse o dedo para navegar
          </p>
        </div>
      </div>
    </div>
  );
}