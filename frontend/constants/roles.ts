export enum Role {
    VISITOR = 'VISITOR',
    USER = 'USER',
    OWNER = 'OWNER',
    TENANT = 'TENANT',
    AGENT = 'AGENT',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    ADMIN = 'ADMIN',
}

export const ROLE_LABELS: Record<Role, string> = {
    [Role.VISITOR]: 'Visitor',
    [Role.USER]: 'User',
    [Role.OWNER]: 'Owner',
    [Role.TENANT]: 'Tenant',
    [Role.AGENT]: 'Agent',
    [Role.SERVICE_PROVIDER]: 'Service Provider',
    [Role.ADMIN]: 'Administrator',
};
