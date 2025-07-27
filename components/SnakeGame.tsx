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
    <div className={`min-h-screen bg-gradient-to-br from-game-bg via-game-bg-2 to-game-bg-3 text-white ${
      gameState.isMobile ? 'pb-32' : ''
    }`}>
      {/* 标题 */}
      <div className={`text-center ${gameState.isMobile ? 'py-4' : 'py-8'}`}>
        <h1 className={`font-bold text-snake-head animate-title-glow mb-2 ${
          gameState.isMobile ? 'text-3xl' : 'text-5xl'
        }`}>
          贪吃蛇
        </h1>
        <p className={`text-snake-body ${gameState.isMobile ? 'text-lg' : 'text-xl'}`}>
          SNAKE GAME
        </p>
      </div>
      
      {/* 游戏主体 */}
      <div className={`container mx-auto px-4 ${
        gameState.isMobile 
          ? 'flex flex-col items-center space-y-4' 
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
        <div className="flex flex-col items-center space-y-4">
          <GameBoard
            snake={gameState.snake}
            food={gameState.food}
            isMobile={gameState.isMobile}
          />
          
          {/* 移动端分数面板 - 紧凑版 */}
          {gameState.isMobile && (
            <div className="w-full max-w-sm">
              <div className="glass-card rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-gray-400">分数</div>
                    <div className="text-snake-head font-bold">{gameState.score}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">最高分</div>
                    <div className="text-snake-body font-bold">{gameState.highScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">长度</div>
                    <div className="text-white font-bold">{gameState.snake.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">等级</div>
                    <div className="text-snake-body font-bold">{gameState.level}</div>
                  </div>
                </div>
              </div>
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
      </div>
      
      {/* 移动端触摸控制 - 只在游戏进行时显示 */}
      {gameState.isMobile && gameState.gameStatus === 'playing' && (
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