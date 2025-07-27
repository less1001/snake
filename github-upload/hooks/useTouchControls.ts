'use client'

import { useEffect, useRef } from 'react'
import { Direction, GameStatus } from '@/types/game'

interface UseTouchControlsProps {
  gameStatus: GameStatus
  onDirectionChange: (direction: Direction) => void
  isMobile: boolean
}

export const useTouchControls = ({
  gameStatus,
  onDirectionChange,
  isMobile
}: UseTouchControlsProps) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  
  useEffect(() => {
    if (!isMobile || gameStatus !== 'playing') return
    
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY
      }
    }
    
    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchStartRef.current) return
      
      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      
      const minSwipeDistance = 30
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)
      
      // 确保滑动距离足够
      if (Math.max(absDeltaX, absDeltaY) < minSwipeDistance) {
        touchStartRef.current = null
        return
      }
      
      // 确定滑动方向
      if (absDeltaX > absDeltaY) {
        // 水平滑动
        if (deltaX > 0) {
          onDirectionChange('RIGHT')
        } else {
          onDirectionChange('LEFT')
        }
      } else {
        // 垂直滑动
        if (deltaY > 0) {
          onDirectionChange('DOWN')
        } else {
          onDirectionChange('UP')
        }
      }
      
      touchStartRef.current = null
    }
    
    const handleTouchMove = (event: TouchEvent) => {
      // 防止页面滚动
      event.preventDefault()
    }
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isMobile, gameStatus, onDirectionChange])
}