'use client'

import { useCallback } from 'react'

// Pre-generated C→E→G chime as base64 WAV (8000Hz, 0.9s, mono)
// Generated offline - no file needed, no AudioContext policy issues
const CHIME_WAV_B64 = (() => {
  // Build the WAV in base64 using a small script approach
  // 8000 sample rate, 0.9s = 7200 samples, 3 notes
  const sampleRate = 8000
  const numSamples = 7200
  const dataSize = numSamples * 2
  const buf = new Uint8Array(44 + dataSize)
  const view = new DataView(buf.buffer)

  // RIFF header
  'RIFF'.split('').forEach((c, i) => view.setUint8(i, c.charCodeAt(0)))
  view.setUint32(4, 36 + dataSize, true)
  'WAVE'.split('').forEach((c, i) => view.setUint8(8 + i, c.charCodeAt(0)))
  'fmt '.split('').forEach((c, i) => view.setUint8(12 + i, c.charCodeAt(0)))
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)  // PCM
  view.setUint16(22, 1, true)  // Mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  'data'.split('').forEach((c, i) => view.setUint8(36 + i, c.charCodeAt(0)))
  view.setUint32(40, dataSize, true)

  // Generate 3 notes: C5(523Hz) → E5(659Hz) → G5(784Hz)
  const notes = [523.25, 659.25, 783.99]
  const nd = numSamples / notes.length
  for (let i = 0; i < numSamples; i++) {
    const ni = Math.min(Math.floor(i / nd), notes.length - 1)
    const freq = notes[ni]
    const t = (i % nd) / sampleRate
    const env = Math.exp(-t * 5)
    const s = Math.sin(2 * Math.PI * freq * (i / sampleRate)) * env * 0.65
    const v = Math.max(-32767, Math.min(32767, Math.floor(s * 32767)))
    view.setInt16(44 + i * 2, v, true)
  }

  // Convert to base64
  let binary = ''
  buf.forEach(b => { binary += String.fromCharCode(b) })
  return typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(buf).toString('base64')
})()

export function useNotificationSound() {
  const playNotification = useCallback(() => {
    try {
      // Build data URL from embedded WAV
      const dataUrl = `data:audio/wav;base64,${CHIME_WAV_B64}`
      const audio = new Audio(dataUrl)
      audio.volume = 0.7
      audio.play().catch(err => {
        console.warn('Sound play failed:', err)
      })
    } catch (e) {
      console.warn('Sound error:', e)
    }
  }, [])

  return { playNotification }
}
