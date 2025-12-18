"use client";

import { Shield, Users, MapPin, CheckCircle } from "lucide-react";
import AnimatedSection from "./animated-section";

const benefits = [
  {
    icon: CheckCircle,
    title: "Formas de Pagamento",
    description: "Aceitamos cartões de crédito, débito, Pix e espécie, oferecendo praticidade e flexibilidade para você."
  },
  {
    icon: Users,
    title: "Especialistas em Pragas",
    description: "Temos uma equipe qualificada e as melhores tecnologias para o controle eficiente das pragas."
  },
  {
    icon: MapPin,
    title: "Atendimento em todo o RJ",
    description: "Nossos profissionais estão prontos para atender chamados em toda a capital e interior do estado com agilidade."
  },
  {
    icon: Shield,
    title: "Produtos Seguros",
    description: "Utilizamos produtos de alta qualidade, certificados pelos órgãos competentes, para um controle eficaz das pragas"
  }
];

export default function BenefitsSection() {
  return (
    <section id="diferenciais" className="py-20 " style={{backgroundColor: '#007eaf'}}>
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Por que escolher a RBC Control?
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Garantimos um serviço de excelência, com a agilidade e a segurança que você precisa.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <AnimatedSection key={benefit.title} delay={index * 0.1} direction="up">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full group hover:-translate-y-2">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-rbc-blue transition-colors duration-300">
                    <Icon className="w-8 h-8 text-rbc-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
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
