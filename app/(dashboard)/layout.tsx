import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Orban Springs Dashboard',
    default: 'Orban Springs Dashboard',
  },
  description: 'Orban Springs website.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
      </html>
  )
}
