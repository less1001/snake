import { GameConfig } from '@/types/game'

export const GAME_CONFIG: GameConfig = {
  boardWidth: 20,
  boardHeight: 20,
  initialSnakeLength: 3,
  initialSpeed: 200,
  speedIncrement: 20,
  pointsPerFood: 10,
  levelThreshold: 50,
  maxSpeed: 50
}

export const COLORS = {
  SNAKE_HEAD: '#00f5ff',
  SNAKE_BODY: '#ad7be9',
  FOOD: '#ffed4e',
  BACKGROUND: '#0f0f23',
  GRID: 'rgba(255, 255, 255, 0.05)'
}

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
} as const