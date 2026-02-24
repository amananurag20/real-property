import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_KEY = 'responseMessage';

/**
 * Attach a custom success message to a route handler.
 *
 * @example
 * \@ResponseMessage('User created successfully')
 * \@Post()
 * create() { ... }
 */
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE_KEY, message);
