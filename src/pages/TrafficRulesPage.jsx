import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Volume2 } from 'lucide-react'
import { getDailyTip, DAILY_ROAD_TIPS } from '../data/dailyRoadTips'
import useSeoHead from '../hooks/useSeoHead'

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gainNode.gain.value = 0.1
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    oscillator.stop(ctx.currentTime + 0.3)
  } catch (e) {
    // silent fail
  }
}

export default function TrafficRulesPage() {
  useSeoHead(
    'Traffic Rules & Road Tips | Motoka',
    'Daily road tips, traffic signs, fines, and safe driving practices for Nigerian drivers.'
  )

  const [tip] = useState(() => getDailyTip())
  const [allTips] = useState(() => DAILY_ROAD_TIPS)
  const [tipIndex, setTipIndex] = useState(() => allTips.findIndex(t => t.title === tip.title))
  const [playedToday, setPlayedToday] = useState(false)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastPlayed = localStorage.getItem('motoka_traffic_sound_played')
    if (lastPlayed !== today) {
      playNotificationSound()
      localStorage.setItem('motoka_traffic_sound_played', today)
      setPlayedToday(true)
    }
  }, [])

  function nextTip() {
    setTipIndex((prev) => (prev + 1) % allTips.length)
  }

  function prevTip() {
    setTipIndex((prev) => (prev - 1 + allTips.length) % allTips.length)
  }

  const currentTip = allTips[tipIndex]

  const categories = [...new Set(allTips.map(t => t.category))]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px clamp(24px, 7.9vw, 114px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            to="/"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#05243f',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 20, color: '#05243f' }}>Traffic Rules</h1>
            <p style={{ fontSize: 13, color: '#64748b' }}>Daily road tips & safe driving guides</p>
          </div>
        </div>
      </div>

      <div style={{ padding: 'clamp(24px, 7.9vw, 114px)', maxWidth: 800, margin: '0 auto' }}>
        {/* Featured daily tip */}
        <div
          style={{
            background: '#2389e3',
            borderRadius: 24,
            padding: 32,
            marginBottom: 48,
            color: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Volume2 size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
            <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              Today's Tip · {currentTip.category}
            </span>
          </div>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{currentTip.icon}</div>
          <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 12 }}>{currentTip.title}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>{currentTip.content}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <button
              type="button"
              onClick={prevTip}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: 13, opacity: 0.7 }}>
              {tipIndex + 1} / {allTips.length}
            </span>
            <button
              type="button"
              onClick={nextTip}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: 'none',
                background: '#fff',
                color: '#2389e3',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Next
            </button>
          </div>
        </div>

        {/* All tips by category */}
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 48 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: '#05243f', marginBottom: 20 }}>{cat}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {allTips.filter(t => t.category === cat).map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(5,36,63,0.06)',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
                  <h4 style={{ fontWeight: 600, fontSize: 15, color: '#05243f', marginBottom: 8 }}>{t.title}</h4>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{t.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
