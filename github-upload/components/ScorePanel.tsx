'use client'

import React from 'react'

interface ScorePanelProps {
  score: number
  highScore: number
  level: number
  snakeLength: number
  isNewHighScore: boolean
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  score,
  highScore,
  level,
  snakeLength,
  isNewHighScore
}) => {
  return (
    <div className="glass-card rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-snake-head text-center mb-4">
        游戏统计
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">当前分数:</span>
          <span className="text-2xl font-bold text-snake-head">
            {score.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">最高分:</span>
          <span 
            className={`text-xl font-bold ${
              isNewHighScore 
                ? 'text-food animate-pulse' 
                : 'text-snake-body'
            }`}
          >
            {highScore.toLocaleString()}
            {isNewHighScore && (
              <span className="ml-2 text-sm">🎉 新纪录!</span>
            )}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">蛇长度:</span>
          <span className="text-lg font-semibold text-white">
            {snakeLength}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">等级:</span>
          <span className="text-lg font-semibold text-snake-body">
            {level}
          </span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-center text-sm text-gray-400">
          <p>吃食物得分: +10</p>
          <p>等级提升: 每50分</p>
        </div>
      </div>
    </div>
  )
}

export default ScorePanel