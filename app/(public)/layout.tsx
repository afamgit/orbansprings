import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import NavBar from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Orban Springs',
    default: 'Orban Springs',
  },
  description: 'Orban Springs website.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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
