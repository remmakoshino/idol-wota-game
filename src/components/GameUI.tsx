import { useEffect, useState } from 'react'
import { GameState } from '../App'
import { StageType, STAGES } from '../config/stages'

interface GameUIProps {
  score: number
  troubleActions: number
  gameState: GameState
  stageName: StageType
  onBackToMenu: () => void
  onResume: () => void
  onPause: () => void
}

export default function GameUI({ 
  score, 
  troubleActions, 
  gameState,
  stageName,
  onBackToMenu,
  onResume,
  onPause
}: GameUIProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const stageConfig = STAGES[stageName]

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none'
    }}>
      {/* HUD */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        pointerEvents: 'none'
      }}>
        <div style={{ fontSize: '16px', marginBottom: '10px', color: '#00ff00' }}>
          🎪 {stageConfig.name} ({stageConfig.difficulty === 'easy' ? '易' : stageConfig.difficulty === 'normal' ? '普' : '難'})
        </div>
        <div>スコア: {score}</div>
        <div>厄介行為: {troubleActions}回</div>
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <div>危険度: {'🔴'.repeat(Math.min(troubleActions, 5))}</div>
        </div>
      </div>

      {/* 操作説明 */}
      {showInstructions && gameState === 'playing' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '30px',
          borderRadius: '10px',
          fontFamily: 'Arial',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <h2>操作方法</h2>
          <div style={{ marginTop: '20px', fontSize: '16px', textAlign: 'left' }}>
            <p>🕹️ WASD: 移動</p>
            <p>🏃 Shift: ダッシュ</p>
            <p>⬆️ Space: ジャンプ</p>
            <p>🖱️ マウス: 視点操作</p>
            <div style={{ marginTop: '15px', borderTop: '1px solid #fff', paddingTop: '15px' }}>
              <p style={{ fontSize: '18px', color: '#ff6b6b', marginBottom: '10px' }}>厄介行為:</p>
              <p>� E: モッシュ</p>
              <p>⬆️ Q: リフト</p>
              <p>🍺 F: 酒缶投げ</p>
              <p>📢 R: 野次</p>
            </div>
          </div>
        </div>
      )}

      {/* ゲームオーバー画面 */}
      {gameState === 'caught' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Arial',
          pointerEvents: 'auto'
        }}>
          <h1 style={{ fontSize: '60px', marginBottom: '20px' }}>捕まった！</h1>
          <div style={{ fontSize: '30px', marginBottom: '40px' }}>
            <p>最終スコア: {score}</p>
            <p>厄介行為: {troubleActions}回</p>
          </div>
          <button 
            onClick={onBackToMenu}
            style={{
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

      {/* ポーズ画面 */}
      {gameState === 'paused' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Arial',
          pointerEvents: 'auto'
        }}>
          <h1 style={{ fontSize: '60px', marginBottom: '40px' }}>一時停止</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={onResume}
              style={{
                padding: '15px 40px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: '#06ffa5',
                color: 'black',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              再開
            </button>
            <button 
              onClick={onBackToMenu}
              style={{
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
        </div>
      )}

      {/* ESCキーでポーズ */}
      {gameState === 'playing' && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white',
          fontSize: '14px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          ESCキー: ポーズ
        </div>
      )}
    </div>
  )
}
