/**
 * Central registry of all Socket.IO event names.
 * Import these constants in your gateway and client code
 * to avoid typos and keep events in sync.
 */
export const SOCKET_EVENTS = {
    // ── Connection lifecycle ─────────────────────────────────────
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',

    // ── Heartbeat ────────────────────────────────────────────────
    PING: 'ping',
    PONG: 'pong',

    // ── Notifications (server → client) ─────────────────────────
    NOTIFICATION: 'notification',
    BROADCAST: 'broadcast',

    // ── Error ────────────────────────────────────────────────────
    ERROR: 'error',
} as const;

export type SocketEventKey = keyof typeof SOCKET_EVENTS;
export type SocketEventValue = (typeof SOCKET_EVENTS)[SocketEventKey];
