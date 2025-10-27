import { StageType, STAGES } from '../config/stages'
import { MinecraftIdol } from './MinecraftCharacters'

interface DynamicStageProps {
  stageType: StageType
}

export default function DynamicStage({ stageType }: DynamicStageProps) {
  const config = STAGES[stageType]

  return (
    <>
      {/* メインステージ */}
      <Stage stageType={stageType} />
      
      {/* アイドル5人 */}
      <MinecraftIdol position={[-4, 0.5, -15]} color="#ff1493" />
      <MinecraftIdol position={[-2, 0.5, -15]} color="#ff69b4" />
      <MinecraftIdol position={[0, 0.5, -15]} color="#ff6347" />
      <MinecraftIdol position={[2, 0.5, -15]} color="#ffa500" />
      <MinecraftIdol position={[4, 0.5, -15]} color="#9370db" />
      
      {/* 観客席 */}
      <AudienceSeats config={config} />
      
      {/* 装飾照明 */}
      <StageLights config={config} />

      {/* 背景の壁 */}
      <Walls config={config} />
    </>
  )
}

function Stage({ stageType }: { stageType: StageType }) {
  const config = STAGES[stageType]
  const stageWidth = Math.min(config.size.width * 0.6, 20)
  const stageDepth = 5

  return (
    <>
      {/* ステージ床 */}
      <mesh position={[0, 0.25, -15]} receiveShadow castShadow>
        <boxGeometry args={[stageWidth, 0.5, stageDepth]} />
        <meshStandardMaterial color="#8b0000" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* バックドロップ */}
      <mesh position={[0, 3, -17.5]} receiveShadow>
        <boxGeometry args={[stageWidth, 6, 0.2]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* スピーカー */}
      <mesh position={[-stageWidth / 2 + 1, 1.5, -15]} castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[stageWidth / 2 - 1, 1.5, -15]} castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* ステージ名表示 */}
      <mesh position={[0, 5, -17.4]}>
        <planeGeometry args={[stageWidth * 0.8, 1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

function AudienceSeats({ config }: { config: typeof STAGES[StageType] }) {
  const seats = []
  const spacing = 2
  
  // 観客席を配置
  for (let row = 0; row < config.audienceRows; row++) {
    for (let col = 0; col < config.audienceCols; col++) {
      const x = (col - Math.floor(config.audienceCols / 2)) * spacing
      const z = row * spacing
      
      seats.push(
        <mesh 
          key={`seat-${row}-${col}`}
          position={[x, 0.3, z]}
          castShadow
        >
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial 
            color={row % 2 === 0 ? '#4a4a4a' : '#5a5a5a'} 
          />
        </mesh>
      )
    }
  }

  return <>{seats}</>
}

function StageLights({ config }: { config: typeof STAGES[StageType] }) {
  const intensity = config.lightingIntensity

  return (
    <>
      <pointLight position={[-5, 6, -15]} intensity={intensity * 2} color="#ff0000" castShadow />
      <pointLight position={[0, 6, -15]} intensity={intensity * 2} color="#00ff00" castShadow />
      <pointLight position={[5, 6, -15]} intensity={intensity * 2} color="#0000ff" castShadow />
      
      {/* アリーナ用の追加照明 */}
      {config.difficulty === 'hard' && (
        <>
          <pointLight position={[-10, 8, -15]} intensity={intensity} color="#ff00ff" />
          <pointLight position={[10, 8, -15]} intensity={intensity} color="#ffff00" />
          <pointLight position={[0, 10, 0]} intensity={intensity} color="#00ffff" />
        </>
      )}
      
      {/* スポットライト */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={intensity}
        castShadow
        color="#ffffff"
      />
    </>
  )
}

function Walls({ config }: { config: typeof STAGES[StageType] }) {
  const { width, depth } = config.size

  return (
    <>
      {/* 左の壁 */}
      <mesh position={[-width / 2, 3, depth / 2 - 20]} receiveShadow>
        <boxGeometry args={[0.5, 6, depth]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* 右の壁 */}
      <mesh position={[width / 2, 3, depth / 2 - 20]} receiveShadow>
        <boxGeometry args={[0.5, 6, depth]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* 後ろの壁 */}
      <mesh position={[0, 3, depth - 20]} receiveShadow>
        <boxGeometry args={[width, 6, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </>
  )
}
