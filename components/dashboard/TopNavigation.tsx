'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useTheme } from '../../hooks/useTheme'

export type NavItem = {
  label: string
  href: string
  isActive?: boolean
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const TopNavigation: FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full bg-cloud-cream/90 backdrop-blur-sm px-6 md:px-10 py-4 border-b-2 border-dashed border-cloud-green">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-cloud-green p-2 wavy-border shadow-sm">
              <span
                className="material-symbols-outlined text-cloud-dark-green text-2xl"
                style={{ fontVariationSettings: ICON_VAR }}
              >
                filter_drama
              </span>
            </div>
            <h1 className="text-2xl font-handwritten font-bold tracking-tight text-cloud-dark-green">
              Cloudsy Dashboard
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-lg font-handwritten font-semibold transition-colors ${
                  item.isActive
                    ? 'text-cloud-dark-green font-bold underline decoration-wavy underline-offset-4'
                    : 'text-stone-500 hover:text-cloud-green'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Find a cloud..."
              className="pl-4 pr-10 py-2 bg-white border-2 border-cloud-green rounded-full text-sm font-handwritten focus:ring-2 focus:ring-cloud-green transition-all"
            />
            <span
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-cloud-green text-sm"
              style={{ fontVariationSettings: ICON_VAR }}
            >
              search
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="size-10 bg-white wavy-border flex items-center justify-center hover:rotate-6 transition-transform"
            aria-label="Toggle theme"
          >
            <span
              className="material-symbols-outlined text-cloud-dark-green text-xl"
              style={{ fontVariationSettings: ICON_VAR }}
            >
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="size-10 bg-white wavy-border flex items-center justify-center hover:rotate-3 transition-transform relative">
            <span
              className="material-symbols-outlined text-cloud-dark-green"
              style={{ fontVariationSettings: ICON_VAR }}
            >
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-white" />
          </button>
          <div className="h-11 w-11 wavy-border overflow-hidden rotate-3 bg-white p-0.5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmLYfELESEgupC9WoKxSliAkkZdWEdXA1EddW9mzWP_AP97N85jIr2OHKs5vmwPSAFhSfWX4ju9nOeb5ONgZIKgvly7YL-mbYoiQzbtGLX3ius1D1FxjU84WC0g-4Agi6uAXTMf5eLOjA9vI_pJlUHcfHB7Ogza7dsQk9uIiyEirFDQeIgmyuqMv_8YYYIbGNEi-MxmeAOH9VywpTJ6z-M5bj9Mcj3tgJu-8_iashO0H_bcS-iL8p-IackoAGqYPCe0k2HA4dQGJju"
              alt="User Avatar"
              width={44}
              height={44}
              className="object-cover rounded-sm w-full h-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavigation
