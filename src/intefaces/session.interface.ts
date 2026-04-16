import { UUID } from 'crypto';
import { Request } from 'express';
import { UserRole } from 'src/enums/user-role.enum';

export interface Session {
  id: UUID;
  role: UserRole;
}

export type RequestSession = Request & { session?: Session };
