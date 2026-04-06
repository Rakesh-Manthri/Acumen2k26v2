import { useState, useEffect } from 'react'

const EVENT_DATE = new Date('2026-04-16T09:00:00+05:30')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = EVENT_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, expired: false }
}

const units = ['days', 'hours', 'minutes', 'seconds']
const labels = ['DAYS', 'HRS', 'MIN', 'SEC']

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (time.expired) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#FFD600',
          fontSize: '1.2rem',
          fontWeight: '700',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          // THE EVENT IS LIVE
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{
        display: 'flex',
        gap: 'clamp(1rem, 3vw, 3rem)',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {units.map((unit, i) => (
          <div key={unit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              background: '#111',
              border: '1px solid #3D3D3D',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              minWidth: 'clamp(80px, 15vw, 120px)',
              textAlign: 'center',
              transition: 'border-color 0.3s ease',
            }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                color: '#FFD600',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {pad(time[unit])}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#555',
            }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}