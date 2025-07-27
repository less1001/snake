'use client'

import React from 'react'
import GameBoard from './GameBoard'
import ScorePanel from './ScorePanel'
import ControlPanel from './ControlPanel'
import TouchControls from './TouchControls'
import GameOverlay from './GameOverlay'
import { useGameLogic } from '@/hooks/useGameLogic'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { useTouchControls } from '@/hooks/useTouchControls'

const SnakeGame: React.FC = () => {
  const {
    gameState,
    changeDirection,
    startGame,
    pauseGame,
    restartGame
  } = useGameLogic()
  
  // 键盘控制
  useKeyboardControls({
    gameStatus: gameState.gameStatus,
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onStart: startGame,
    onRestart: restartGame
  })
  
  // 触摸控制
  useTouchControls({
    gameStatus: gameState.gameStatus,
    onDirectionChange: changeDirection,
    isMobile: gameState.isMobile
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg via-game-bg-2 to-game-bg-3 text-white">
      {/* 标题 */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold text-snake-head animate-title-glow mb-2">
          贪吃蛇
        </h1>
        <p className="text-xl text-snake-body">SNAKE GAME</p>
      </div>
      
      {/* 游戏主体 */}
      <div className={`container mx-auto px-4 ${
        gameState.isMobile 
          ? 'flex flex-col items-center space-y-6' 
          : 'grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl'
      }`}>
        
        {/* 左侧面板 - 桌面端 */}
        {!gameState.isMobile && (
          <div className="space-y-6">
            <ScorePanel
              score={gameState.score}
              highScore={gameState.highScore}
              level={gameState.level}
              snakeLength={gameState.snake.length}
              isNewHighScore={gameState.isNewHighScore}
            />
          </div>
        )}
        
        {/* 游戏区域 */}
        <div className="flex flex-col items-center space-y-6">
          <GameBoard
            snake={gameState.snake}
            food={gameState.food}
            isMobile={gameState.isMobile}
          />
          
          {/* 移动端分数面板 */}
          {gameState.isMobile && (
            <div className="w-full max-w-sm">
              <ScorePanel
                score={gameState.score}
                highScore={gameState.highScore}
                level={gameState.level}
                snakeLength={gameState.snake.length}
                isNewHighScore={gameState.isNewHighScore}
              />
            </div>
          )}
        </div>
        
        {/* 右侧面板 - 桌面端 */}
        {!gameState.isMobile && (
          <div className="space-y-6">
            <ControlPanel
              gameStatus={gameState.gameStatus}
              onStart={startGame}
              onPause={pauseGame}
              onRestart={restartGame}
              isMobile={gameState.isMobile}
            />
          </div>
        )}
        
        {/* 移动端控制面板 */}
        {gameState.isMobile && (
          <div className="w-full max-w-sm">
            <ControlPanel
              gameStatus={gameState.gameStatus}
              onStart={startGame}
              onPause={pauseGame}
              onRestart={restartGame}
              isMobile={gameState.isMobile}
            />
          </div>
        )}
      </div>
      
      {/* 移动端触摸控制 */}
      {gameState.isMobile && (
        <TouchControls
          onDirectionChange={changeDirection}
          onPause={pauseGame}
          onRestart={restartGame}
          disabled={gameState.gameStatus !== 'playing'}
        />
      )}
      
      {/* 游戏覆盖层 */}
      <GameOverlay
        gameStatus={gameState.gameStatus}
        score={gameState.score}
        highScore={gameState.highScore}
        isNewHighScore={gameState.isNewHighScore}
        onStart={startGame}
        onRestart={restartGame}
      />
    </div>
  )
}

export default SnakeGame