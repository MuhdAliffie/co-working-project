export type PassCatalogEntry = {
  passType: string
  validityPeriod: string
  price: number
  benefits: string
  imageUrl: string
  badgeLabel?: string
  statusTone?: 'emerald' | 'amber'
}

export const passCatalog: Record<string, PassCatalogEntry> = {
  'PASS-MU': {
    passType: 'Monthly Unlimited',
    validityPeriod: '30 days',
    price: 390.0,
    benefits: 'Unlimited access. Unlimited focus',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    badgeLabel: 'Active',
    statusTone: 'emerald',
  },
  'PASS-PP': {
    passType: '10-Entry Punch Pass',
    validityPeriod: '90 days',
    price: 249.0,
    benefits: 'Flexible entries, guest passes',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-hNyWM7NbB-0_zlOtCQfbiWSoTdd4lZWkLMDZQErn8stGk8DREUjQweViqvoVqWIhmkasBCYCeWndQ0rXQLK3ocxdMREVZbrGQu7jk1MUlE0pw6RlUKMAzJ-tQ8jUp0taLZGwqHoXMxlw5oa1YCkqwsN3FA3ZHw2sp2VQmW5z5YC_AadHTZjP-wqz4G0Wyjno4pm10RaC0FzeBCeR9DXD5jWNI3TQj9EboP9Y5gHQ4WxCeLA4ODcZom02f-1VRdgjIR-oDX8wJHat',
    badgeLabel: 'Flex',
    statusTone: 'emerald',
  },
  'PASS-CF': {
    passType: 'Corporate Flex',
    validityPeriod: 'Quarterly',
    price: 499.0,
    benefits: 'Multi-user slots, concierge service',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGqiZRmYiwlS8enkOb9omHTGJSpI4hv9uvf6Co0naeBFssDSBymGTH8WCzQVc8n8EAcHBfc9iNEVYFy78ArErOvo_wJpgGiT6cOErjMt8PJUiTxvy6UzAXmEPgZItJmX6zP4iTeQq9Kv1wRg9s9GPY5Ns8AjRlJTSDvOhM6V3ypEygKU_jQK45p9d0I-NP9kKC1XCSOtOhu0-4XJJA',
    badgeLabel: 'Corporate',
    statusTone: 'amber',
  },
  'PASS-WE': {
    passType: 'Weekend Escape',
    validityPeriod: '30 days',
    price: 159.0,
    benefits: 'Weekend-only, spa credits',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBifJEeB2RPr4ZpH70wTuZTLHrPUS7Zhp6Wxn9yAXkNJE-mqtrp44EFHZuJQyp8JU-f3SaPvDaKXwZMI8M8rdOSoKTQApeVEbia1aB-HhMurtBk_lUx4gd5aGMCc69weocz6LcY20zrVlIrN2P8cBHyHSisd4nIuleRLSz-GHcmTnoYGEiVYcOXsA',
    badgeLabel: 'Weekend',
    statusTone: 'emerald',
  },
}
