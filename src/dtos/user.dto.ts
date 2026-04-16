import { UUID } from 'crypto';
import { UserRole } from 'src/enums/user-role.enum';

export class UserDto {
  id: UUID;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}
