"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, MapPin } from "lucide-react";
import WhatsAppButton from "./whatsapp-button";

const slides = [
  {
    title: "Proteja quem você ama com dedetização segura e eficaz.",
    subtitle: "Devolvemos a tranquilidade que sua casa e sua família merecem.",
    image: "/hero_1.png",
    // mobileImage não existe aqui, e tudo bem
  },
  {
    title: "Controle as pragas e garanta a segurança do seu negócio.",
    subtitle: "Serviço profissional e eficiente para manter sua empresa protegida.",
    image: "/hero_2.png",
    mobileImage: "/hero_2_mobile.png" // Imagem específica para celular
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // 1. Extraímos os dados do slide atual para uma variável segura
  const activeSlide = slides[currentSlide];
  
  // 2. Verificamos se existe imagem mobile. Se não existir, a variável será undefined/null
  const mobileImageSrc = activeSlide?.mobileImage;
  const hasMobileImage = !!mobileImageSrc;

  return (
    <div className="relative h-screen w-full max-w-full overflow-hidden">
      {/* Background Images - Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full max-w-full">
            
            {/* VERSÃO DESKTOP (Padrão) */}
            {/* Se tiver imagem mobile, escondemos esta versão em telas <= 500px */}
            <div className={`relative w-full h-full ${hasMobileImage ? 'hidden min-[501px]:block' : 'block'}`}>
                <Image
                // Usamos o operador ?? '' para garantir que nunca seja undefined, embora a lógica do array garanta que image existe
                src={activeSlide?.image ?? ''} 
                alt={activeSlide?.title ?? ''}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                />
            </div>

            {/* VERSÃO MOBILE (<= 500px) */}
            {/* A renderização condicional verifica 'mobileImageSrc'. Se for verdadeiro, renderiza o Image */}
            {mobileImageSrc && (
                <div className="relative w-full h-full block min-[501px]:hidden">
                    <Image
                    src={mobileImageSrc} // Aqui o TypeScript sabe que é uma string válida
                    alt={activeSlide?.title ?? ''}
                    fill
                    className="object-cover" 
                    priority
                    sizes="100vw"
                    />
                </div>
            )}

            <div className="gradient-overlay" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center pt-12">
        <div className="custom-container w-full">
          <div className="max-w-3xl">
            {/* Animated Headlines */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {activeSlide?.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {activeSlide?.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Fixed CTA and Badges */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <WhatsAppButton text="Solicitar Orçamento Grátis Agora" size="lg" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Cobrimos seu Orçamento (Sujeito a Análise)</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Atendimento em todo o RJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}