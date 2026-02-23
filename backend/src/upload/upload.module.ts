import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { buildMulterOptions } from './upload.config';

@Global()
@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dest = configService.get<string>('UPLOAD_DEST', 'uploads');
                const maxSizeMb = configService.get<number>('MAX_FILE_SIZE_MB', 10);
                return buildMulterOptions(dest, maxSizeMb);
            },
        }),
    ],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService, MulterModule],
})
export class UploadModule { }
