import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        lexend.className, 'antialiased min-h-screen pt-20'
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
