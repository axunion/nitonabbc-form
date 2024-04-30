type StorageData = Record<string, unknown>

export const loadData = (key: string): StorageData | null => {
  try {
    const value = localStorage.getItem(key)
    const data = value ? JSON.parse(value) : null

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data
    }
  } catch (error) {
    console.error(`Error load data from localStorage:`, error)
  }

  return null
}

export const saveData = (key: string, data: StorageData): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving data to localStorage:`, error)
  }
}

export const removeData = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing data from localStorage:`, error)
  }
}

export const removeDataByList = (keys: string[]): void => {
  keys.forEach(removeData)
}

export const clearData = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(`Error clearing localStorage:`, error)
  }
}
