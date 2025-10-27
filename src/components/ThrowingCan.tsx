import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ThrowingCanProps {
  startPosition: THREE.Vector3
  targetPosition: THREE.Vector3
  onComplete: () => void
}

export default function ThrowingCan({ startPosition, targetPosition, onComplete }: ThrowingCanProps) {
  const canRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)
  const velocityRef = useRef(new THREE.Vector3())

  useEffect(() => {
    // 初期速度を計算（放物線）
    const direction = new THREE.Vector3().subVectors(targetPosition, startPosition)
    const distance = direction.length()
    const time = distance / 10 // 飛行時間

    velocityRef.current.set(
      direction.x / time,
      direction.y / time + 5, // 上向きの初速度
      direction.z / time
    )
  }, [startPosition, targetPosition])

  useFrame((_state, delta) => {
    if (!canRef.current) return

    progressRef.current += delta

    // 重力を適用
    velocityRef.current.y -= 0.3

    // 位置更新
    canRef.current.position.x += velocityRef.current.x * delta
    canRef.current.position.y += velocityRef.current.y * delta
    canRef.current.position.z += velocityRef.current.z * delta

    // 回転（投げられている感じ）
    canRef.current.rotation.x += 10 * delta
    canRef.current.rotation.y += 8 * delta

    // ステージに到達したら消える
    if (canRef.current.position.y < 0.5 || progressRef.current > 3) {
      onComplete()
    }
  })

  return (
    <group ref={canRef} position={[startPosition.x, startPosition.y, startPosition.z]}>
      {/* マインクラフト風の缶 */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.25, 0.15]} />
        <meshStandardMaterial color="#90ee90" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* 缶のラベル */}
      <mesh position={[0, 0, 0.076]} castShadow>
        <boxGeometry args={[0.14, 0.15, 0.01]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* ラベルのテキスト部分（赤） */}
      <mesh position={[0, 0.05, 0.08]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.005]} />
        <meshStandardMaterial color="#ff1744" />
      </mesh>
      
      {/* ラベルのテキスト部分（赤） */}
      <mesh position={[0, -0.02, 0.08]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.005]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
    </group>
  )
}
