class AudioService {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true
  
  constructor() {
    // 延迟初始化，避免在服务端渲染时出错
    if (typeof window !== 'undefined') {
      this.initAudioContext()
    }
  }
  
  private initAudioContext() {
    try {
      if (typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass()
        }
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
      this.audioContext = null
    }
  }
  
  private playSound(frequency: number, duration: number = 0.1, type: OscillatorType = 'square') {
    if (!this.enabled || !this.audioContext) return
    
    try {
      // 确保音频上下文处于运行状态
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.warn('Audio playback failed:', error)
      // 如果音频播放失败，尝试重新初始化
      this.initAudioContext()
    }
  }
  
  // 预定义音效
  playEatSound() { 
    this.playSound(523, 0.1) 
  }
  
  playGameOverSound() { 
    this.playSound(150, 0.5) 
  }
  
  playLevelUpSound() { 
    this.playSound(659, 0.3) 
  }
  
  playDirectionChangeSound() { 
    this.playSound(400, 0.05) 
  }
  
  playNewHighScoreSound() {
    // 播放一系列上升音调
    setTimeout(() => this.playSound(523, 0.2), 0)
    setTimeout(() => this.playSound(659, 0.2), 200)
    setTimeout(() => this.playSound(784, 0.3), 400)
  }
  
  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }
  
  isEnabled(): boolean {
    return this.enabled
  }
}

export const audioService = new AudioService()