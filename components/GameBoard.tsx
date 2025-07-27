'use client'

import React from 'react'
import { Position } from '@/types/game'
import { GAME_CONFIG } from '@/constants/game'
import { isPosition } from '@/utils/gameHelpers'

interface GameBoardProps {
  snake: Position[]
  food: Position
  isMobile: boolean
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, isMobile }) => {
  const cellSize = isMobile ? 'w-4 h-4' : 'w-6 h-6'
  const boardSize = isMobile ? 'w-80 h-80' : 'w-96 h-96'
  
  const renderCell = (x: number, y: number) => {
    const position = { x, y }
    const isSnakeHead = snake.length > 0 && isPosition(snake[0], position)
    const isSnakeBody = snake.slice(1).some(segment => isPosition(segment, position))
    const isFood = isPosition(food, position)
    
    let cellClass = `${cellSize} border border-white/5 transition-all duration-100`
    
    if (isSnakeHead) {
      cellClass += ' snake-head'
    } else if (isSnakeBody) {
      cellClass += ' snake-body'
    } else if (isFood) {
      cellClass += ' food'
    } else {
      cellClass += ' bg-transparent'
    }
    
    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
      />
    )
  }
  
  const renderBoard = () => {
    const cells = []
    for (let y = 0; y < GAME_CONFIG.boardHeight; y++) {
      for (let x = 0; x < GAME_CONFIG.boardWidth; x++) {
        cells.push(renderCell(x, y))
      }
    }
    return cells
  }
  
  return (
    <div className={`${boardSize} mx-auto glass-card rounded-lg p-2 game-grid`}>
      <div 
        className="grid gap-0 h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${GAME_CONFIG.boardWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GAME_CONFIG.boardHeight}, minmax(0, 1fr))`
        }}
      >
        {renderBoard()}
      </div>
    </div>
  )
}

export default GameBoard