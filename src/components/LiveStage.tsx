export default function LiveStage() {
  return (
    <>
      {/* メインステージ */}
      <Stage />
      
      {/* 観客席 */}
      <AudienceSeats />
      
      {/* 装飾照明 */}
      <StageLights />
    </>
  )
}

function Stage() {
  return (
    <>
      {/* ステージ床 */}
      <mesh position={[0, 0.25, -15]} receiveShadow castShadow>
        <boxGeometry args={[15, 0.5, 5]} />
        <meshStandardMaterial color="#8b0000" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* バックドロップ */}
      <mesh position={[0, 3, -17.5]} receiveShadow>
        <boxGeometry args={[15, 6, 0.2]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* スピーカー */}
      <mesh position={[-7, 1.5, -15]} castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[7, 1.5, -15]} castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </>
  )
}

function AudienceSeats() {
  const seats = []
  
  // 観客席を配置
  for (let row = 0; row < 5; row++) {
    for (let col = -4; col <= 4; col++) {
      seats.push(
        <mesh 
          key={`seat-${row}-${col}`}
          position={[col * 2, 0.3, row * 2]}
          castShadow
        >
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
      )
    }
  }

  return <>{seats}</>
}

function StageLights() {
  return (
    <>
      <pointLight position={[-5, 6, -15]} intensity={3} color="#ff0000" castShadow />
      <pointLight position={[0, 6, -15]} intensity={3} color="#00ff00" castShadow />
      <pointLight position={[5, 6, -15]} intensity={3} color="#0000ff" castShadow />
      
      {/* スポットライト風 */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#ffffff"
      />
    </>
  )
}
