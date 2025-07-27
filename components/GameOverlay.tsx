'use client'

import React from 'react'
import { GameStatus } from '@/types/game'

interface GameOverlayProps {
  gameStatus: GameStatus
  score: number
  highScore: number
  isNewHighScore: boolean
  onStart: () => void
  onRestart: () => void
}

const GameOverlay: React.FC<GameOverlayProps> = ({
  gameStatus,
  score,
  highScore,
  isNewHighScore,
  onStart,
  onRestart
}) => {
  if (gameStatus === 'playing') return null
  
  const renderContent = () => {
    switch (gameStatus) {
      case 'idle':
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-snake-head mb-4 animate-title-glow">
              贪吃蛇
            </h2>
            <p className="text-xl text-snake-body mb-8">SNAKE GAME</p>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              使用方向键或WASD控制蛇的移动，吃掉食物获得分数，避免撞到边界或自己！
            </p>
            <button
              onClick={onStart}
              className="px-8 py-4 bg-snake-head text-game-bg font-bold text-xl rounded-lg btn-glow hover:bg-snake-head/90 transition-all"
            >
              开始游戏
            </button>
          </div>
        )
      
      case 'paused':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-food mb-4">
              游戏暂停
            </h2>
            <p className="text-gray-300 mb-8">
              按P键或点击继续按钮恢复游戏
            </p>
            <button
              onClick={onStart}
              className="px-8 py-4 bg-snake-head text-game-bg font-bold text-xl rounded-lg btn-glow hover:bg-snake-head/90 transition-all"
            >
              继续游戏
            </button>
          </div>
        )
      
      case 'gameOver':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              游戏结束
            </h2>
            
            {isNewHighScore && (
              <div className="mb-6">
                <p className="text-2xl font-bold text-food animate-pulse mb-2">
                  🎉 新纪录！🎉
                </p>
                <p className="text-snake-body">
                  恭喜你创造了新的最高分！
                </p>
              </div>
            )}
            
            <div className="mb-8 space-y-2">
              <p className="text-xl text-white">
                最终分数: <span className="font-bold text-snake-head">{score.toLocaleString()}</span>
              </p>
              <p className="text-lg text-gray-300">
                最高分: <span className="font-bold text-snake-body">{highScore.toLocaleString()}</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={onRestart}
                className="block w-full px-8 py-4 bg-snake-head text-game-bg font-bold text-xl rounded-lg btn-glow hover:bg-snake-head/90 transition-all"
              >
                再来一局
              </button>
              <button
                onClick={() => window.location.reload()}
                className="block w-full px-6 py-3 bg-snake-body text-white font-semibold rounded-lg btn-glow hover:bg-snake-body/90 transition-all"
              >
                返回首页
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        {renderContent()}
      </div>
    </div>
  )
}

export default GameOverlay