import {prisma}from '@/scripts'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import {Faq} from '@/app/components/faq'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
};

export default async function Page() {
  const questions = await prisma.faqs.findMany()

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Help Center Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-xl mx-auto">
            Find answers to common questions about our smart water meters, billing, and services.
          </p>
        </div>
      </div>

      {/* Accordion and Search Area */}
      <div className="py-12">
        <Faq data={questions} />
      </div>

      <div className="border-t border-slate-200/60 bg-white">
        <BottomAppBannerHorizontal />
      </div>
    </div>
  );
}
