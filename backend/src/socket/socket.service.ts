import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
    private readonly logger = new Logger(SocketService.name);

    /** Populated by the gateway once it initializes. */
    private server: Server | undefined;

    /**
     * Called by the gateway after afterInit() to inject the Socket.IO server
     * instance so this service can broadcast from anywhere.
     */
    setServer(server: Server): void {
        this.server = server;
    }

    /**
     * Emits an event to all connected clients (broadcast).
     */
    emit(event: string, data: unknown): void {
        if (!this.server) {
            this.logger.warn(
                `Socket server not initialized — cannot emit event "${event}"`,
            );
            return;
        }
        this.server.emit(event, data);
    }

    /**
     * Emits an event to all clients in a specific room.
     */
    emitToRoom(room: string, event: string, data: unknown): void {
        if (!this.server) {
            this.logger.warn(
                `Socket server not initialized — cannot emit event "${event}" to room "${room}"`,
            );
            return;
        }
        this.server.to(room).emit(event, data);
    }

    /**
     * Emits an event to a specific socket by its ID.
     */
    emitToSocket(socketId: string, event: string, data: unknown): void {
        if (!this.server) {
            this.logger.warn(
                `Socket server not initialized — cannot emit event "${event}" to socket "${socketId}"`,
            );
            return;
        }
        this.server.to(socketId).emit(event, data);
    }

    /**
     * Returns the number of currently connected clients.
     */
    getConnectedClients(): number {
        if (!this.server) return 0;
        return this.server.engine.clientsCount;
    }
}
