'use client'

import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type DBItem = {
  id: number
  name: string
  price: number
  description: string | null
  imageUrl: string | null
  isAvailable: boolean
}

type DBCategory = {
  id: number
  name: string
  slug: string
  menuItems: DBItem[]
}

type CartItem = {
  menuItemId: number
  name: string
  price: number
  quantity: number
  remark: string
  categorySlug: string
}

// ── Nav groups (maps template sidebar → DB category slugs) ───────────────────

const NAV_GROUPS = [
  { label: 'Specials',     icon: 'star_outline',        slugs: ['specials'] },
  { label: 'Pastries',     icon: 'bakery_dining',       slugs: ['pastries'] },
  { label: 'Matcha',       icon: 'emoji_food_beverage', slugs: ['matcha'] },
  { label: 'Starved',      icon: 'lunch_dining',        slugs: ['noodles', 'rice-bowls', 'sandwiches'] },
  { label: 'Finger Foods', icon: 'restaurant',          slugs: ['finger-foods'] },
  { label: 'Classics',     icon: 'coffee',              slugs: ['coffee', 'tea', 'others'] },
]

const categoryIcon = (slug: string): string => {
  if (['coffee', 'tea', 'matcha', 'others'].includes(slug)) return 'coffee'
  if (slug === 'specials') return 'star_outline'
  if (slug === 'pastries') return 'bakery_dining'
  if (slug === 'finger-foods') return 'restaurant'
  return 'lunch_dining'
}

// ── Primary colors ────────────────────────────────────────────────────────────

const PRIMARY = '#4a7c59'
const PRIMARY_CART = '#52835f'

// ── Component ─────────────────────────────────────────────────────────────────

export default function ShopClient({ categories }: { categories: DBCategory[] }) {
  const [activeGroup, setActiveGroup] = useState('Specials')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Resolve active nav group
  const navGroup = NAV_GROUPS.find((g) => g.label === activeGroup) ?? NAV_GROUPS[0]

  // Items for the active nav group, filtered by search
  const items = categories
    .filter((cat) => navGroup.slugs.includes(cat.slug))
    .flatMap((cat) => cat.menuItems.map((item) => ({ ...item, categorySlug: cat.slug })))
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  // ── Cart operations ──────────────────────────────────────────────────────────

  const addToCart = (item: DBItem & { categorySlug: string }) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItemId === item.id)
      if (existing) {
        return prev.map((c) =>
          c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        )
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          remark: '',
          categorySlug: item.categorySlug,
        },
      ]
    })
  }

  const removeFromCart = (menuItemId: number) =>
    setCart((prev) => prev.filter((c) => c.menuItemId !== menuItemId))

  const updateQty = (menuItemId: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((c) =>
          c.menuItemId === menuItemId ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c,
        )
        .filter((c) => c.quantity > 0),
    )

  const updateRemark = (menuItemId: number, remark: string) =>
    setCart((prev) => prev.map((c) => (c.menuItemId === menuItemId ? { ...c, remark } : c)))

  const clearCart = () => setCart([])

  // ── Totals ────────────────────────────────────────────────────────────────────

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0)

  const toggleDark = () => document.documentElement.classList.toggle('dark')

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="flex h-screen overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300"
      style={{ backgroundColor: '#fdfbf0', fontFamily: "'Gaegu', sans-serif" }}
    >
      {/* ── Left sidebar ───────────────────────────────────────────────────── */}
      <aside className="w-72 bg-white dark:bg-neutral-900 border-r flex flex-col p-6 h-full shop-scroll overflow-y-auto"
             style={{ borderColor: `${PRIMARY}33` }}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-20 h-20 mb-2 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="material-icons-outlined text-4xl">cloud</span>
          </div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "'Caveat', cursive", color: PRIMARY }}
          >
            cloudsy
          </h1>
          <p
            className="text-lg -mt-2"
            style={{ fontFamily: "'Caveat', cursive", color: `${PRIMARY}b3` }}
          >
            cafe &amp; co-work
          </p>
        </div>

        {/* Category nav */}
        <nav className="flex-1 space-y-2">
          {NAV_GROUPS.map((group) => {
            const isActive = activeGroup === group.label
            return (
              <button
                key={group.label}
                onClick={() => { setActiveGroup(group.label); setSearch('') }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-lg text-left"
                style={{
                  backgroundColor: isActive ? PRIMARY : 'transparent',
                  color: isActive ? 'white' : undefined,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = `${PRIMARY}1a` }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                <span className="material-icons-outlined">{group.icon}</span>
                {group.label}
              </button>
            )
          })}
        </nav>

        {/* Dark mode toggle */}
        <div className="mt-auto pt-6" style={{ borderTop: `1px solid ${PRIMARY}1a` }}>
          <button
            onClick={toggleDark}
            className="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 transition-all"
          >
            <span className="material-icons-outlined">dark_mode</span>
            Toggle Dark Mode
          </button>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8 relative shop-scroll" style={{ backgroundColor: '#fdfbf0' }}>
        {/* Decorative frame */}
        <div
          className="absolute inset-4 pointer-events-none rounded-3xl -z-10 opacity-30"
          style={{ border: `4px solid ${PRIMARY}33` }}
        />

        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2
              className="text-5xl mb-1"
              style={{ fontFamily: "'Caveat', cursive", color: PRIMARY }}
            >
              {navGroup.label === 'Specials' ? 'Our Specials'
                : navGroup.label === 'Starved' ? "I'm Starved"
                : navGroup.label === 'Classics' ? 'Classics'
                : navGroup.label}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 italic">
              {navGroup.label === 'Specials' && 'Limited time flavors, curated just for you'}
              {navGroup.label === 'Pastries' && 'Fresh from the oven every morning'}
              {navGroup.label === 'Matcha' && 'Japanese-inspired matcha & hojicha series'}
              {navGroup.label === 'Starved' && 'Proper meals to fuel your focus session'}
              {navGroup.label === 'Finger Foods' && 'Light bites & shareable snacks'}
              {navGroup.label === 'Classics' && 'Your everyday coffee, tea & more'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <span
                className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: PRIMARY }}
              >
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 rounded-full w-64 outline-none text-sm"
                style={{ border: `1px solid ${PRIMARY}33` }}
                placeholder="Search menu..."
              />
            </div>
            {/* Cart icon button */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-white p-2 rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="material-icons-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#fdfbf0] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Menu grid */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 opacity-40">
            <span className="material-icons-outlined text-6xl" style={{ color: PRIMARY }}>
              search_off
            </span>
            <p className="text-lg italic">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="hand-drawn-border bg-white dark:bg-neutral-800 p-6 shadow-sm hover:shadow-md transition-shadow group relative"
              >
                {/* Image / placeholder */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/20">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span
                      className="material-icons-outlined text-[80px]"
                      style={{ color: `${PRIMARY}4d` }}
                    >
                      {categoryIcon(item.categorySlug)}
                    </span>
                  )}
                  <div
                    className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 px-3 py-1 rounded-full text-sm font-bold"
                    style={{ fontFamily: "'Courier Prime', monospace", color: PRIMARY }}
                  >
                    RM {item.price}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col h-24">
                  <h3
                    className="text-xl uppercase font-bold tracking-tighter"
                    style={{ fontFamily: "'Courier Prime', monospace", color: PRIMARY }}
                  >
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm italic opacity-70 mb-auto">{item.description}</p>
                  )}
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <span className="material-icons-outlined text-sm">add</span>
                    Add to order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 text-center pb-10">
          <p
            className="text-2xl"
            style={{ fontFamily: "'Caveat', cursive", color: `${PRIMARY}66` }}
          >
            *images are strictly for illustration purposes*
          </p>
          <div className="mt-4 flex justify-center gap-6 opacity-40">
            <span className="material-icons-outlined">star</span>
            <span className="material-icons-outlined">auto_awesome</span>
            <span className="material-icons-outlined">cloud_queue</span>
          </div>
        </footer>
      </main>

      {/* ── Right mini-cart sidebar ─────────────────────────────────────────── */}
      <aside
        className="w-80 border-l flex flex-col p-6 h-full"
        style={{ backgroundColor: `${PRIMARY}0d`, borderColor: `${PRIMARY}1a` }}
      >
        <h3
          className="text-3xl mb-6"
          style={{ fontFamily: "'Caveat', cursive", color: PRIMARY }}
        >
          Your Order
        </h3>

        {/* Cart item list */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 shop-scroll">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 opacity-40">
              <span className="material-icons-outlined text-5xl" style={{ color: PRIMARY }}>
                shopping_cart
              </span>
              <p className="text-sm italic">Your order is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.menuItemId}
                className="flex items-center gap-3 bg-white dark:bg-neutral-800 p-3 rounded-2xl"
                style={{ border: `1px solid ${PRIMARY}0d` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: `${PRIMARY}1a` }}
                >
                  <span className="material-icons-outlined" style={{ color: PRIMARY }}>
                    {categoryIcon(item.categorySlug)}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p
                    className="text-sm truncate uppercase"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs opacity-50">×{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                  >
                    RM {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals + CTA */}
        <div className="mt-6 pt-6 space-y-3" style={{ borderTop: `1px solid ${PRIMARY}33` }}>
          <div className="flex justify-between" style={{ fontFamily: "'Courier Prime', monospace" }}>
            <span className="opacity-60">Subtotal</span>
            <span>RM {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between" style={{ fontFamily: "'Courier Prime', monospace" }}>
            <span className="opacity-60">Service Tax</span>
            <span>RM 0.00</span>
          </div>
          <div
            className="flex justify-between text-xl font-bold mt-2"
            style={{ fontFamily: "'Courier Prime', monospace", color: PRIMARY }}
          >
            <span>Total</span>
            <span>RM {subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => cart.length > 0 && setCartOpen(true)}
            disabled={cart.length === 0}
            className="w-full text-white py-4 rounded-2xl font-bold text-lg mt-4 hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: PRIMARY, boxShadow: `0 8px 20px ${PRIMARY}33` }}
          >
            Place Order
          </button>
        </div>
      </aside>

      {/* ── Decorative floating elements ────────────────────────────────────── */}
      <div className="fixed top-10 right-10 pointer-events-none opacity-10 -rotate-12">
        <span className="material-icons-outlined text-9xl" style={{ color: PRIMARY }}>cloud</span>
      </div>
      <div className="fixed bottom-20 left-80 pointer-events-none opacity-5 rotate-45">
        <span className="material-icons-outlined text-[120px]" style={{ color: PRIMARY }}>
          local_florist
        </span>
      </div>

      {/* ── Cart overlay ───────────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(253,251,240,0.75)' }}
            onClick={() => setCartOpen(false)}
          />

          {/* Cart panel wrapper */}
          <div className="relative z-10 w-full max-w-2xl mx-4 animate-cart-in">
            {/* Double-border decorative ring */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-10px',
                border: `2px solid ${PRIMARY_CART}4d`,
                borderRadius: '50px',
              }}
            />

            {/* Scrollable cart panel */}
            <div
              className="relative max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl p-10 shop-scroll"
              style={{
                backgroundColor: '#f9f8f0',
                border: `2px solid ${PRIMARY_CART}`,
              }}
            >

            {/* Cart header */}
            <div className="text-center mb-10">
              <span
                className="block -rotate-12 text-4xl font-bold"
                style={{ fontFamily: "'Caveat', cursive", color: PRIMARY_CART }}
              >
                my cart
              </span>
            </div>

            {/* Cart items */}
            <div className="space-y-12 mb-12">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 opacity-40 gap-3">
                  <span className="material-icons-outlined text-6xl" style={{ color: PRIMARY_CART }}>
                    shopping_cart
                  </span>
                  <p className="text-lg italic">Nothing here yet — go add something!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="flex flex-col md:flex-row gap-6 pb-8"
                    style={{ borderBottom: `1px dashed ${PRIMARY_CART}4d` }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full md:w-48 h-40 flex-shrink-0 rounded-3xl flex items-center justify-center p-4"
                      style={{ backgroundColor: '#f3f1e4' }}
                    >
                      <span
                        className="material-icons-outlined"
                        style={{ fontSize: '80px', color: `${PRIMARY_CART}4d` }}
                      >
                        {categoryIcon(item.categorySlug)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className="text-xl font-bold uppercase tracking-wider"
                          style={{ color: PRIMARY_CART }}
                        >
                          {item.name}
                        </h3>
                        <span className="text-xl font-bold">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Remark input */}
                      <div className="mt-4">
                        <label
                          className="block text-lg mb-1"
                          style={{ fontFamily: "'Caveat', cursive", color: PRIMARY_CART }}
                        >
                          remarks:
                        </label>
                        <input
                          value={item.remark}
                          onChange={(e) => updateRemark(item.menuItemId, e.target.value)}
                          className="w-full bg-transparent px-0 py-1 outline-none text-xl placeholder:opacity-30"
                          style={{
                            fontFamily: "'Caveat', cursive",
                            borderBottom: `2px solid ${PRIMARY_CART}33`,
                          }}
                          placeholder="e.g. less sugar, extra hot…"
                          onFocus={(e) => (e.target.style.borderBottomColor = PRIMARY_CART)}
                          onBlur={(e) => (e.target.style.borderBottomColor = `${PRIMARY_CART}33`)}
                        />
                      </div>

                      {/* Qty + Delete */}
                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => removeFromCart(item.menuItemId)}
                          className="flex items-center text-rose-500 hover:text-rose-600 transition-colors uppercase text-xs font-bold"
                        >
                          <span className="material-icons-outlined text-lg mr-1">delete</span>
                          remove
                        </button>
                        <div
                          className="flex items-center space-x-4 p-2 rounded-full"
                          style={{ backgroundColor: `${PRIMARY_CART}1a` }}
                        >
                          <button
                            onClick={() => updateQty(item.menuItemId, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                            style={{ color: PRIMARY_CART }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = PRIMARY_CART
                              e.currentTarget.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.color = PRIMARY_CART
                            }}
                          >
                            <span className="material-icons-outlined text-lg">remove</span>
                          </button>
                          <span className="w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.menuItemId, 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                            style={{ color: PRIMARY_CART }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = PRIMARY_CART
                              e.currentTarget.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.color = PRIMARY_CART
                            }}
                          >
                            <span className="material-icons-outlined text-lg">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order summary */}
            <div
              className="rounded-3xl p-6 mb-10"
              style={{
                backgroundColor: `${PRIMARY_CART}0d`,
                border: `1px solid ${PRIMARY_CART}1a`,
              }}
            >
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-lg">
                  <span className="text-2xl" style={{ fontFamily: "'Caveat', cursive" }}>
                    subtotal
                  </span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-2xl" style={{ fontFamily: "'Caveat', cursive" }}>
                    service fee (0%)
                  </span>
                  <span>RM 0.00</span>
                </div>
                <div
                  className="pt-4 mt-4 flex justify-between items-center"
                  style={{ borderTop: `1px solid ${PRIMARY_CART}33` }}
                >
                  <span
                    className="text-2xl"
                    style={{ fontFamily: "'Caveat', cursive", color: PRIMARY_CART }}
                  >
                    total
                  </span>
                  <span className="text-3xl font-bold" style={{ color: PRIMARY_CART }}>
                    RM {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCartOpen(false)}
                className="flex-1 py-4 px-6 rounded-full font-bold uppercase tracking-widest transition-colors flex items-center justify-center hover:opacity-80"
                style={{
                  border: `2px solid ${PRIMARY_CART}`,
                  color: PRIMARY_CART,
                  backgroundColor: 'transparent',
                }}
              >
                <span className="material-icons-outlined mr-2">arrow_back</span>
                Continue Ordering
              </button>
              <button
                className="flex-1 py-4 px-6 rounded-full text-white font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center hover:opacity-90"
                style={{
                  backgroundColor: PRIMARY_CART,
                  boxShadow: `0 8px 20px ${PRIMARY_CART}33`,
                }}
                onClick={() => {
                  // TODO: wire up to createOrder server action
                  alert('Payment flow coming soon!')
                }}
              >
                Proceed to Payment
                <span className="material-icons-outlined ml-2">payments</span>
              </button>
            </div>

            <p
              className="text-center text-[10px] italic mt-12 opacity-50 text-lg"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              *items are strictly for digital consumption
            </p>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}
