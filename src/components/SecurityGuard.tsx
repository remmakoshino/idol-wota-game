import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MinecraftSecurityGuard } from './MinecraftCharacters'

interface SecurityGuardProps {
  initialPosition: THREE.Vector3
  playerCamera: THREE.Camera
  onCatchPlayer: () => void
}

export default function SecurityGuard({ 
  initialPosition, 
  playerCamera,
  onCatchPlayer 
}: SecurityGuardProps) {
  const position = useRef(new THREE.Vector3(initialPosition.x, initialPosition.y + 1, initialPosition.z))

  useFrame(() => {
    // プレイヤーの位置を取得
    const playerPos = playerCamera.position
    
    // プレイヤーまでの方向と距離を計算
    const direction = new THREE.Vector3()
      .subVectors(playerPos, position.current)
    
    const distance = direction.length()
    direction.y = 0
    direction.normalize()

    // プレイヤーに向かって追跡
    const chaseSpeed = 0.06
    if (distance > 1.5) {
      position.current.x += direction.x * chaseSpeed
      position.current.z += direction.z * chaseSpeed
    }

    // プレイヤーを捕まえた判定
    if (distance < 1.5) {
      onCatchPlayer()
    }
  })

  return (
    <MinecraftSecurityGuard 
      position={[position.current.x, position.current.y, position.current.z]}
    />
  )
}
