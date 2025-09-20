/// <reference types="vite/client" />
export {}

declare global {
  interface Window {
    electron: {
      invoke(channel: string, ...args: any[]): Promise<any>
      send(channel: string, ...args: any[]): void
      on(channel: string, cb: (...args: any[]) => void): void
    }
  }
}
