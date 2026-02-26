import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: "Cloudsy - Malaysia's First Productivity Studio",
  description: 'A space where working smarter and focusing deeper is the new way to succeed.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=Nunito:wght@400;600;700;800&family=Patrick+Hand&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${dmSerif.variable} antialiased font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
