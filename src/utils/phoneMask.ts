export function applyPhoneMask(raw: string): string {
  let val = raw.replace(/\D/g, '')
  if (val.length > 11) val = val.slice(0, 11)

  if (val.length > 6) {
    return `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`
  } else if (val.length > 2) {
    return `(${val.slice(0, 2)}) ${val.slice(2)}`
  } else if (val.length > 0) {
    return `(${val}`
  }
  return val
}
