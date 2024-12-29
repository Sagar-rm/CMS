import { useState, useEffect } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, toast.duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type, duration) => {
    setToast({ message, type, duration })
  }

  return { toast, showToast }
}

export function Toast({ message, type }) {
  let bgColor = 'bg-gray-800'
  let textColor = 'text-white'

  switch (type) {
    case 'success':
      bgColor = 'bg-green-500'
      break
    case 'error':
      bgColor = 'bg-red-500'
      break
    case 'info':
      bgColor = 'bg-blue-500'
      break
  }

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md ${bgColor} ${textColor}`}>
      {message}
    </div>
  )
}

