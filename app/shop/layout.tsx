import type { ReactNode } from 'react'

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Cafe-specific fonts required by the shop UI */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Caveat:wght@400;700&family=Gaegu:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      {/* Material Icons Outlined (used throughout the shop template) */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
