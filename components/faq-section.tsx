"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "./animated-section";
import WhatsAppButton from "./whatsapp-button";

const faqs = [
  {
    question: "Quanto tempo leva para dedetizar um ambiente?",
    answer: "O tempo varia conforme o tamanho do local e o tipo de praga. Em média, um apartamento leva de 30 a 60 minutos, enquanto casas maiores podem levar algumas horas."
  },
  {
    question: "O serviço é seguro para crianças e animais de estimação?",
    answer: "Sim! Contamos com uma equipe capacitada que orienta o cliente em todas as etapas prévias à execução do serviço."
  },
  {
    question: "Em quanto tempo posso voltar ao ambiente?",
    answer: "A recomendação geral é aguardar de 4 a 6 horas após a aplicação. Nossa equipe técnica fornecerá todas as orientações de segurança específicas para o seu caso."
  },
  {
    question: "Vocês atendem em todo o estado do Rio de Janeiro?",
    answer: "Sim, nossa matriz fica em Nova Iguaçu, mas possuímos equipes estratégicas para atender com agilidade toda a capital, região metropolitana e interior do estado."
  },
  {
    question: "O que acontece se o problema voltar?",
    answer: "Nossos serviços possuem um período de garantia. Se a infestação retornar dentro desse prazo, nós voltamos ao local para realizar uma nova aplicação sem nenhum custo adicional para você."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="duvidas" className="py-20 bg-[#007eaf]">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tire Suas Dúvidas
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Respostas para as perguntas mais comuns sobre nossos serviços.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="up">
              <div className="mb-4">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full bg-white rounded-lg shadow-md hover:shadow-lg p-6 text-left transition-all duration-300 border-2 border-transparent hover:border-rbc-blue"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-rbc-blue flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openIndex === index && (
                    <p className="text-gray-600 mt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.5}>
          <p className="text-lg text-white mb-6">Ainda com dúvidas?</p>
          <WhatsAppButton text="Chamar no WhatsApp" size="lg" />
        </AnimatedSection>
      </div>
    </section>
  );
}
