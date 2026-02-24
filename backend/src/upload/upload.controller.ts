import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { SingleFileInterceptor } from './interceptors/single-upload.interceptor';
import { MultipleFilesInterceptor } from './interceptors/multi-upload.interceptor';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // ──────────────────────────────────────────────────────────────
  //  Single file
  // ──────────────────────────────────────────────────────────────

  @Post('single')
  @Version('1')
  @ResponseMessage('File uploaded successfully')
  @UseInterceptors(SingleFileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.mapFileResponse(file);
  }

  // ──────────────────────────────────────────────────────────────
  //  Multiple files (same field)
  // ──────────────────────────────────────────────────────────────

  @Post('multiple')
  @Version('1')
  @ResponseMessage('Files uploaded successfully')
  @UseInterceptors(MultipleFilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
      required: ['files'],
    },
  })
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.mapFilesResponse(files);
  }
}
