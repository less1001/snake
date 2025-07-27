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
    w-10 h-10 rounded-md glass-card flex items-center justify-center
    text-white font-bold text-base transition-all duration-150
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 btn-glow'}
  `
  
  const handleDirectionClick = (direction: Direction) => {
    if (!disabled) {
      onDirectionChange(direction)
    }
  }
  
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-card rounded-xl p-3">
        {/* 方向控制 - 更紧凑 */}
        <div className="grid grid-cols-3 gap-1 mb-3">
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
          <div className="w-10 h-10"></div>
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
        
        {/* 游戏控制按钮 - 更小 */}
        <div className="flex gap-2 justify-center">
          <button
            className="px-3 py-1 bg-snake-body text-white rounded-md text-sm font-semibold btn-glow"
            onClick={onPause}
          >
            暂停
          </button>
          <button
            className="px-3 py-1 bg-food text-game-bg rounded-md text-sm font-semibold btn-glow"
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