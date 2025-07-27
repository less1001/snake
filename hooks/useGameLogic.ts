'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { GameState, Direction, Position } from '@/types/game'
import { GAME_CONFIG } from '@/constants/game'
import { 
  generateFood, 
  moveSnake, 
  checkCollisions, 
  isPosition, 
  isOppositeDirection,
  calculateLevel,
  calculateSpeed,
  isMobileDevice
} from '@/utils/gameHelpers'
import { audioService } from '@/services/AudioService'
import { storageService } from '@/services/StorageService'

const initialSnake: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
]

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: initialSnake,
    food: generateFood(initialSnake),
    direction: 'RIGHT',
    gameStatus: 'idle',
    score: 0,
    highScore: storageService.getHighScore(),
    level: 1,
    speed: GAME_CONFIG.initialSpeed,
    isNewHighScore: false,
    isMobile: false
  })
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const nextDirectionRef = useRef<Direction>('RIGHT')
  
  // 检测移动设备
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      isMobile: isMobileDevice()
    }))
  }, [])
  
  // 游戏循环
  const gameLoop = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') return prevState
      
      const currentDirection = nextDirectionRef.current
      const newSnake = moveSnake(prevState.snake, currentDirection)
      
      // 检查碰撞
      if (checkCollisions(newSnake)) {
        audioService.playGameOverSound()
        return {
          ...prevState,
          gameStatus: 'gameOver'
        }
      }
      
      // 检查是否吃到食物
      const ateFood = isPosition(newSnake[0], prevState.food)
      let updatedSnake = newSnake
      let newScore = prevState.score
      let newFood = prevState.food
      let isNewHighScore = false
      
      if (ateFood) {
        // 蛇身增长
        updatedSnake = moveSnake(prevState.snake, currentDirection, true)
        newScore = prevState.score + GAME_CONFIG.pointsPerFood
        newFood = generateFood(updatedSnake)
        
        // 检查是否创造新纪录
        if (newScore > prevState.highScore) {
          isNewHighScore = true
          storageService.saveHighScore(newScore)
          audioService.playNewHighScoreSound()
        } else {
          audioService.playEatSound()
        }
        
        // 检查等级提升
        const newLevel = calculateLevel(newScore)
        if (newLevel > prevState.level) {
          audioService.playLevelUpSound()
        }
      }
      
      const level = calculateLevel(newScore)
      const speed = calculateSpeed(level)
      
      return {
        ...prevState,
        snake: updatedSnake,
        food: newFood,
        direction: currentDirection,
        score: newScore,
        highScore: Math.max(newScore, prevState.highScore),
        level,
        speed,
        isNewHighScore
      }
    })
  }, [])
  
  // 开始游戏循环
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, gameState.speed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState.gameStatus, gameState.speed, gameLoop])
  
  // 改变方向
  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState.gameStatus !== 'playing') return
    
    // 防止反向移动
    if (isOppositeDirection(gameState.direction, newDirection)) return
    
    nextDirectionRef.current = newDirection
    audioService.playDirectionChangeSound()
  }, [gameState.gameStatus, gameState.direction])
  
  // 开始游戏
  const startGame = useCallback(() => {
    if (gameState.gameStatus === 'paused') {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
    } else {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
    }
  }, [gameState.gameStatus])
  
  // 暂停游戏
  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }))
  }, [])
  
  // 重新开始游戏
  const restartGame = useCallback(() => {
    const newSnake = initialSnake
    nextDirectionRef.current = 'RIGHT'
    
    setGameState({
      snake: newSnake,
      food: generateFood(newSnake),
      direction: 'RIGHT',
      gameStatus: 'playing',
      score: 0,
      highScore: storageService.getHighScore(),
      level: 1,
      speed: GAME_CONFIG.initialSpeed,
      isNewHighScore: false,
      isMobile: isMobileDevice()
    })
  }, [])
  
  return {
    gameState,
    changeDirection,
    startGame,
    pauseGame,
    restartGame
  }
}