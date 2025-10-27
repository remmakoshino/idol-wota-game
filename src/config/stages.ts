import * as THREE from 'three'

export type StageType = 'livehouse' | 'hall' | 'arena'

export interface StageConfig {
  name: string
  size: { width: number; depth: number }
  guardCount: number
  lightingIntensity: number
  audienceRows: number
  audienceCols: number
  difficulty: 'easy' | 'normal' | 'hard'
}

export const STAGES: Record<StageType, StageConfig> = {
  livehouse: {
    name: '小規模ライブハウス',
    size: { width: 20, depth: 30 },
    guardCount: 2,
    lightingIntensity: 1.5,
    audienceRows: 3,
    audienceCols: 5,
    difficulty: 'easy'
  },
  hall: {
    name: '中規模ホール',
    size: { width: 40, depth: 50 },
    guardCount: 4,
    lightingIntensity: 2,
    audienceRows: 6,
    audienceCols: 9,
    difficulty: 'normal'
  },
  arena: {
    name: '大規模アリーナ',
    size: { width: 60, depth: 80 },
    guardCount: 6,
    lightingIntensity: 2.5,
    audienceRows: 10,
    audienceCols: 15,
    difficulty: 'hard'
  }
}

export function getGuardPositions(stageType: StageType): THREE.Vector3[] {
  const config = STAGES[stageType]
  const positions: THREE.Vector3[] = []
  const { width, depth } = config.size
  
  switch (stageType) {
    case 'livehouse':
      positions.push(
        new THREE.Vector3(-5, 0, -10),
        new THREE.Vector3(5, 0, -10)
      )
      break
    case 'hall':
      positions.push(
        new THREE.Vector3(-8, 0, -15),
        new THREE.Vector3(8, 0, -15),
        new THREE.Vector3(-8, 0, 5),
        new THREE.Vector3(8, 0, 5)
      )
      break
    case 'arena':
      positions.push(
        new THREE.Vector3(-12, 0, -20),
        new THREE.Vector3(0, 0, -20),
        new THREE.Vector3(12, 0, -20),
        new THREE.Vector3(-12, 0, 0),
        new THREE.Vector3(12, 0, 0),
        new THREE.Vector3(0, 0, 10)
      )
      break
  }
  
  return positions
}
