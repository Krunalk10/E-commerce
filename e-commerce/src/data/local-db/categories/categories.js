export const watchTypes = [
  { id: 'automatic', label: 'Automatic' },
  { id: 'manual', label: 'Manual winding' },
  { id: 'quartz', label: 'Battery / Quartz' },
]

export const genders = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'unisex', label: 'Unisex' },
]

export const priceRanges = [
  { id: 'under-50000', label: 'Under Rs. 50,000', min: 0, max: 50000 },
  { id: '50000-100000', label: 'Rs. 50,000 - Rs. 1 lakh', min: 50000, max: 100000 },
  { id: '100000-250000', label: 'Rs. 1 lakh - Rs. 2.5 lakh', min: 100000, max: 250000 },
  { id: '250000-500000', label: 'Rs. 2.5 lakh - Rs. 5 lakh', min: 250000, max: 500000 },
  { id: 'above-500000', label: 'Above Rs. 5 lakh', min: 500000, max: Infinity },
]

export const caseSizes = [
  { id: 'small', label: 'Up to 36 mm', min: 0, max: 36 },
  { id: 'medium', label: '37 mm - 40 mm', min: 37, max: 40 },
  { id: 'large', label: '41 mm - 44 mm', min: 41, max: 44 },
  { id: 'oversized', label: '45 mm and above', min: 45, max: Infinity },
]
