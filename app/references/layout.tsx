'use client'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 lg:ml-64 transition-all duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8 md:py-12 md:ml-16 lg:ml-16 max-w-5xl">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
