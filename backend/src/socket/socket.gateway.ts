import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '@socket/socket.service';
import { SOCKET_EVENTS } from '@socket/socket.types';

/**
 * Main Socket.IO gateway.
 *
 * - Listens on the same port as the HTTP server (no `port` option).
 * - CORS is inherited from the global NestJS CORS config.
 * - Exposes a `ping` event that clients can send to test connectivity.
 */
@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
    transports: ['websocket', 'polling'],
})
export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    private readonly logger = new Logger(SocketGateway.name);

    constructor(private readonly socketService: SocketService) { }

    // ── Lifecycle hooks ─────────────────────────────────────────

    afterInit(server: Server): void {
        // Share the server instance with SocketService so other
        // parts of the application can broadcast events.
        this.socketService.setServer(server);
        this.logger.log('Socket.IO gateway initialized');
    }

    handleConnection(client: Socket): void {
        this.logger.log(
            `Client connected    | id=${client.id} | total=${this.socketService.getConnectedClients()}`,
        );
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(
            `Client disconnected | id=${client.id} | total=${this.socketService.getConnectedClients()}`,
        );
    }

    // ── Event handlers ──────────────────────────────────────────

    /**
     * Heartbeat — clients send `{ time: <ms> }` and get a pong echoed back.
     *
     * Client usage:
     * ```js
     * socket.emit('ping', { time: Date.now() }, (response) => console.log(response));
     * ```
     */
    @SubscribeMessage(SOCKET_EVENTS.PING)
    handlePing(
        @MessageBody() data: { time?: number },
        @ConnectedSocket() client: Socket,
    ): { event: string; time: number; serverTime: string } {
        this.logger.debug(`Ping from client ${client.id}`);
        return {
            event: SOCKET_EVENTS.PONG,
            time: data?.time ?? Date.now(),
            serverTime: new Date().toISOString(),
        };
    }

    /**
     * Join a named room.
     *
     * Client: `socket.emit('joinRoom', { room: 'listings' })`
     */
    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @MessageBody() data: { room: string },
        @ConnectedSocket() client: Socket,
    ): void {
        void client.join(data.room);
        this.logger.log(`Client ${client.id} joined room "${data.room}"`);
        client.emit('roomJoined', { room: data.room });
    }

    /**
     * Leave a named room.
     *
     * Client: `socket.emit('leaveRoom', { room: 'listings' })`
     */
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
        @MessageBody() data: { room: string },
        @ConnectedSocket() client: Socket,
    ): void {
        void client.leave(data.room);
        this.logger.log(`Client ${client.id} left room "${data.room}"`);
        client.emit('roomLeft', { room: data.room });
    }
}
