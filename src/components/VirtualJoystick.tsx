import { useState, useEffect, useRef } from 'react'

interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void
}

export default function VirtualJoystick({ onMove }: VirtualJoystickProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })

  const handleStart = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    startPosRef.current = {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2
    }
    setIsDragging(true)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !joystickRef.current) return
    
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    let deltaX = clientX - centerX
    let deltaY = clientY - centerY
    
    // 最大距離を制限
    const maxDistance = 50
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    if (distance > maxDistance) {
      const angle = Math.atan2(deltaY, deltaX)
      deltaX = Math.cos(angle) * maxDistance
      deltaY = Math.sin(angle) * maxDistance
    }
    
    setPosition({ x: deltaX, y: deltaY })
    
    // -1 to 1 の範囲に正規化
    const normalizedX = deltaX / maxDistance
    const normalizedY = deltaY / maxDistance
    
    onMove(normalizedX, -normalizedY) // Y軸を反転
  }

  const handleEnd = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
    onMove(0, 0)
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.target === joystickRef.current || joystickRef.current?.contains(e.target as Node)) {
        e.preventDefault()
        const touch = e.touches[0]
        handleStart(touch.clientX, touch.clientY)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
        const touch = e.touches[0]
        handleMove(touch.clientX, touch.clientY)
      }
    }

    const handleTouchEnd = () => {
      handleEnd()
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return (
    <div
      ref={joystickRef}
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '80px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '3px solid rgba(255, 255, 255, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}
