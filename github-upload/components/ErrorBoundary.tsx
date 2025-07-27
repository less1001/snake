'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Game Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-game-bg via-game-bg-2 to-game-bg-3 text-white flex items-center justify-center">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              🐍 游戏遇到问题
            </h2>
            <p className="text-gray-300 mb-6">
              游戏运行时出现了错误，请尝试刷新页面重新开始。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-snake-head text-game-bg font-bold rounded-lg btn-glow hover:bg-snake-head/90 transition-all"
              >
                刷新页面
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="w-full px-6 py-3 bg-snake-body text-white font-semibold rounded-lg btn-glow hover:bg-snake-body/90 transition-all"
              >
                重试
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-400">
                  错误详情 (开发模式)
                </summary>
                <pre className="mt-2 text-xs text-red-300 bg-black/20 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary