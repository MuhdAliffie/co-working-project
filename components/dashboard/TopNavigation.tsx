'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useTheme } from '../../hooks/useTheme'

export type NavItem = {
  label: string
  href: string
  isActive?: boolean
}

const activeClasses =
  'text-slate-900 dark:text-white border-b-2 border-emerald-400 pb-1 font-semibold'
const inactiveClasses = 'text-slate-500 hover:text-emerald-400 transition-colors'

const TopNavigation: FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/40 bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl px-4 md:px-10 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-emerald-400 p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-950 text-xl font-bold">eco</span>
            </div>
            <p className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Cloudsy
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm ${item.isActive ? activeClasses : inactiveClasses}`.trim()}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search passes..."
              className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900/60 border border-transparent rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 w-64 transition-all"
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-950" />
          </button>
          <div className="h-9 w-9 rounded-full bg-emerald-300/30 border-2 border-emerald-400 overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmLYfELESEgupC9WoKxSliAkkZdWEdXA1EddW9mzWP_AP97N85jIr2OHKs5vmwPSAFhSfWX4ju9nOeb5ONgZIKgvly7YL-mbYoiQzbtGLX3ius1D1FxjU84WC0g-4Agi6uAXTMf5eLOjA9vI_pJlUHcfHB7Ogza7dsQk9uIiyEirFDQeIgmyuqMv_8YYYIbGNEi-MxmeAOH9VywpTJ6z-M5bj9Mcj3tgJu-8_iashO0H_bcS-iL8p-IackoAGqYPCe0k2HA4dQGJju"
              alt="User avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavigation
