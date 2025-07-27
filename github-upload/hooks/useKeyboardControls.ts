'use client'

import { useEffect } from 'react'
import { Direction, GameStatus } from '@/types/game'

interface UseKeyboardControlsProps {
  gameStatus: GameStatus
  onDirectionChange: (direction: Direction) => void
  onPause: () => void
  onStart: () => void
  onRestart: () => void
}

export const useKeyboardControls = ({
  gameStatus,
  onDirectionChange,
  onPause,
  onStart,
  onRestart
}: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      
      // 防止页面滚动
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
        event.preventDefault()
      }
      
      // 方向控制
      if (gameStatus === 'playing') {
        switch (key) {
          case 'arrowup':
          case 'w':
            onDirectionChange('UP')
            break
          case 'arrowdown':
          case 's':
            onDirectionChange('DOWN')
            break
          case 'arrowleft':
          case 'a':
            onDirectionChange('LEFT')
            break
          case 'arrowright':
          case 'd':
            onDirectionChange('RIGHT')
            break
        }
      }
      
      // 游戏控制
      switch (key) {
        case 'p':
        case ' ':
          if (gameStatus === 'playing') {
            onPause()
          } else if (gameStatus === 'paused') {
            onStart()
          }
          break
        case 'r':
          if (gameStatus === 'gameOver' || gameStatus === 'playing' || gameStatus === 'paused') {
            onRestart()
          }
          break
        case 'enter':
          if (gameStatus === 'idle') {
            onStart()
          } else if (gameStatus === 'gameOver') {
            onRestart()
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameStatus, onDirectionChange, onPause, onStart, onRestart])
}