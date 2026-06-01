const DEFAULT_DELAY = 220

export function delay(duration = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function makeApiResponse(data, meta = {}) {
  return {
    data,
    meta: {
      requestedAt: new Date().toISOString(),
      ...meta,
    },
  }
}
