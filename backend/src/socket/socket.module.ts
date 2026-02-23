import { Global, Module } from '@nestjs/common';
import { SocketGateway } from '@socket/socket.gateway';
import { SocketService } from '@socket/socket.service';

@Global()
@Module({
    providers: [SocketGateway, SocketService],
    exports: [SocketService],
})
export class SocketModule { }
