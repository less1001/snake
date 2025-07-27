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
  
  if (gameState.isMobile) {
    // 移动端布局 - 最大化利用屏幕空间
    return (
      <div className="h-screen bg-gradient-to-br from-game-bg via-game-bg-2 to-game-bg-3 text-white flex flex-col overflow-hidden">
        {/* 标题 - 极简 */}
        <div className="text-center py-1">
          <h1 className="text-xl font-bold text-snake-head">贪吃蛇</h1>
        </div>
        
        {/* 分数信息 - 顶部横条 */}
        <div className="px-4 pb-2">
          <div className="glass-card rounded-lg p-2">
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-400">分数</div>
                <div className="text-snake-head font-bold">{gameState.score}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">最高</div>
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
        
        {/* 游戏板 - 占据主要空间 */}
        <div className="flex-1 flex items-center justify-center px-4">
          <GameBoard
            snake={gameState.snake}
            food={gameState.food}
            isMobile={gameState.isMobile}
          />
        </div>
        
        {/* 底部控制区域 */}
        <div className="px-4 pb-4">
          {/* 触摸控制 - 游戏进行时 */}
          {gameState.gameStatus === 'playing' && (
            <div className="glass-card rounded-xl p-3">
              {/* 方向控制 */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div></div>
                <button
                  className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white font-bold text-lg active:scale-95 btn-glow"
                  onClick={() => changeDirection('UP')}
                >
                  ↑
                </button>
                <div></div>
                
                <button
                  className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white font-bold text-lg active:scale-95 btn-glow"
                  onClick={() => changeDirection('LEFT')}
                >
                  ←
                </button>
                <div className="w-12 h-12"></div>
                <button
                  className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white font-bold text-lg active:scale-95 btn-glow"
                  onClick={() => changeDirection('RIGHT')}
                >
                  →
                </button>
                
                <div></div>
                <button
                  className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white font-bold text-lg active:scale-95 btn-glow"
                  onClick={() => changeDirection('DOWN')}
                >
                  ↓
                </button>
                <div></div>
              </div>
              
              {/* 控制按钮 */}
              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-snake-body text-white rounded-lg font-semibold btn-glow"
                  onClick={pauseGame}
                >
                  暂停
                </button>
                <button
                  className="px-4 py-2 bg-food text-game-bg rounded-lg font-semibold btn-glow"
                  onClick={restartGame}
                >
                  重启
                </button>
              </div>
            </div>
          )}
          
          {/* 非游戏状态的控制按钮 */}
          {gameState.gameStatus !== 'playing' && (
            <div className="flex gap-3 justify-center">
              <button
                onClick={gameState.gameStatus === 'paused' ? startGame : startGame}
                className="px-6 py-3 bg-snake-head text-game-bg font-bold rounded-lg btn-glow text-lg"
              >
                {gameState.gameStatus === 'paused' ? '继续' : '开始'}
              </button>
              {gameState.gameStatus !== 'idle' && (
                <button
                  onClick={restartGame}
                  className="px-6 py-3 bg-snake-body text-white font-semibold rounded-lg btn-glow text-lg"
                >
                  重新开始
                </button>
              )}
            </div>
          )}
        </div>
        
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

  // 桌面端布局保持不变
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
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
        
        {/* 左侧面板 */}
        <div className="space-y-6">
          <ScorePanel
            score={gameState.score}
            highScore={gameState.highScore}
            level={gameState.level}
            snakeLength={gameState.snake.length}
            isNewHighScore={gameState.isNewHighScore}
          />
        </div>
        
        {/* 游戏区域 */}
        <div className="flex flex-col items-center space-y-6">
          <GameBoard
            snake={gameState.snake}
            food={gameState.food}
            isMobile={gameState.isMobile}
          />
        </div>
        
        {/* 右侧面板 */}
        <div className="space-y-6">
          <ControlPanel
            gameStatus={gameState.gameStatus}
            onStart={startGame}
            onPause={pauseGame}
            onRestart={restartGame}
            isMobile={gameState.isMobile}
          />
        </div>
      </div>
      
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