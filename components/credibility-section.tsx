"use client";

import { Award, Zap, Target, ShieldCheck } from "lucide-react";
import AnimatedSection from "./animated-section";

const credentials = [
  {
    title: "Excelência",
    description: "Mais de 13 anos de atuação no mercado, oferecendo serviços de controle de pragas com os mais altos padrões de qualidade.",
    icon: Award
  },
  {
    title: "Eficiência",
    description: "Utilizamos técnicas modernas e produtos certificados para garantir resultados rápidos e duradouros em todos os nossos serviços.",
    icon: Zap
  },
  {
    title: "Comprometimento",
    description: "Nossa equipe é treinada para atender com dedicação total, cumprindo prazos e superando expectativas em cada atendimento.",
    icon: Target
  },
  {
    title: "Segurança",
    description: "Produtos e procedimentos seguros garantem a proteção de sua família, pets e colaboradores durante todo o processo.",
    icon: ShieldCheck
  }
];

export default function CredibilitySection() {
  return (
    <section className="py-20 bg-[#007eaf]">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossa Garantia de Qualidade
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Valores que norteiam nossa atuação e garantem sua total satisfação
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={index * 0.1} direction="up">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2 border-2 border-transparent hover:border-rbc-blue">
                  <div className="bg-gradient-to-br from-rbc-blue to-rbc-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
