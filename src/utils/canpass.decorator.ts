import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const CanPass = (...roles: string[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
