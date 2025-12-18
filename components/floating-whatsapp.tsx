'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappNumber = '5521986188209';
  const message = 'Olá! Gostaria de solicitar um orçamento.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Mostrar o botão após 1 segundo
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Esconder o tooltip após 5 segundos
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex items-center gap-2 bg-white shadow-xl rounded-xl px-4 py-3 max-w-xs relative"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Precisa de ajuda?
                  </p>
                  <p className="text-xs text-gray-600">
                    Fale conosco no WhatsApp!
                  </p>
                </div>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Fechar tooltip"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* Seta apontando para o botão */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão Principal */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Fale conosco no WhatsApp"
          >
            {/* Efeito de pulso */}
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Botão */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-green-500/50">
              <MessageCircle className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
              
              {/* Badge de notificação */}
              <motion.div
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                1
              </motion.div>
            </div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
