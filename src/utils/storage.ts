export const getItem = <T>(key: string) => {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const setItem = (key: string, value: any) => {
  value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}
