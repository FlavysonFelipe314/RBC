"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppButton({ 
  text = "Chamar no WhatsApp", 
  size = "md",
  className = "" 
}: WhatsAppButtonProps) {
  const whatsappNumber = "5521986188209";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 btn-glow ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
    </motion.a>
  );
}
