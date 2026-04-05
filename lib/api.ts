"use client"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "process.env.NEXT_PUBLIC_API_URL"

export const getToken = () => localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
export const getRefreshToken = () => localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken")

export const setTokens = (accessToken: string, refreshToken: string, remember: boolean) => {
  const store = remember ? localStorage : sessionStorage
  store.setItem("accessToken", accessToken)
  store.setItem("refreshToken", refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("refreshToken")
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken))
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

export const authHeader = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiFetch(url: string, options: any = {}) {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`
  const headers = {
    ...authHeader(),
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(fullUrl, { ...options, headers })

  if (response.status === 401) {
    // Try to refresh
    const rt = getRefreshToken()
    if (!rt) {
       clearTokens()
       window.location.href = "/login"
       throw new Error("Session expired")
    }

    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
          headers: { Authorization: `Bearer ${rt}` }
        })

        if (refreshResponse.ok) {
          const { accessToken, refreshToken } = await refreshResponse.json()
          const remember = !!localStorage.getItem("accessToken")
          setTokens(accessToken, refreshToken, remember)
          isRefreshing = false
          onTokenRefreshed(accessToken)
        } else {
          clearTokens()
          window.location.href = "/login"
          throw new Error("Session expired")
        }
      } catch (err) {
        clearTokens()
        window.location.href = "/login"
        throw new Error("Session expired")
      }
    }

    return new Promise((resolve) => {
      addRefreshSubscriber((token) => {
        resolve(fetch(fullUrl, { ...options, headers: { ...headers, Authorization: `Bearer ${token}` } }))
      })
    })
  }

  return response
}
