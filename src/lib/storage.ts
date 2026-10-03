/**
 * Storage adapter. All persistence goes through this interface so the
 * localStorage implementation can be swapped for Supabase later.
 */
export interface StorageAdapter {
  read(key: string): unknown | null
  write(key: string, value: unknown): void
  remove(key: string): void
}

export const localStorageAdapter: StorageAdapter = {
  read(key) {
    if (typeof window === "undefined") return null
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? null : (JSON.parse(raw) as unknown)
    } catch {
      return null
    }
  },
  write(key, value) {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be full or blocked (Safari private mode). Progress simply won't persist.
    }
  },
  remove(key) {
    if (typeof window === "undefined") return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  },
}
