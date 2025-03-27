// src/app/layout.tsx
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import Script from 'next/script'

// Load Inter for UI elements
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Load JetBrains Mono for code and technical content
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Data Engineering Agents',
  description: 'AI-powered data engineering agents workflow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script for theme initialization - prevents flash */}
        <script 
          dangerouslySetInnerHTML={{ 
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                const isDark = theme === 'dark';
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.toggle('dark', isDark || (!theme && systemPrefersDark));
              })();
            `
          }} 
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background antialiased',
        inter.variable,
        jetbrainsMono.variable
      )}>
        {children}
      </body>
    </html>
  )
}