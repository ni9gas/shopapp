interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface TelegramWebApp {
  ready: () => void
  initDataUnsafe: {
    user?: TelegramUser
  }
  showAlert: (message: string) => void
  showPopup: (params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: string
      text: string
    }>
  }) => void
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp
  }
}

