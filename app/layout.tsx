import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MSWDKZKJ');`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16760249128"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16760249128');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MSWDKZKJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
