"use client";

import Image from "next/image";
import { Shield } from "lucide-react";
import AnimatedSection from "./animated-section";
import WhatsAppButton from "./whatsapp-button";

export default function PresentationSection() {
  return (
    <section id="apresentacao" className="py-20 bg-white">
      <div className="custom-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/equipe.png"
                alt="Equipe RBC Control"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-rbc-blue px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">+13 Anos de Experiência</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sobre a RBC Control
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Na RBC Control, nosso objetivo é simples: resolver de forma eficiente o problema que está tirando a sua paz. Cupins, baratas, ratos ou qualquer outra praga não são apenas incômodos — eles colocam em risco a saúde, o patrimônio e a rotina de quem você ama.
              </p>

              <WhatsAppButton text="Chamar no WhatsApp" size="md" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
