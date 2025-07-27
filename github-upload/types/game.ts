// 位置坐标
export interface Position {
  x: number
  y: number
}

// 移动方向
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

// 游戏状态
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver'

// 蛇的数据结构
export interface Snake {
  body: Position[]
  direction: Direction
  nextDirection: Direction
}

// 食物数据结构
export interface Food {
  position: Position
  type: 'normal' | 'bonus'
  points: number
}

// 游戏状态接口
export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  gameStatus: GameStatus
  score: number
  highScore: number
  level: number
  speed: number
  isNewHighScore: boolean
  isMobile: boolean
}

// 游戏配置
export interface GameConfig {
  boardWidth: number
  boardHeight: number
  initialSnakeLength: number
  initialSpeed: number
  speedIncrement: number
  pointsPerFood: number
  levelThreshold: number
  maxSpeed: number
}