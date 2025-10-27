import { useThree } from '@react-three/fiber'
import { PointerLockControls, Sky } from '@react-three/drei'
import * as THREE from 'three'
import Player from './Player'
import SecurityGuard from './SecurityGuard'
import DynamicStage from './DynamicStage'
import { GameState } from '../App'
import { StageType, getGuardPositions } from '../config/stages'
import { useState } from 'react'
import { CanThrowEffect, MoshEffect, CaptureEffect } from './ParticleSystem'
import ThrowingCan from './ThrowingCan'

interface GameSceneProps {
  onCaught: () => void
  onTroubleAction: (points: number) => void
  gameState: GameState
  stageType: StageType
  onHeckle?: (message: string) => void
  mobileJoystick?: { x: number; y: number }
  mobileAction?: 'mosh' | 'lift' | 'throw' | 'heckle' | 'jump' | null
}

export default function GameScene({ onCaught, onTroubleAction, gameState, stageType, onHeckle: onHeckleProp, mobileJoystick, mobileAction }: GameSceneProps) {
  const { camera } = useThree()
  const guardPositions = getGuardPositions(stageType)
  const [particles, setParticles] = useState<Array<{ id: number; type: 'can' | 'mosh' | 'capture' | 'lift' | 'heckle'; position: THREE.Vector3 }>>([])
  const [throwingCans, setThrowingCans] = useState<Array<{ id: number; start: THREE.Vector3; target: THREE.Vector3 }>>([])

  const handleTroubleAction = (points: number, position: THREE.Vector3, type: 'can' | 'mosh' | 'lift' | 'heckle') => {
    onTroubleAction(points)
    const particleId = Date.now()
    setParticles(prev => [...prev, { id: particleId, type, position: position.clone() }])
  }

  const handleCanThrow = (targetPosition: THREE.Vector3) => {
    const canId = Date.now()
    setThrowingCans(prev => [...prev, { 
      id: canId, 
      start: camera.position.clone(), 
      target: targetPosition 
    }])
  }

  const handleHeckle = (message: string) => {
    if (onHeckleProp) onHeckleProp(message)
  }

  const handleLift = () => {
    // リフトのエフェクトは Player コンポーネント内で処理
  }

  const handleCaught = () => {
    const particleId = Date.now()
    setParticles(prev => [...prev, { id: particleId, type: 'capture', position: camera.position.clone() }])
    setTimeout(() => onCaught(), 500)
  }

  const removeParticle = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }

  return (
    <>
      {/* 空と照明 */}
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, -10]} intensity={2} color="#ff00ff" />
      <pointLight position={[-5, 5, -10]} intensity={2} color="#00ffff" />

      {/* コントロール */}
      <PointerLockControls />

      {/* ライブステージ環境 */}
      <DynamicStage stageType={stageType} />

      {/* プレイヤー */}
      <Player 
        camera={camera}
        onTroubleAction={handleTroubleAction}
        gameState={gameState}
        onLift={handleLift}
        onCanThrow={handleCanThrow}
        onHeckle={handleHeckle}
        mobileJoystick={mobileJoystick}
        mobileAction={mobileAction}
      />

      {/* セキュリティガード */}
      {guardPositions.map((pos, index) => (
        <SecurityGuard
          key={index}
          initialPosition={pos}
          playerCamera={camera}
          onCatchPlayer={handleCaught}
        />
      ))}

      {/* パーティクルエフェクト */}
      {particles.map(particle => {
        if (particle.type === 'can') {
          return <CanThrowEffect key={particle.id} position={particle.position} onComplete={() => removeParticle(particle.id)} />
        } else if (particle.type === 'mosh') {
          return <MoshEffect key={particle.id} position={particle.position} onComplete={() => removeParticle(particle.id)} />
        } else if (particle.type === 'capture') {
          return <CaptureEffect key={particle.id} position={particle.position} onComplete={() => removeParticle(particle.id)} />
        } else if (particle.type === 'lift') {
          return <MoshEffect key={particle.id} position={particle.position} onComplete={() => removeParticle(particle.id)} />
        } else if (particle.type === 'heckle') {
          return <MoshEffect key={particle.id} position={particle.position} onComplete={() => removeParticle(particle.id)} />
        }
        return null
      })}

      {/* 投げられている酒缶 */}
      {throwingCans.map(can => (
        <ThrowingCan
          key={can.id}
          startPosition={can.start}
          targetPosition={can.target}
          onComplete={() => setThrowingCans(prev => prev.filter(c => c.id !== can.id))}
        />
      ))}

      {/* 床 */}
      <Ground />
    </>
  )
}

function Ground() {
  return (
    <mesh position={[0, -0.5, 0]} receiveShadow>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="#1a1a2e" />
    </mesh>
  )
}
