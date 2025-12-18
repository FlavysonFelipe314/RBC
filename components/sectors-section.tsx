"use client";

import Image from "next/image";
import { Home, School, Building2, Store } from "lucide-react";
import AnimatedSection from "./animated-section";

const sectors = [
  {
    name: "Residências",
    image: "/sector_residencias.png",
    icon: Home
  },
  {
    name: "Escolas",
    image: "/sector_escolas.png",
    icon: School
  },
  {
    name: "Condomínios",
    image: "/sector_condominios.png",
    icon: Building2
  },
  {
    name: "Comércio",
    image: "/sector_comercio.png",
    icon: Store
  }
];

export default function SectorsSection() {
  return (
    <section id="setores" className="py-20 relative" style={{backgroundColor:"#007eaf"}}>
      <div className="custom-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 px-4 relative z-20">
            Atendemos Residências e Empresas
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto px-4 relative z-20">
            Estamos preparados para atender residências, pequenos comércios e grandes empresas com certificação e regularidade.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <AnimatedSection key={sector.name} delay={index * 0.1} direction="up">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="relative aspect-square bg-gray-200">
                    <Image
                      src={sector.image}
                      alt={sector.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Icon className="w-10 h-10 text-white mb-2" />
                      <h3 className="text-2xl font-bold text-white">
                        {sector.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
