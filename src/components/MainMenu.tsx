interface MainMenuProps {
  onStartGame: () => void
  onStartMiniGame: () => void
}

export default function MainMenu({ onStartGame, onStartMiniGame }: MainMenuProps) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(24px, 6vw, 60px)', 
        marginBottom: 'clamp(10px, 2vh, 20px)',
        textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
        textAlign: 'center',
        padding: '0 clamp(10px, 2vw, 20px)'
      }}>
        🎤 アイドルヲタク逃走ゲーム 🏃
      </h1>
      
      <p style={{ 
        fontSize: 'clamp(12px, 3vw, 20px)', 
        marginBottom: 'clamp(20px, 5vh, 50px)',
        textAlign: 'center',
        maxWidth: '90vw',
        padding: '0 clamp(10px, 2vw, 20px)'
      }}>
        ライブ会場で厄介行為を行い、マッチョなセキュリティスタッフから逃げろ!
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 2vh, 20px)', alignItems: 'center', width: '90%', maxWidth: '400px' }}>
        <button 
          onClick={onStartGame}
          style={{
            padding: 'clamp(12px, 2vh, 20px) clamp(30px, 8vw, 60px)',
            fontSize: 'clamp(16px, 3.5vw, 24px)',
            cursor: 'pointer',
            backgroundColor: '#ff006e',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s',
            width: '100%'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🎮 メインゲーム開始
        </button>

        <button 
          onClick={onStartMiniGame}
          style={{
            padding: 'clamp(12px, 2vh, 20px) clamp(30px, 8vw, 60px)',
            fontSize: 'clamp(16px, 3.5vw, 24px)',
            cursor: 'pointer',
            backgroundColor: '#06ffa5',
            color: 'black',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s',
            width: '100%'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🍺 直缶チャレンジ
        </button>
      </div>

      <div style={{ 
        marginTop: 'clamp(20px, 5vh, 60px)', 
        fontSize: 'clamp(10px, 2vw, 14px)',
        textAlign: 'center',
        opacity: 0.8,
        padding: '0 clamp(10px, 2vw, 20px)'
      }}>
        <p>⚠️ このゲームはフィクションです</p>
        <p>実際の会場では絶対に厄介行為をしないでください</p>
      </div>
    </div>
  )
}
