import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"


class SocketManager {
  private socket: Socket | null = null
  private url: string

  constructor() {
    this.url = process.env.NEXT_PUBLIC_SOCKET_URL || "https://sparsh-backend-n1lf.onrender.com"
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url, {
        transports: ["websocket", "polling"],
      })

      this.socket.on("connect", () => {
        console.log("Connected to server")
      })

      this.socket.on("disconnect", () => {
        console.log("Disconnected from server")
      })
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket() {
    return this.socket
  }

  // Event listeners
  onImageUploaded(callback: (data: any) => void) {
    this.socket?.on("imageUploaded", callback)
  }

  onImageUpdated(callback: (data: any) => void) {
    this.socket?.on("imageUpdated", callback)
  }

  onImageDeleted(callback: (data: any) => void) {
    this.socket?.on("imageDeleted", callback)
  }

  // Remove listeners
  off(event: string) {
    this.socket?.off(event)
  }
}

export const socketManager = new SocketManager()
export default socketManager
