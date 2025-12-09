import type { Metadata } from 'next'
import { barlow_semi_sondensed } from '@/app/ui/fonts'
import '../globals.css'

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
      <body className={barlow_semi_sondensed.className}>
      <div className='w-full'>{children}</div>
      </body>
      </html>
  )
}
