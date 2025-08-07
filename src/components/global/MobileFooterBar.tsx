'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Wallet, WavesLadder, BriefcaseBusiness, ChartCandlestick } from 'lucide-react'


const MobileFooterBar = () => {
  const pathname = usePathname()

  const routes = [
    { href: '/dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/wallet', title: 'Wallet', icon: <Wallet size={20} /> },
    { href: '/portfolio', title: 'Portfolio', icon: <BriefcaseBusiness size={20} /> },
    { href: '/pools', title: 'Pools', icon: <WavesLadder size={20} /> },
    { href: '/tradings', title: 'Tradings', icon: <ChartCandlestick size={20} /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 lg:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex flex-col items-center justify-center text-sm ${pathname === route.href
              ? 'text-primary'
              : 'text-zinc-500 dark:text-zinc-400'
              }`}
          >
            {route.icon}
            <span className="text-xs">{route.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileFooterBar