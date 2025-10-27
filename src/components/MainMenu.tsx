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
        fontSize: '60px', 
        marginBottom: '20px',
        textShadow: '4px 4px 8px rgba(0,0,0,0.5)'
      }}>
        🎤 アイドルヲタク逃走ゲーム 🏃
      </h1>
      
      <p style={{ 
        fontSize: '20px', 
        marginBottom: '50px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        ライブ会場で厄介行為を行い、マッチョなセキュリティスタッフから逃げろ！
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button 
          onClick={onStartGame}
          style={{
            padding: '20px 60px',
            fontSize: '24px',
            cursor: 'pointer',
            backgroundColor: '#ff006e',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🎮 メインゲーム開始
        </button>

        <button 
          onClick={onStartMiniGame}
          style={{
            padding: '20px 60px',
            fontSize: '24px',
            cursor: 'pointer',
            backgroundColor: '#06ffa5',
            color: 'black',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🍺 直缶チャレンジ
        </button>
      </div>

      <div style={{ 
        marginTop: '60px', 
        fontSize: '14px',
        textAlign: 'center',
        opacity: 0.8
      }}>
        <p>⚠️ このゲームはフィクションです</p>
        <p>実際の会場では絶対に厄介行為をしないでください</p>
      </div>
    </div>
  )
}
