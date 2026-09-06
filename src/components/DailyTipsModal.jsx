import { useState, useEffect } from 'react'
import { X, Bell } from 'lucide-react'
import { getDailyTip } from '../data/dailyRoadTips'
import { getTipIcon } from './TipIcons'
import useNotifications from '../hooks/useNotifications'

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
  const { permission, requestPermission, showNotification, isSupported } = useNotifications()

  useEffect(() => {
    if (open) {
      playNotificationSound()
      // Also show native notification if permitted
      if (permission === 'granted') {
        showNotification(`🛣️ ${tip.title}`, {
          body: tip.content,
          tag: 'daily-road-tip',
        })
      }
    }
  }, [open, permission, tip, showNotification])

  async function handleEnableNotifications() {
    const result = await requestPermission()
    if (result === 'granted') {
      showNotification('Motoka Notifications Enabled', {
        body: 'You\'ll receive daily road tips and renewal reminders.',
        tag: 'notification-enabled',
      })
    }
  }

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
          <div style={{ width: 64, height: 64, marginBottom: 16 }}>{getTipIcon(tip.icon)}</div>
          <h4 style={{ fontWeight: 700, fontSize: 18, color: '#05243f', marginBottom: 12 }}>
            {tip.title}
          </h4>
          <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 15 }}>
            {tip.content}
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Enable notifications button */}
          {isSupported && permission !== 'granted' && (
            <button
              type="button"
              onClick={handleEnableNotifications}
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#05243f',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Bell size={16} style={{ color: '#2389e3' }} />
              Enable Push Notifications
            </button>
          )}

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
