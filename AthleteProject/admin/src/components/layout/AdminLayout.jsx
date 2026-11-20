import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-[#EDE4D7] text-[#191916]">
      {/* Top Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex flex-1 items-stretch">
        {/* Sidebar Navigation */}
        <Sidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
