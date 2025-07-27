'use client'

import React from 'react'
import { GameStatus } from '@/types/game'
import { audioService } from '@/services/AudioService'

interface ControlPanelProps {
  gameStatus: GameStatus
  onStart: () => void
  onPause: () => void
  onRestart: () => void
  isMobile: boolean
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  gameStatus,
  onStart,
  onPause,
  onRestart,
  isMobile
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(true)
  
  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    audioService.setEnabled(newState)
  }
  
  const getMainButtonText = () => {
    switch (gameStatus) {
      case 'idle':
        return '开始游戏'
      case 'playing':
        return '暂停'
      case 'paused':
        return '继续'
      case 'gameOver':
        return '重新开始'
      default:
        return '开始游戏'
    }
  }
  
  const handleMainButtonClick = () => {
    switch (gameStatus) {
      case 'idle':
        onStart()
        break
      case 'playing':
        onPause()
        break
      case 'paused':
        onStart()
        break
      case 'gameOver':
        onRestart()
        break
    }
  }
  
  return (
    <div className="glass-card rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-snake-head text-center mb-4">
        游戏控制
      </h2>
      
      <div className="space-y-3">
        <button
          onClick={handleMainButtonClick}
          className="w-full py-3 px-4 bg-snake-head text-game-bg font-bold rounded-lg btn-glow hover:bg-snake-head/90 transition-all"
        >
          {getMainButtonText()}
        </button>
        
        {gameStatus !== 'idle' && (
          <button
            onClick={onRestart}
            className="w-full py-2 px-4 bg-snake-body text-white font-semibold rounded-lg btn-glow hover:bg-snake-body/90 transition-all"
          >
            重新开始
          </button>
        )}
        
        <button
          onClick={toggleSound}
          className={`w-full py-2 px-4 font-semibold rounded-lg transition-all ${
            soundEnabled
              ? 'bg-food text-game-bg hover:bg-food/90'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          音效: {soundEnabled ? '开启' : '关闭'}
        </button>
      </div>
      
      {!isMobile && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold text-snake-body mb-2">
            键盘控制:
          </h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>↑↓←→ 或 WASD: 移动</p>
            <p>P: 暂停/继续</p>
            <p>R: 重新开始</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlPanel