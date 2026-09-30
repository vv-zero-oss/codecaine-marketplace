/**
 * Photography from Pexels (https://www.pexels.com), by photo id. Pexels is
 * credited in the footer.
 */
export function pexels(id: number, width = 800, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const avatar = (id: number) => pexels(id, 120, 120)

/** Dollars, the way a bank statement writes them. */
export function money(value: number, cents = true) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })
}
