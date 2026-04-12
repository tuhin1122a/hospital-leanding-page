import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAccessToken() {
  if (typeof document === 'undefined') return ''
  const cookies = document.cookie.split('; ')
  const accessTokenRow = Array.isArray(cookies) ? cookies.find(row => row.trim().startsWith('accessToken=')) : null
  return accessTokenRow ? accessTokenRow.split('=')[1] : ''
}
