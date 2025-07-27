import { Position, Direction } from '@/types/game'
import { GAME_CONFIG, DIRECTIONS } from '@/constants/game'

// 检查两个位置是否相同
export const isPosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

// 获取下一个位置
export const getNextPosition = (position: Position, direction: Direction): Position => {
  const delta = DIRECTIONS[direction]
  return {
    x: position.x + delta.x,
    y: position.y + delta.y
  }
}

// 检查位置是否在边界内
export const isInBounds = (position: Position): boolean => {
  return position.x >= 0 && 
         position.x < GAME_CONFIG.boardWidth && 
         position.y >= 0 && 
         position.y < GAME_CONFIG.boardHeight
}

// 生成随机食物位置
export const generateFood = (snake: Position[]): Position => {
  let newFood: Position
  
  do {
    newFood = {
      x: Math.floor(Math.random() * GAME_CONFIG.boardWidth),
      y: Math.floor(Math.random() * GAME_CONFIG.boardHeight)
    }
  } while (snake.some(segment => isPosition(segment, newFood)))
  
  return newFood
}

// 检查碰撞
export const checkCollisions = (snake: Position[]): boolean => {
  const head = snake[0]
  
  // 检查边界碰撞
  if (!isInBounds(head)) {
    return true
  }
  
  // 检查自身碰撞
  for (let i = 1; i < snake.length; i++) {
    if (isPosition(head, snake[i])) {
      return true
    }
  }
  
  return false
}

// 移动蛇
export const moveSnake = (snake: Position[], direction: Direction, grow: boolean = false): Position[] => {
  const head = snake[0]
  const newHead = getNextPosition(head, direction)
  const newSnake = [newHead, ...snake]
  
  if (!grow) {
    newSnake.pop()
  }
  
  return newSnake
}

// 检查方向是否相反
export const isOppositeDirection = (current: Direction, next: Direction): boolean => {
  const opposites: Record<Direction, Direction> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT'
  }
  return opposites[current] === next
}

// 计算等级
export const calculateLevel = (score: number): number => {
  return Math.floor(score / GAME_CONFIG.levelThreshold) + 1
}

// 计算速度
export const calculateSpeed = (level: number): number => {
  const newSpeed = GAME_CONFIG.initialSpeed - (level - 1) * GAME_CONFIG.speedIncrement
  return Math.max(newSpeed, GAME_CONFIG.maxSpeed)
}

// 检测移动设备
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const isMobileWidth = window.innerWidth < 768
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    return isMobileWidth || isMobileUserAgent
  } catch (error) {
    console.warn('Failed to detect mobile device:', error)
    return false
  }
}