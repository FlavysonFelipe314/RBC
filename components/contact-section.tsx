"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import AnimatedSection from "./animated-section";
import WhatsAppButton from "./whatsapp-button";

export default function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-white">
      <div className="custom-container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fale Conosco
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos localizados em Nova Iguaçu e atendemos todo o Rio de Janeiro. Entre em contato para um orçamento sem compromisso!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Informações de Contato */}
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nossa Localização
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-rbc-blue p-3 rounded-full flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Endereço</h4>
                      <p className="text-gray-600">
                        Estrada Gov. Leonel Brizola, Nova Iguaçu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 p-3 rounded-full flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                      <p className="text-gray-600">
                        (21) 98618-8209
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-rbc-blue p-3 rounded-full flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Atendimento</h4>
                      <p className="text-gray-600">
                        Seg-Sáb, 8h às 18h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <WhatsAppButton text="Fale Conosco no WhatsApp" size="lg" className="w-full" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mapa */}
          <AnimatedSection direction="right">
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.0!2d-43.45!3d-22.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzAwLjAiUyA0M8KwMjcnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização RBC Control - Estrada Gov. Leonel Brizola, Nova Iguaçu"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
