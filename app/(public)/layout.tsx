import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import NavBar from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orban Springs',
  description: 'Orban Springs website',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
      {children}
      <Footer />
      </body>
    </html>
  )
}
