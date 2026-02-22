import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private _client: any;
    private _pool: pg.Pool | undefined;

    constructor(private readonly configService: ConfigService) { }

    async onModuleInit(): Promise<void> {
        const connectionString = this.configService.get<string>('DATABASE_URL');
        this._pool = new pg.Pool({ connectionString });
        const adapter = new PrismaPg(this._pool);

        // Dynamic import to avoid tsc recompiling the generated Prisma client
        const { PrismaClient } = await import('../../generated/prisma/client.js');
        this._client = new PrismaClient({ adapter });
        await this._client.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        if (this._client) {
            await this._client.$disconnect();
        }
        if (this._pool) {
            await this._pool.end();
        }
    }

    /**
     * Access the underlying PrismaClient instance.
     * Use this to perform database operations.
     *
     * @example
     * ```ts
     * const users = await prismaService.client.user.findMany();
     * ```
     */
    get client() {
        if (!this._client) {
            throw new Error(
                'PrismaClient is not initialized. Ensure onModuleInit has completed.',
            );
        }
        return this._client;
    }
}
