"use client";

import { Star, Quote } from "lucide-react";
import AnimatedSection from "./animated-section";

const testimonials = [
  {
    name: "Maria S.",
    location: "Copacabana, RJ",
    text: "Serviço impecável! A equipe foi pontual, profissional e resolveu meu problema com baratas em um dia. Recomendo demais!"
  },
  {
    name: "Condomínio Sol Nascente",
    location: "Barra da Tijuca, RJ",
    text: "Contratamos a RBC para o controle mensal de pragas e estamos muito satisfeitos. Sempre eficientes e com ótimo atendimento."
  },
  {
    name: "João P.",
    location: "Niterói, RJ",
    text: "Tinha um problema sério de cupins e eles resolveram de forma definitiva. O preço foi justo e o serviço excelente."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A Confiança de Quem Já Escolheu a RBC Control
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            +13 anos de experiência e milhares de clientes satisfeitos em todo o Rio de Janeiro.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mt-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">Serviço 100% Garantido</span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.15} direction="up">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full group hover:-translate-y-2">
                <Quote className="w-10 h-10 text-rbc-blue mb-4" />
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
