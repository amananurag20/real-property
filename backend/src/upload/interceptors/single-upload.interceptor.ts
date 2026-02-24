import { mixin, Injectable, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { buildMulterOptions } from '../upload.config';

/**
 * Creates a single-file upload interceptor for the given form field.
 *
 * @example
 * // In a controller:
 * \@UseInterceptors(SingleFileInterceptor('avatar'))
 * \@Post('profile-picture')
 * uploadAvatar(\@UploadedFile() file: Express.Multer.File) { ... }
 */
export function SingleFileInterceptor(
  fieldName: string,
  localOptions?: MulterOptions,
): Type<unknown> {
  @Injectable()
  class MixinInterceptor extends FileInterceptor(
    fieldName,
    localOptions ?? buildMulterOptions(),
  ) {}

  return mixin(MixinInterceptor);
}
