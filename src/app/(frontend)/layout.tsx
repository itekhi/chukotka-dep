import React from 'react'
import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  // twitter: {
  //   card: 'summary_large_image',
  //   creator: '@payloadcms',
  // },
}

export const viewport: Viewport = {
  themeColor: '#1C5A96',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()

  return (
    <html className={cn()} lang="ru">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="48x48" />

        <meta name="apple-mobile-web-app-title" content="Chukotka" />
      </head>

      <body>
        <AdminBar adminBarProps={{ preview: isDraft }} />

        <Header />
        {children}
        <Footer />

        <div id="__portals" />
      </body>
    </html>
  )
}
