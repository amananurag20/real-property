import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

/** Allowed MIME types for uploads */
const ALLOWED_MIME_TYPES = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/avif',
    'image/heic',
    'image/heif',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
];

/**
 * Build Multer disk-storage options from environment variables.
 *
 * Env vars:
 *   UPLOAD_DEST      – folder path relative to cwd (default: uploads)
 *   MAX_FILE_SIZE_MB – per-file max size in MB           (default: 10)
 *   MAX_FILES        – max files per multi-upload request (default: 10)
 */
export function buildMulterOptions(
    dest?: string,
    maxSizeMb?: number,
): MulterOptions {
    const uploadDest = dest ?? process.env.UPLOAD_DEST ?? 'uploads';
    const maxSize =
        (maxSizeMb ?? Number(process.env.MAX_FILE_SIZE_MB ?? 10)) * 1024 * 1024;

    // Ensure the destination folder exists
    const absoluteDest = join(process.cwd(), uploadDest);
    if (!existsSync(absoluteDest)) {
        mkdirSync(absoluteDest, { recursive: true });
    }

    return {
        storage: diskStorage({
            destination: (_req, _file, cb) => cb(null, absoluteDest),
            filename: (_req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (_req, file, cb) => {
            if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(
                    new BadRequestException(
                        `File type "${file.mimetype}" is not allowed. ` +
                        `Accepted: images (jpeg, png, gif, webp, svg, avif, heic) and documents (pdf, doc, docx, xls, xlsx, txt, csv).`,
                    ),
                    false,
                );
            }
        },
        limits: {
            fileSize: maxSize,
        },
    };
}
