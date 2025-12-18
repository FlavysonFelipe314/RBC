"use client";

import Image from "next/image";
import { MapPin, Phone, Clock, Shield } from "lucide-react";
import WhatsAppButton from "./whatsapp-button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="custom-container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="lg:col-span-2">
            <div className="relative w-40 h-16 mb-4">
              <Image
                src="/logo.png"
                alt="RBC Control Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Sua tranquilidade é nossa prioridade. Soluções completas em controle de pragas para o Rio de Janeiro.
            </p>
            <WhatsAppButton size="sm" />
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Estrada Gov. Leonel Brizola, Nova Iguaçu</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(21) 98618-8209</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span>Seg-Sáb, 8h às 18h</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-bold mb-4">Certificações</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span>INEA</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span>VIGILÂNCIA SANITÁRIA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© 2025 RBC Control. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
