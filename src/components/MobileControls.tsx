import { useState } from 'react'

interface MobileControlsProps {
  onAction: (action: 'mosh' | 'lift' | 'throw' | 'heckle' | 'jump') => void
}

export default function MobileControls({ onAction }: MobileControlsProps) {
  const [pressedButton, setPressedButton] = useState<string | null>(null)

  const handleButtonPress = (action: 'mosh' | 'lift' | 'throw' | 'heckle' | 'jump') => {
    setPressedButton(action)
    onAction(action)
    setTimeout(() => setPressedButton(null), 150)
  }

  const buttonStyle = (action: string): React.CSSProperties => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.8)',
    backgroundColor: pressedButton === action 
      ? 'rgba(255, 100, 100, 0.9)' 
      : 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none',
    userSelect: 'none' as const,
    cursor: 'pointer',
    transition: 'all 0.1s',
    transform: pressedButton === action ? 'scale(0.95)' : 'scale(1)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  })

  const labelStyle = {
    fontSize: '10px',
    fontWeight: 'normal',
    marginTop: '2px',
    color: 'rgba(255, 255, 255, 0.9)'
  }

  return (
    <>
      {/* 右側: 厄介行為ボタン */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
        zIndex: 1000,
        touchAction: 'none'
      }}>
        {/* モッシュ */}
        <button
          onTouchStart={() => handleButtonPress('mosh')}
          style={buttonStyle('mosh')}
        >
          <div style={{ textAlign: 'center' }}>
            💥
            <div style={labelStyle}>E</div>
          </div>
        </button>

        {/* リフト */}
        <button
          onTouchStart={() => handleButtonPress('lift')}
          style={buttonStyle('lift')}
        >
          <div style={{ textAlign: 'center' }}>
            ⬆️
            <div style={labelStyle}>Q</div>
          </div>
        </button>

        {/* 酒缶投げ */}
        <button
          onTouchStart={() => handleButtonPress('throw')}
          style={buttonStyle('throw')}
        >
          <div style={{ textAlign: 'center' }}>
            🍺
            <div style={labelStyle}>F</div>
          </div>
        </button>

        {/* 野次 */}
        <button
          onTouchStart={() => handleButtonPress('heckle')}
          style={buttonStyle('heckle')}
        >
          <div style={{ textAlign: 'center' }}>
            📢
            <div style={labelStyle}>R</div>
          </div>
        </button>
      </div>

      {/* ジャンプボタン（左下、ジョイスティックの上） */}
      <button
        onTouchStart={() => handleButtonPress('jump')}
        style={{
          ...buttonStyle('jump'),
          position: 'fixed',
          bottom: '220px',
          left: '80px',
          zIndex: 1000
        }}
      >
        <div style={{ textAlign: 'center' }}>
          🔼
          <div style={labelStyle}>Space</div>
        </div>
      </button>
    </>
  )
}
