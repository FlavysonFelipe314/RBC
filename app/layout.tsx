import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RBC Control - Dedetização Profissional RJ | Controle de Pragas',
  description: 'Dedetização eficiente para sua casa ou empresa. +13 anos de experiência. Atendimento em todo o Rio de Janeiro. Cobrimos seu orçamento.',
  keywords: 'dedetização, controle de pragas, dedetização rj, cupins, baratas, ratos, dedetizadora rio de janeiro',
  openGraph: {
    title: 'RBC Control - Dedetização Profissional RJ',
    description: 'Dedetização eficiente para sua casa ou empresa no Rio de Janeiro',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
