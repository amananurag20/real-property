import { mixin, Injectable, Type } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { buildMulterOptions } from '../upload.config';

/**
 * Creates a multiple-files upload interceptor for the given form field.
 *
 * @example
 * // In a controller:
 * \@UseInterceptors(MultipleFilesInterceptor('documents', 5))
 * \@Post('documents')
 * uploadDocs(\@UploadedFiles() files: Express.Multer.File[]) { ... }
 */
export function MultipleFilesInterceptor(
    fieldName: string,
    maxCount?: number,
    localOptions?: MulterOptions,
): Type<unknown> {
    const maxFiles = maxCount ?? Number(process.env.MAX_FILES ?? 10);

    @Injectable()
    class MixinInterceptor extends FilesInterceptor(
        fieldName,
        maxFiles,
        localOptions ?? buildMulterOptions(),
    ) { }

    return mixin(MixinInterceptor);
}
