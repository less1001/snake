class StorageService {
  private memoryStorage: Record<string, any> = {}
  
  private isLocalStorageAvailable(): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
  
  setItem(key: string, value: any): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        this.memoryStorage[key] = value
      }
    } catch (error) {
      console.warn('Failed to save to storage:', error)
      this.memoryStorage[key] = value
    }
  }
  
  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (this.isLocalStorageAvailable()) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } else {
        return this.memoryStorage[key] ?? defaultValue
      }
    } catch (error) {
      console.warn('Failed to read from storage:', error)
      return this.memoryStorage[key] ?? defaultValue
    }
  }
  
  removeItem(key: string): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(key)
      }
      delete this.memoryStorage[key]
    } catch (error) {
      console.warn('Failed to remove from storage:', error)
      delete this.memoryStorage[key]
    }
  }
  
  // 游戏特定方法
  saveHighScore(score: number): void {
    this.setItem('snake-high-score', score)
  }
  
  getHighScore(): number {
    return this.getItem('snake-high-score', 0)
  }
  
  saveSettings(settings: any): void {
    this.setItem('snake-settings', settings)
  }
  
  getSettings(): any {
    return this.getItem('snake-settings', {
      soundEnabled: true,
      animationsEnabled: true
    })
  }
}

export const storageService = new StorageService()