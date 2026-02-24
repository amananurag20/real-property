export enum Role {
    VISITOR = 'VISITOR',
    USER = 'USER',
    AGENT = 'AGENT',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    ADMIN = 'ADMIN',
}

export const ROLE_LABELS: Record<Role, string> = {
    [Role.VISITOR]: 'Visitor',
    [Role.USER]: 'User',
    [Role.AGENT]: 'Agent',
    [Role.SERVICE_PROVIDER]: 'Service Provider',
    [Role.ADMIN]: 'Administrator',
};
