import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
  position: THREE.Vector3
  color: string
  count?: number
  spread?: number
  lifetime?: number
  onComplete?: () => void
}

export default function ParticleSystem({ 
  position, 
  color, 
  count = 50,
  spread = 2,
  lifetime = 1.5,
  onComplete
}: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<THREE.Vector3[]>([])
  const lifetimeRef = useRef(0)
  const initializedRef = useRef(false)

  // パーティクルの初期化
  if (!initializedRef.current) {
    const positions = new Float32Array(count * 3)
    velocitiesRef.current = []

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x
      positions[i * 3 + 1] = position.y
      positions[i * 3 + 2] = position.z

      // ランダムな速度ベクトル
      velocitiesRef.current.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          Math.random() * spread * 0.8,
          (Math.random() - 0.5) * spread
        )
      )
    }

    initializedRef.current = true
  }

  useFrame((_state, delta) => {
    if (!particlesRef.current) return

    lifetimeRef.current += delta

    if (lifetimeRef.current > lifetime) {
      if (onComplete) onComplete()
      return
    }

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const velocity = velocitiesRef.current[i]
      
      // 位置更新
      positions[i * 3] += velocity.x * delta
      positions[i * 3 + 1] += velocity.y * delta - 9.8 * delta * delta // 重力
      positions[i * 3 + 2] += velocity.z * delta

      // 速度減衰
      velocity.multiplyScalar(0.98)
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true

    // フェードアウト
    const opacity = 1 - (lifetimeRef.current / lifetime)
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.opacity = opacity
    }
  })

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = position.x
    positions[i * 3 + 1] = position.y
    positions[i * 3 + 2] = position.z
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        color={color}
        size={0.1}
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  )
}

// プリセットエフェクト
export function CanThrowEffect({ position, onComplete }: { position: THREE.Vector3, onComplete?: () => void }) {
  return <ParticleSystem position={position} color="#ffd700" count={30} spread={1.5} lifetime={1} onComplete={onComplete} />
}

export function MoshEffect({ position, onComplete }: { position: THREE.Vector3, onComplete?: () => void }) {
  return <ParticleSystem position={position} color="#ff0000" count={40} spread={2} lifetime={1.2} onComplete={onComplete} />
}

export function CaptureEffect({ position, onComplete }: { position: THREE.Vector3, onComplete?: () => void }) {
  return <ParticleSystem position={position} color="#ffffff" count={60} spread={3} lifetime={2} onComplete={onComplete} />
}
