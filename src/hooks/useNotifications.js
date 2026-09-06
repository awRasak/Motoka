import { useState, useEffect, useCallback } from 'react'

const PERMISSION_KEY = 'motoka_notification_permission'

export default function useNotifications() {
  const [permission, setPermission] = useState(() => {
    if (typeof Notification === 'undefined') return 'default'
    return Notification.permission
  })

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied'

    // Already granted
    if (Notification.permission === 'granted') {
      setPermission('granted')
      return 'granted'
    }

    // Already denied
    if (Notification.permission === 'denied') {
      setPermission('denied')
      return 'denied'
    }

    // Request permission
    const result = await Notification.requestPermission()
    setPermission(result)
    localStorage.setItem(PERMISSION_KEY, result)
    return result
  }, [])

  const showNotification = useCallback((title, options = {}) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
      return null
    }

    const notification = new Notification(title, {
      icon: '/logo-192.png',
      badge: '/logo-192.png',
      vibrate: [200, 100, 200],
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }, [])

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: typeof Notification !== 'undefined',
  }
}
