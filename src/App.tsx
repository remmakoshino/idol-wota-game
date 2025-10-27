import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import GameScene from './components/GameScene'
import GameUI from './components/GameUI'
import MainMenu from './components/MainMenu'
import MiniGame from './components/MiniGame'
import VirtualJoystick from './components/VirtualJoystick'
import MobileControls from './components/MobileControls'
import { StageType } from './config/stages'

export type GameState = 'menu' | 'playing' | 'minigame' | 'caught' | 'paused' | 'stageselect'

function App() {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [score, setScore] = useState(0)
  const [troubleActions, setTroubleActions] = useState(0)
  const [selectedStage, setSelectedStage] = useState<StageType>('livehouse')
  const [heckleMessage, setHeckleMessage] = useState<string | null>(null)
  const [mobileJoystick, setMobileJoystick] = useState({ x: 0, y: 0 })
  const [mobileAction, setMobileAction] = useState<'mosh' | 'lift' | 'throw' | 'heckle' | 'jump' | null>(null)

  const startGame = () => {
    setGameState('stageselect')
  }

  const selectStage = (stage: StageType) => {
    setSelectedStage(stage)
    setGameState('playing')
    setScore(0)
    setTroubleActions(0)
  }

  const startMiniGame = () => {
    setGameState('minigame')
  }

  const backToMenu = () => {
    setGameState('menu')
  }

  const addTroubleAction = (points: number) => {
    setTroubleActions(prev => prev + 1)
    setScore(prev => prev + points)
  }

  const gameCaught = () => {
    setGameState('caught')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {gameState === 'menu' && (
        <MainMenu 
          onStartGame={startGame} 
          onStartMiniGame={startMiniGame}
        />
      )}

      {gameState === 'stageselect' && (
        <StageSelect onSelectStage={selectStage} onBack={backToMenu} />
      )}

      {gameState === 'minigame' && (
        <MiniGame 
          onComplete={backToMenu}
        />
      )}

      {(gameState === 'playing' || gameState === 'caught' || gameState === 'paused') && (
        <>
          <Canvas
            shadows
            camera={{ position: [0, 2, 5], fov: 75 }}
            style={{ background: '#000814' }}
          >
            <GameScene 
              onCaught={gameCaught}
              onTroubleAction={addTroubleAction}
              gameState={gameState}
              stageType={selectedStage}
              onHeckle={(msg) => {
                setHeckleMessage(msg)
                setTimeout(() => setHeckleMessage(null), 3000)
              }}
              mobileJoystick={mobileJoystick}
              mobileAction={mobileAction}
            />
          </Canvas>
          
          {/* モバイルコントロール */}
          <VirtualJoystick 
            onMove={(x, y) => setMobileJoystick({ x, y })}
          />
          <MobileControls 
            onAction={(action) => {
              setMobileAction(action)
              setTimeout(() => setMobileAction(null), 100) // アクションをリセット
            }}
          />
          
          {/* 野次メッセージ表示 */}
          {heckleMessage && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 0, 0, 0.9)',
              color: 'white',
              padding: '30px 60px',
              borderRadius: '15px',
              fontSize: '36px',
              fontWeight: 'bold',
              fontFamily: 'Arial',
              textAlign: 'center',
              border: '4px solid #fff',
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.8)',
              pointerEvents: 'none',
              zIndex: 1000,
              animation: 'pulse 0.5s ease-in-out infinite'
            }}>
              {heckleMessage}
            </div>
          )}
          
          <GameUI 
            score={score}
            troubleActions={troubleActions}
            gameState={gameState}
            stageName={selectedStage}
            onBackToMenu={backToMenu}
            onResume={() => setGameState('playing')}
            onPause={() => setGameState('paused')}
          />
        </>
      )}
    </div>
  )
}

// ステージ選択画面コンポーネント
function StageSelect({ onSelectStage, onBack }: { 
  onSelectStage: (stage: StageType) => void
  onBack: () => void
}) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ fontSize: '50px', marginBottom: '40px' }}>🎪 ステージ選択 🎪</h1>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
        {/* 小規模ライブハウス */}
        <div 
          onClick={() => onSelectStage('livehouse')}
          style={{
            padding: '30px',
            backgroundColor: 'rgba(46, 213, 115, 0.2)',
            border: '3px solid #2ed573',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            width: '250px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>🏠 ライブハウス</h2>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>難易度: 易しい</p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            小規模会場<br/>
            セキュリティ: 2人<br/>
            観客: 少なめ
          </p>
        </div>

        {/* 中規模ホール */}
        <div 
          onClick={() => onSelectStage('hall')}
          style={{
            padding: '30px',
            backgroundColor: 'rgba(255, 165, 2, 0.2)',
            border: '3px solid #ffa502',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            width: '250px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>🏛️ ホール</h2>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>難易度: 普通</p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            中規模会場<br/>
            セキュリティ: 4人<br/>
            観客: 中程度
          </p>
        </div>

        {/* 大規模アリーナ */}
        <div 
          onClick={() => onSelectStage('arena')}
          style={{
            padding: '30px',
            backgroundColor: 'rgba(255, 63, 52, 0.2)',
            border: '3px solid #ff3f34',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            width: '250px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>🏟️ アリーナ</h2>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>難易度: 難しい</p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            大規模会場<br/>
            セキュリティ: 6人<br/>
            観客: 多い
          </p>
        </div>
      </div>

      <button 
        onClick={onBack}
        style={{
          padding: '15px 40px',
          fontSize: '20px',
          cursor: 'pointer',
          backgroundColor: '#95a5a6',
          color: 'white',
          border: 'none',
          borderRadius: '10px'
        }}
      >
        戻る
      </button>
    </div>
  )
}

export default App
