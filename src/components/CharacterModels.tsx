import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// シンプルな人型キャラクターを生成（GLTFの代替）
export function HumanoidCharacter({ 
  position, 
  color = '#ff6b6b',
  scale = 1 
}: { 
  position: [number, number, number]
  color?: string
  scale?: number 
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // 微妙な呼吸アニメーション
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 頭 */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f4c2a8" />
      </mesh>

      {/* 体 */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 左腕 */}
      <mesh position={[-0.25, 1.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 右腕 */}
      <mesh position={[0.25, 1.2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 左脚 */}
      <mesh position={[-0.1, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* 右脚 */}
      <mesh position={[0.1, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* 目 */}
      <mesh position={[-0.05, 1.65, 0.12]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.05, 1.65, 0.12]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

// マッチョなセキュリティガード
export function MuscularGuard({ 
  position 
}: { 
  position: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position} scale={1.3}>
      {/* 頭 - 大きめ */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 首 - 太い */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 体 - マッチョ */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.7, 0.35]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* 左腕 - 筋肉質 */}
      <mesh position={[-0.35, 1.15, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 左前腕 */}
      <mesh position={[-0.45, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 右腕 - 筋肉質 */}
      <mesh position={[0.35, 1.15, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 右前腕 */}
      <mesh position={[0.45, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 左脚 - 太い */}
      <mesh position={[-0.15, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* 右脚 - 太い */}
      <mesh position={[0.15, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* サングラス */}
      <mesh position={[0, 1.7, 0.15]} castShadow>
        <boxGeometry args={[0.25, 0.05, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 胸筋の強調 */}
      <mesh position={[-0.1, 1.2, 0.15]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.1, 1.2, 0.15]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}
