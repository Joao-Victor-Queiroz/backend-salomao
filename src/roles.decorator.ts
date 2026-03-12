import { SetMetadata } from '@nestjs/common';
import { Cargo } from './generated/prisma/enums';

export const ROLES_KEY = 'roles';
export const Role = (...roles: Cargo[]) => SetMetadata(ROLES_KEY, roles);
