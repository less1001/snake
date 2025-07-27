'use client'

import React from 'react'
import { Direction } from '@/types/game'

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void
  onPause: () => void
  onRestart: () => void
  disabled: boolean
}

const TouchControls: React.FC<TouchControlsProps> = ({
  onDirectionChange,
  onPause,
  onRestart,
  disabled
}) => {
  const buttonClass = `
    w-12 h-12 rounded-lg glass-card flex items-center justify-center
    text-white font-bold text-lg transition-all duration-150
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 btn-glow'}
  `
  
  const handleDirectionClick = (direction: Direction) => {
    if (!disabled) {
      onDirectionChange(direction)
    }
  }
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-card rounded-2xl p-4">
        {/* 方向控制 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <button
            className={buttonClass}
            onClick={() => handleDirectionClick('UP')}
            disabled={disabled}
          >
            ↑
          </button>
          <div></div>
          
          <button
            className={buttonClass}
            onClick={() => handleDirectionClick('LEFT')}
            disabled={disabled}
          >
            ←
          </button>
          <div className="w-12 h-12"></div>
          <button
            className={buttonClass}
            onClick={() => handleDirectionClick('RIGHT')}
            disabled={disabled}
          >
            →
          </button>
          
          <div></div>
          <button
            className={buttonClass}
            onClick={() => handleDirectionClick('DOWN')}
            disabled={disabled}
          >
            ↓
          </button>
          <div></div>
        </div>
        
        {/* 游戏控制按钮 */}
        <div className="flex gap-2 justify-center">
          <button
            className="px-4 py-2 bg-snake-body text-white rounded-lg font-semibold btn-glow"
            onClick={onPause}
          >
            暂停
          </button>
          <button
            className="px-4 py-2 bg-food text-game-bg rounded-lg font-semibold btn-glow"
            onClick={onRestart}
          >
            重启
          </button>
        </div>
      </div>
    </div>
  )
}

export default TouchControls