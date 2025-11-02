// Keep backend alive by pinging every 14 minutes
// This prevents Render free tier from sleeping

const BACKEND_URL = 'https://planner-wedding.onrender.com/api/health'
const PING_INTERVAL = 14 * 60 * 1000 // 14 minutes

let keepAliveInterval = null

export const startKeepAlive = () => {
  // Don't start if already running
  if (keepAliveInterval) {
    return
  }

  console.log('🔔 Keep-alive service started - pinging backend every 14 minutes')

  // Ping immediately
  pingBackend()

  // Then ping every 14 minutes
  keepAliveInterval = setInterval(() => {
    pingBackend()
  }, PING_INTERVAL)
}

export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval)
    keepAliveInterval = null
    console.log('🛑 Keep-alive service stopped')
  }
}

const pingBackend = async () => {
  try {
    const response = await fetch(BACKEND_URL)
    if (response.ok) {
      console.log('✅ Backend pinged successfully at', new Date().toLocaleTimeString())
    }
  } catch (error) {
    console.log('⚠️ Backend ping failed:', error.message)
  }
}

// Auto-start when module loads (only in production)
if (import.meta.env.MODE === 'production') {
  startKeepAlive()
}
