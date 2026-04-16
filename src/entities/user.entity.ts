import type { UUID } from 'crypto';
import { UserRole } from 'src/enums/user-role.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255 })
  lastname: string;

  @Index('UQ_user_email', { unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.Client })
  role: UserRole;
}
