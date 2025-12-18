"use client";

import { Shield, Clock, Award } from "lucide-react";
import AnimatedSection from "./animated-section";
import WhatsAppButton from "./whatsapp-button";

export default function CTASection() {
  return (
    <section id="contato" className="py-20 bg-[#007eaf] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="https://static.vecteezy.com/system/resources/previews/021/611/781/non_2x/template-with-a-colorful-blue-gradient-triangular-pattern-on-each-corner-position-with-a-space-modern-white-geometric-background-for-business-or-corporate-presentation-illustration-free-vector.jpg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="custom-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Proteja Sua Casa ou Empresa Hoje Mesmo
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Não deixe que pragas se multipliquem e tragam prejuízos. Garanta sua dedetização com a RBC Control: Atendimento especializado com profissionais altamente qualificados.
          </p>
        </AnimatedSection>

        <AnimatedSection className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12" delay={0.2}>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">100% Garantido</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <Clock className="w-6 h-6" />
            <span className="font-semibold">Atendimento Rápido</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <Award className="w-6 h-6" />
            <span className="font-semibold">+13 Anos</span>
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center" delay={0.3}>
          <WhatsAppButton 
            text="Solicitar Orçamento Grátis" 
            size="lg" 
            className="!bg-white !text-green-600 hover:!bg-gray-100 text-xl px-12 py-5"
          />
          <p className="text-white/80 mt-6 text-sm">
            WhatsApp: (21) 98618-8209 | Atendimento: Seg-Sáb, 8h às 18h
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
