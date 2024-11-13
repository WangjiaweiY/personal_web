interface Window {
  $loadingBar?: {
    start: () => void
    finish: () => void
  }
  $message?: {
    success: (message: string) => void
    error: (message: string) => void
  }
} 