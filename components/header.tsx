"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import WhatsAppButton from "./whatsapp-button";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Quem Somos", href: "#apresentacao" },
  { name: "Benefícios", href: "#diferenciais" },
  { name: "Serviços", href: "#servicos" },
  { name: "Setores", href: "#setores" },
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "Dúvidas", href: "#duvidas" },
  { name: "Contato", href: "#contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#111827]/95 backdrop-blur-sm shadow-md"
          : "bg-[#111827]"
      }`}
    >
      <div className="custom-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-48 h-20 md:w-56 md:h-24">
              <Image
                  src="/logo.png"
                  width={150}
                  height={150}
                  alt="RBC Control Logo"
                  priority
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "-29px",
                    right: 0,
                    bottom: 0
                  }}
                />
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-rbc-blue ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <WhatsAppButton size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="custom-container py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-rbc-blue font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <WhatsAppButton size="sm" className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
