const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export', // Static export para hospedagem compartilhada
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true, // Necessário para static export
  },
  // Desabilitar recursos que não funcionam com static export
  trailingSlash: true, // Adiciona barra no final das URLs
};

module.exports = nextConfig;
