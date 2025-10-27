import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// マインクラフト風プレイヤー
export function MinecraftPlayer({ 
  position, 
  color = '#ff6b6b'
}: { 
  position: [number, number, number]
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // 微妙な揺れ
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.01
      
      // 腕と脚のアニメーション（歩行）
      const walkCycle = Math.sin(state.clock.elapsedTime * 3) * 0.3
      
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = walkCycle
        rightLegRef.current.rotation.x = -walkCycle
      }
      
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -walkCycle * 0.5
        rightArmRef.current.rotation.x = walkCycle * 0.5
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* 頭（立方体） */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f4c2a8" />
      </mesh>

      {/* 顔のパーツ */}
      {/* 目 */}
      <mesh position={[-0.1, 1.5, 0.21]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.5, 0.21]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 口 */}
      <mesh position={[0, 1.4, 0.21]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 体（立方体） */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 左腕 */}
      <mesh 
        ref={leftArmRef}
        position={[-0.25, 1.1, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 右腕 */}
      <mesh 
        ref={rightArmRef}
        position={[0.25, 1.1, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 左脚 */}
      <mesh 
        ref={leftLegRef}
        position={[-0.1, 0.3, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>

      {/* 右脚 */}
      <mesh 
        ref={rightLegRef}
        position={[0.1, 0.3, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>
    </group>
  )
}

// マインクラフト風セキュリティガード（マッチョ）
export function MinecraftSecurityGuard({ 
  position 
}: { 
  position: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position} scale={1.4}>
      {/* 頭（大きめ） */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* サングラス */}
      <mesh position={[0, 1.6, 0.26]} castShadow>
        <boxGeometry args={[0.45, 0.15, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 口（厳しい表情） */}
      <mesh position={[0, 1.45, 0.26]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 首（太い） */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.25]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 体（マッチョ・大きめ） */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.7, 0.9, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* セキュリティバッジ */}
      <mesh position={[0, 0.9, 0.21]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.02]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      <mesh position={[0, 0.9, 0.22]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 左腕（太い） */}
      <mesh position={[-0.45, 0.8, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 左前腕 */}
      <mesh position={[-0.45, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.22]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 右腕（太い） */}
      <mesh position={[0.45, 0.8, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 右前腕 */}
      <mesh position={[0.45, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.22]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 左脚（太い） */}
      <mesh position={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* 右脚（太い） */}
      <mesh position={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>

      {/* ベルト */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.75, 0.1, 0.42]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[0, 0.25, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </group>
  )
}

// マインクラフト風アイドル
export function MinecraftIdol({ 
  position,
  color = '#ff1493'
}: { 
  position: [number, number, number]
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // アイドルらしく可愛く動く
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* 頭 */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#ffe5e5" />
      </mesh>

      {/* 髪（ツインテール風） */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.45, 0.15, 0.45]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      {/* 左ツインテール */}
      <mesh position={[-0.3, 1.5, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      {/* 右ツインテール */}
      <mesh position={[0.3, 1.5, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>

      {/* 目（大きめ） */}
      <mesh position={[-0.08, 1.52, 0.21]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.01]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      <mesh position={[0.08, 1.52, 0.21]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.01]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      {/* 瞳 */}
      <mesh position={[-0.08, 1.52, 0.22]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 1.52, 0.22]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 口（笑顔） */}
      <mesh position={[0, 1.42, 0.21]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.01]} />
        <meshStandardMaterial color="#ff6b9d" />
      </mesh>

      {/* 体（アイドル衣装） */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* リボン */}
      <mesh position={[0, 1.2, 0.1]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.08]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>

      {/* 左腕 */}
      <mesh position={[-0.25, 1.0, 0]} castShadow rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 右腕 */}
      <mesh position={[0.25, 1.0, 0]} castShadow rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* スカート */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>

      {/* 左脚 */}
      <mesh position={[-0.1, 0.15, 0]} castShadow>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#ffe5e5" />
      </mesh>

      {/* 右脚 */}
      <mesh position={[0.1, 0.15, 0]} castShadow>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#ffe5e5" />
      </mesh>

      {/* 靴 */}
      <mesh position={[-0.1, -0.05, 0]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.18]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, -0.05, 0]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.18]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
