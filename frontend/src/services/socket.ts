import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;

  connect(): Socket {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('[Socket]  Conectado:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('[Socket]  Desconectado');
      });

      this.socket.on('connect_error', (err) => {
        console.warn('[Socket]  Error de conexión:', err.message);
      });
    }
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();