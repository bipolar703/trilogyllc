interface BotpressWebChat {
  init: (config: any) => void;
  sendEvent: (event: { type: string }) => void;
}

declare global {
  interface Window {
    botpressWebChat: BotpressWebChat;
  }
} 