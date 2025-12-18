"use client";

import { ClipboardCheck, Sparkles, ShieldCheck } from "lucide-react";
import AnimatedSection from "./animated-section";

const steps = [
  {
    number: "1",
    title: "Diagnóstico Imediato",
    description: "Você entra em contato, descreve o problema e nós fornecemos um diagnóstico. Caso necessário, será enviado uma equipe técnica sem custo!",
    icon: ClipboardCheck
  },
  {
    number: "2",
    title: "Aplicação Segura",
    description: "Com o diagnóstico feito, nossa equipe vai até o local e realiza a aplicação segura dos produtos, com equipamentos adequados.",
    icon: Sparkles
  },
  {
    number: "3",
    title: "Garantia Total",
    description: "Após o serviço, você recebe a garantia. Se as pragas voltarem no período, nós retornamos sem custo.",
    icon: ShieldCheck
  }
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Veja Como é Simples se Livrar das Pragas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nosso processo foi desenhado para ser rápido, eficiente e sem complicações para você.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.number} delay={index * 0.2} direction="up">
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2 border-2 border-transparent hover:border-rbc-blue">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="bg-rbc-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {step.number}
                      </div>
                      <Icon className="w-12 h-12 text-rbc-blue flex-shrink-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
