import { useState, useEffect, useRef } from 'react'

interface MiniGameProps {
  onComplete: () => void
}

export default function MiniGame({ onComplete }: MiniGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [drinkProgress, setDrinkProgress] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(
    localStorage.getItem('bestCanTime') 
      ? parseFloat(localStorage.getItem('bestCanTime')!) 
      : null
  )
  const [completed, setCompleted] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number>()

  const startGame = () => {
    setGameStarted(true)
    setDrinkProgress(0)
    setTimeElapsed(0)
    setCompleted(false)
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    if (!gameStarted || completed) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !completed) {
        setDrinkProgress((prev) => {
          const newProgress = Math.min(prev + 5, 100)
          if (newProgress >= 100) {
            setCompleted(true)
            const finalTime = (Date.now() - startTimeRef.current!) / 1000
            setTimeElapsed(finalTime)
            
            if (bestTime === null || finalTime < bestTime) {
              setBestTime(finalTime)
              localStorage.setItem('bestCanTime', finalTime.toString())
            }
          }
          return newProgress
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, completed, bestTime])

  useEffect(() => {
    if (gameStarted && !completed) {
      const updateTime = () => {
        setTimeElapsed((Date.now() - startTimeRef.current!) / 1000)
        animationFrameRef.current = requestAnimationFrame(updateTime)
      }
      animationFrameRef.current = requestAnimationFrame(updateTime)
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [gameStarted, completed])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ fontSize: '50px', marginBottom: '30px' }}>🍺 直缶チャレンジ 🍺</h1>

      {!gameStarted ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '20px', marginBottom: '30px' }}>
            スペースキーを連打して缶を一気飲みしろ！
          </p>
          {bestTime !== null && (
            <p style={{ fontSize: '24px', marginBottom: '20px', color: '#ffff00' }}>
              ベストタイム: {bestTime.toFixed(2)}秒
            </p>
          )}
          <button 
            onClick={startGame}
            style={{
              padding: '20px 60px',
              fontSize: '24px',
              cursor: 'pointer',
              backgroundColor: '#ff006e',
              color: 'white',
              border: 'none',
              borderRadius: '10px'
            }}
          >
            スタート
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          {/* 直缶イラスト（写真風） */}
          <div style={{
            width: '300px',
            height: '400px',
            margin: '0 auto 30px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* 顔のイラスト */}
            <div style={{
              position: 'relative',
              width: '200px',
              height: '250px'
            }}>
              {/* 頭 */}
              <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '140px',
                backgroundColor: '#f4c2a8',
                borderRadius: '60px 60px 50px 50px',
                border: '2px solid #d4a373'
              }}>
                {/* 目（閉じた状態） */}
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  left: '25px',
                  width: '25px',
                  height: '4px',
                  backgroundColor: '#000',
                  borderRadius: '2px'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  right: '25px',
                  width: '25px',
                  height: '4px',
                  backgroundColor: '#000',
                  borderRadius: '2px'
                }} />
                
                {/* 開いた口 */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '60px',
                  backgroundColor: '#8b0000',
                  borderRadius: '25px',
                  border: '2px solid #d4a373'
                }} />
                
                {/* 舌 */}
                <div style={{
                  position: 'absolute',
                  bottom: '35px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '20px',
                  backgroundColor: '#ff6b9d',
                  borderRadius: '0 0 15px 15px'
                }} />
              </div>
              
              {/* 缶を持つ手 */}
              <div style={{
                position: 'absolute',
                bottom: '150px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-15deg)',
                width: '60px',
                height: '100px',
                backgroundColor: '#f4c2a8',
                borderRadius: '30px',
                border: '2px solid #d4a373',
                zIndex: 10
              }}>
                {/* 親指 */}
                <div style={{
                  position: 'absolute',
                  left: '-15px',
                  top: '30px',
                  width: '20px',
                  height: '35px',
                  backgroundColor: '#f4c2a8',
                  borderRadius: '10px',
                  border: '2px solid #d4a373'
                }} />
              </div>
              
              {/* ビール缶 */}
              <div style={{
                position: 'absolute',
                bottom: '180px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70px',
                height: '120px',
                background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
                borderRadius: '10px',
                border: '3px solid #66bb6a',
                zIndex: 5,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>
                {/* 缶のラベル */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '70px',
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ff1744'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#ff1744',
                    marginBottom: '2px'
                  }}>
                    ストロング
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#d32f2f'
                  }}>
                    酒雑魚
                  </div>
                </div>
                
                {/* 缶の穴（下部） */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '15px',
                  height: '15px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  border: '2px solid #333'
                }} />
                
                {/* 液体の流れ */}
                {drinkProgress > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: `${drinkProgress}px`,
                    background: 'linear-gradient(180deg, rgba(255,215,0,0.8) 0%, rgba(255,140,0,0.6) 100%)',
                    borderRadius: '4px'
                  }} />
                )}
                
                {/* 液体レベル */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: `${100 - drinkProgress}%`,
                  background: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 100%)',
                  borderRadius: '0 0 7px 7px',
                  transition: 'height 0.1s',
                  opacity: 0.7
                }} />
              </div>
            </div>
          </div>

          {/* プログレスバー */}
          <div style={{
            width: '400px',
            height: '40px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              width: `${drinkProgress}%`,
              height: '100%',
              backgroundColor: '#00ff00',
              transition: 'width 0.1s'
            }} />
          </div>

          <p style={{ fontSize: '32px', marginBottom: '20px' }}>
            {drinkProgress.toFixed(0)}%
          </p>

          <p style={{ fontSize: '28px', color: '#ffff00' }}>
            ⏱️ {timeElapsed.toFixed(2)}秒
          </p>

          {completed && (
            <div style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '40px', color: '#00ff00' }}>完飲！</h2>
              <p style={{ 
                fontSize: '36px', 
                marginTop: '15px',
                color: '#ff69b4',
                fontWeight: 'bold',
                textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
              }}>
                イッチャン好き！💖
              </p>
              <p style={{ fontSize: '24px', marginTop: '20px' }}>
                タイム: {timeElapsed.toFixed(2)}秒
              </p>
              {bestTime === timeElapsed && (
                <p style={{ fontSize: '28px', color: '#ffff00', marginTop: '10px' }}>
                  🏆 新記録！
                </p>
              )}
              <button 
                onClick={onComplete}
                style={{
                  marginTop: '30px',
                  padding: '15px 40px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  backgroundColor: '#ff006e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                メニューに戻る
              </button>
            </div>
          )}

          {!completed && (
            <p style={{ 
              marginTop: '30px', 
              fontSize: '18px',
              animation: 'pulse 1s infinite'
            }}>
              スペースキーを連打！
            </p>
          )}
        </div>
      )}
    </div>
  )
}
