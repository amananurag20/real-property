import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Returns the publicly accessible relative URL for an uploaded file.
   * Example: `/uploads/file-1740316800000-123456789.jpg`
   */
  getFileUrl(filename: string): string {
    const dest = this.configService.get<string>('UPLOAD_DEST', 'uploads');
    return `/${dest}/${filename}`;
  }

  /**
   * Returns the absolute filesystem path of an uploaded file.
   */
  getFilePath(filename: string): string {
    const dest = this.configService.get<string>('UPLOAD_DEST', 'uploads');
    return join(process.cwd(), dest, filename);
  }

  /**
   * Deletes a previously uploaded file from disk.
   * Silently ignores if the file does not exist.
   */
  deleteFile(filename: string): boolean {
    const filePath = this.getFilePath(filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      return true;
    }
    return false;
  }

  /**
   * Maps an Express Multer file object to a clean, serializable shape.
   */
  mapFileResponse(file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: this.getFileUrl(file.filename),
    };
  }

  /**
   * Maps an array of Multer file objects.
   */
  mapFilesResponse(files: Express.Multer.File[]) {
    return files.map((f) => this.mapFileResponse(f));
  }
}
