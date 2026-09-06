import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getDailyTip } from '../data/dailyRoadTips'

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

export default function DailyTipsModal({ open, onOpenChange }) {
  const [tip] = useState(() => getDailyTip())

  useEffect(() => {
    if (open) playNotificationSound()
  }, [open])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,36,63,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 25px 60px -12px rgba(5,36,63,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>
              {tip.category}
            </p>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: '#2389e3' }}>
              Daily Road Tip
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#f1f5f9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{tip.icon}</div>
          <h4 style={{ fontWeight: 700, fontSize: 18, color: '#05243f', marginBottom: 12 }}>
            {tip.title}
          </h4>
          <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 15 }}>
            {tip.content}
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: '0 24px 24px' }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: '#2389e3',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
