import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GameState } from '../App'
import { MinecraftPlayer } from './MinecraftCharacters'

interface PlayerProps {
  camera: THREE.Camera
  onTroubleAction: (points: number, position: THREE.Vector3, type: 'can' | 'mosh' | 'lift' | 'heckle') => void
  gameState: GameState
  onLift?: () => void
  onCanThrow?: (targetPosition: THREE.Vector3) => void
  onHeckle?: (message: string) => void
}

export default function Player({ camera, onTroubleAction, gameState, onLift, onCanThrow, onHeckle }: PlayerProps) {
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0))
  const position = useRef(new THREE.Vector3(0, 1, 0))
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})
  const canJump = useRef(true)
  const [isLifted, setIsLifted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }))
      
      // E: モッシュ
      if (e.key.toLowerCase() === 'e') {
        console.log('厄介行為: モッシュ！')
        onTroubleAction(100, position.current, 'mosh')
      }
      
      // Q: リフト
      if (e.key.toLowerCase() === 'q' && !isLifted) {
        console.log('厄介行為: リフト！')
        setIsLifted(true)
        onTroubleAction(150, position.current, 'lift')
        if (onLift) onLift()
        setTimeout(() => setIsLifted(false), 2000)
      }
      
      // F: 酒缶を投げる
      if (e.key.toLowerCase() === 'f') {
        console.log('厄介行為: 缶投げ！')
        const stageCenter = new THREE.Vector3(0, 1, -15)
        onTroubleAction(200, position.current, 'can')
        if (onCanThrow) onCanThrow(stageCenter)
      }
      
      // R: 野次
      if (e.key.toLowerCase() === 'r') {
        console.log('厄介行為: 野次！')
        const heckleMessages = [
          '男がいるなら、謝罪しろ〜！',
          '責任から逃げるな！',
          'メン地下彼氏は？',
          '風俗に在籍ある？'
        ]
        const message = heckleMessages[Math.floor(Math.random() * heckleMessages.length)]
        onTroubleAction(120, position.current, 'heckle')
        if (onHeckle) onHeckle(message)
      }
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState, onTroubleAction])

  useFrame((state) => {
    if (gameState !== 'playing') return

    const speed = keys['shift'] ? 0.15 : 0.08
    const direction = new THREE.Vector3()
    
    // カメラの向きに基づいて移動方向を計算
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0))

    if (keys['w']) direction.add(forward)
    if (keys['s']) direction.sub(forward)
    if (keys['a']) direction.sub(right)
    if (keys['d']) direction.add(right)

    direction.normalize().multiplyScalar(speed)

    // リフト中は上に持ち上げられる
    let targetY = 1
    if (isLifted) {
      targetY = 2.5 + Math.sin(state.clock.elapsedTime * 5) * 0.1
    }

    // 重力シミュレーション
    if (!isLifted) {
      velocityRef.current.y -= 0.02
      if (position.current.y <= 1) {
        position.current.y = 1
        velocityRef.current.y = 0
      }
    } else {
      // リフト中は目標高度に移動
      position.current.y += (targetY - position.current.y) * 0.1
    }

    // ジャンプ
    if (keys[' '] && canJump.current && position.current.y <= 1.01 && !isLifted) {
      velocityRef.current.y = 0.25
      canJump.current = false
      setTimeout(() => canJump.current = true, 500)
    }

    // 位置更新
    if (!isLifted) {
      position.current.x += direction.x
      position.current.y += velocityRef.current.y
      position.current.z += direction.z
    } else {
      // リフト中も水平移動は可能
      position.current.x += direction.x * 0.5
      position.current.z += direction.z * 0.5
    }

    // カメラ位置をプレイヤーに追従
    camera.position.set(
      position.current.x,
      position.current.y + 0.5,
      position.current.z
    )
  })

  return (
    <>
      <MinecraftPlayer 
        position={[position.current.x, position.current.y, position.current.z]}
        color="#ff6b6b"
      />
      
      {/* リフト中は周りに2人のヲタクが表示される */}
      {isLifted && (
        <>
          <MinecraftPlayer 
            position={[position.current.x - 0.8, 1, position.current.z]}
            color="#4a90e2"
          />
          <MinecraftPlayer 
            position={[position.current.x + 0.8, 1, position.current.z]}
            color="#50c878"
          />
        </>
      )}
    </>
  )
}
