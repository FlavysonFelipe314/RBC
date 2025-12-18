"use client";

import Image from "next/image";
import { Bug, Target, Rat, Flame, Bird, Droplet } from "lucide-react";
import AnimatedSection from "./animated-section";
import WhatsAppButton from "./whatsapp-button";

const services = [
  {
    name: "Controle de Cupins",
    description: "O cupim não avisa: ele destrói sua casa por dentro, em silêncio. Nós eliminamos na raiz antes que o prejuízo seja irreversível.",
    image: "/service_cupim.png",
    icon: Flame
  },
  {
    name: "Controle de Baratas e Ratos",
    description: "Carregam centenas de bactérias e vírus. Uma ameaça invisível que coloca sua saúde em risco todos os dias. Além de prejuízos materiais, transmitem doenças graves como leptospirose. Não corra esse risco.",
    image: "/service_baratas_ratos.png",
    icon: Bug
  },
  {
    name: "Controle de Formigas",
    description: "Contaminam alimentos e espalham germes por toda a casa ou comércio, parecendo inofensivas mas perigosas.",
    image: "/service_formigas.png",
    icon: Target
  },
  {
    name: "Controle de Morcegos",
    description: "Fezes acumuladas causam fungos perigosos para o sistema respiratório. Removemos com segurança.",
    image: "/service_morcegos.png",
    icon: Bird
  },
  {
    name: "Controle de Pulgas e Carrapatos",
    description: "Afetam pets e humanos, causando alergias e doenças sérias. Proteja sua família e seus animais.",
    image: "/service_carrapatos_pulgas.png",
    icon: Bug
  },
  {
    name: "Higienização de Reservatórios de Água Potável",
    description: "Água contaminada é porta aberta para doenças. A limpeza e desinfecção periódica garantem a saúde de todos.",
    image: "/service_caixa_dagua.png",
    icon: Droplet
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Se você está incomodado com insetos ou pragas na sua casa ou empresa, a RBC Control traz a solução para você.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.name} delay={index * 0.1} direction="up">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="relative aspect-video bg-gray-200">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.4}>
          <WhatsAppButton text="Chamar no WhatsApp" size="lg" />
        </AnimatedSection>
      </div>
    </section>
  );
}
