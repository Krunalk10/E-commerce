export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}
